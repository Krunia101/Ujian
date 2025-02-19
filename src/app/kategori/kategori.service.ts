import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response.utils';
import { Kategori } from './kategori.entity';
import { CreateKategoriDto, findAllKategori } from './kategori.dto';
import { Pagination } from 'src/utils/decorator/pagenation';
// import { ResponsePagination, ResponseSuccess } from 'src/interface/response';
import { Like, Or, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { ResponseSuccess } from 'src/Interpace';
import { CreateBulkKategoriDto } from './bulk.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UpdatedBy = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.id) {
      throw new Error('User not authenticated');
    }
    return { id: user.id };
  },
);

@Injectable()
export class KategoriService extends BaseResponse {
  constructor(
    @InjectRepository(Kategori)
    private readonly kategoriRepository: Repository<Kategori>,
    @Inject(REQUEST) private req: any,
  ) {
    super();
  }

  async create(payload: CreateKategoriDto): Promise<ResponseSuccess> {
    try {
      // Periksa apakah nama_kategori sudah ada
      const existingCategory = await this.kategoriRepository.findOne({
        where: { nama_kategori: payload.nama_kategori },
      });

      if (existingCategory) {
        // Jika ada, kembalikan response error
        throw new HttpException(
          `Kategori dengan nama "${payload.nama_kategori}" sudah ada.`,
          HttpStatus.CONFLICT,
        );
      }

      // Simpan kategori baru
      await this.kategoriRepository.save({
        ...payload,
      });

      return this._succes('Kategori berhasil dibuat', this.req.user.user_id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Kembalikan error yang dibuat sebelumnya
      }
      throw new HttpException('Ada Kesalahan', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  //G tau lupa
  async getAllCategory(query: findAllKategori): Promise<ResponseSuccess> {
    const { page, pageSize, nama_kategori, isme } = query;

    const filterQuery: any = {};

    if (isme === 1) {
      filterQuery.created_by = {
        id: this.req.user.id,
      };
    }

    if (nama_kategori) {
      filterQuery.nama_kategori = Like(`%${nama_kategori}%`);
    }

    const total = await this.kategoriRepository.count({
      where: filterQuery,
    });

    if (isme === 0) {
      return { status: 'Not Found', message: 'Kategori tidak ditemukan' };
    }

    const result = await this.kategoriRepository.find({
      where: filterQuery,
      relations: ['created_by', 'updated_by'],
      select: {
        // pilih data mana saja yang akan ditampilkan dari tabel kategori
        id: true,
        nama_kategori: true,
        created_by: {
          // pilih field yang akan ditampilkan dari tabel user
          id: true,
          nama: true,
        },
        updated_by: {
          // pilih field yang akan ditampilkan dari tabel user
          id: true,
          nama: true,
        },
      },
      take: pageSize,
    });

    if (!result.length) {
      return {
        status: 'Not Found',
        message: `nama kategori "${nama_kategori}" tidak ditemukan`,
      };
    }

    return this._pagination('OK', result, total, page, pageSize);
  }

  // Hapus semua data dari tabel Kategori
  async deleteAllCategories(): Promise<ResponseSuccess> {
    try {
      await this.kategoriRepository.clear();

      return this._succes('Semua kategori berhasil dihapus');
    } catch (error) {
      throw new HttpException(
        'Gagal menghapus semua kategori',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //CreateBulk
  async createBulk(payload: CreateBulkKategoriDto): Promise<ResponseSuccess> {
    try {
      const { kategori } = payload;

      // Validasi duplikasi nama_kategori di database
      const existingNames = await this.kategoriRepository.find({
        where: kategori.map((k) => ({ nama_kategori: k.nama_kategori })),
      });
      const existingNamesSet = new Set(
        existingNames.map((k) => k.nama_kategori),
      );

      // Filter kategori yang duplikat
      const nonDuplicateKategori = kategori.filter(
        (k) => !existingNamesSet.has(k.nama_kategori),
      );

      if (nonDuplicateKategori.length === 0) {
        throw new HttpException(
          'Semua kategori yang dikirim sudah ada',
          HttpStatus.CONFLICT,
        );
      }

      // Simpan data ke database
      const result = await this.kategoriRepository.save(
        nonDuplicateKategori.map((k) => ({
          ...k,
        })),
      );

      return this._succes(
        `${result.length} kategori berhasil dibuat`,
        result.map((r) => r.id),
      );
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Gagal membuat kategori',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //cari by id
  async getCategoryDetail(id: number): Promise<ResponseSuccess> {
    try {
      // Cari kategori berdasarkan ID
      const kategori = await this.kategoriRepository.findOne({
        where: { id },
        relations: ['created_by', 'updated_by'], // Relasi tabel jika diperlukan
        select: {
          id: true,
          nama_kategori: true,
          created_at: true,
          updated_at: true,
          created_by: {
            id: true,
            nama: true,
          },
          updated_by: {
            id: true,
            nama: true,
          },
        },
      });

      // Jika tidak ditemukan, lemparkan error
      if (!kategori) {
        throw new HttpException(
          `Kategori dengan ID ${id} tidak ditemukan.`,
          HttpStatus.NOT_FOUND,
        );
      }

      // Kembalikan response sukses dengan data kategori
      return this._succes('Kategori ditemukan', kategori);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Gagal mengambil detail kategori',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //Update by id
  async updateCategory(
    id: number,
    payload: Partial<CreateKategoriDto>,
    updatedBy: { id: number },
  ): Promise<ResponseSuccess> {
    try {
      // Cari kategori berdasarkan ID
      const existingCategory = await this.kategoriRepository.findOne({
        where: { id },
      });
      if (!existingCategory) {
        throw new HttpException(
          `Kategori dengan ID ${id} tidak ditemukan.`,
          HttpStatus.NOT_FOUND,
        );
      }

      // Perbarui data kategori
      const updatedCategory = await this.kategoriRepository.save({
        ...existingCategory,
        ...payload,
        updated_by: updatedBy,
      });

      return this._succes('Kategori berhasil diperbarui', updatedCategory);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Gagal memperbarui kategori',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
