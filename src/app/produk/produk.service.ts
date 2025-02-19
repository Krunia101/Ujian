/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Param,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response.utils';
import { Produk } from './produk.entity';
import { Between, Like, Repository } from 'typeorm';
import {
  CreateProdukArrayDto,
  UpdateProdukDto,
  findAllProduk,
} from './produk.dto';
import { ResponsePagination, ResponseSuccess } from 'src/Interpace';

@Injectable()
export class ProdukService extends BaseResponse {
  constructor(
    @InjectRepository(Produk)
    private readonly produkRepository: Repository<Produk>,
    @Inject(REQUEST) private req: any,
  ) {
    super();
  }

  async createBulk(payload: CreateProdukArrayDto): Promise<ResponseSuccess> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let berhasil = 0;
      let gagal = 0;
      await Promise.all(
        payload.data.map(async (data) => {
          const dataSave = {
            ...data,
            kategori: {
              id: data.kategori_id,
            },
            created_by: {
              id: this.req.user.id,
            },
          };

          try {
            await this.produkRepository.save(dataSave);

            berhasil += 1;
          } catch (err) {
            console.log('err', err);
            gagal += 1;
          }
        }),
      );

      return this._succes(`Tersimpan`);
    } catch (err) {
      console.log('err', err);
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(query: findAllProduk): Promise<ResponsePagination> {
    const {
      page,
      pageSize,
      limit,
      nama_produk,
      dari_harga,
      sampai_harga,
      deskripsi_produk,
      keyword,
      nama_kategori, // Tambahkan kategori sebagai filter
    } = query;

    const filterQuery: any = {};
    const filterKeyword = [];

    if (keyword) {
      filterKeyword.push(
        { nama_produk: Like(`%${keyword}%`) },
        { harga: Like(`%${keyword}%`) },
        { deskripsi_produk: Like(`%${keyword}%`) },
        { kategori: { nama_kategori: Like(`%${keyword}%`) } }, // Cari berdasarkan kategori
      );
    } else {
      if (deskripsi_produk) {
        filterQuery.deskripsi_produk = Like(`%${deskripsi_produk}%`);
      }
      if (nama_produk) {
        filterQuery.nama_produk = Like(`%${nama_produk}%`);
      }
      if (nama_kategori) {
        filterQuery.kategori = { nama_kategori: Like(`%${nama_kategori}%`) }; // Filter kategori
      }
      if (dari_harga && sampai_harga) {
        filterQuery.harga = Between(dari_harga, sampai_harga);
      }
      if (dari_harga && !!sampai_harga === false) {
        filterQuery.harga = Between(dari_harga, dari_harga);
      }
    }

    const total = await this.produkRepository.count({
      where: keyword ? filterKeyword : filterQuery,
    });

    const result = await this.produkRepository.find({
      where: keyword ? filterKeyword : filterQuery,
      relations: ['created_by', 'updated_by', 'kategori'],
      select: {
        id: true,
        nama_produk: true,
        deskripsi_produk: true,
        stok: true,
        harga: true,
        kategori: {
          id: true,
          nama_kategori: true,
        },
        created_by: {
          id: true,
          nama: true,
        },
        updated_by: {
          id: true,
          nama: true,
        },
      },
      skip: limit,
      take: pageSize,
    });

    return this._pagination('OK', result, total, page, pageSize);
  }

  async findOne(id: number): Promise<ResponseSuccess> {
    try {
      const produk = await this.produkRepository.findOne({
        where: { id },
        relations: ['created_by', 'updated_by', 'kategori'],
        select: {
          id: true,
          nama_produk: true,
          deskripsi_produk: true,
          stok: true,
          harga: true,
          kategori: {
            id: true,
            nama_kategori: true,
          },
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

      if (!produk) {
        throw new HttpException('Produk tidak ditemukan', HttpStatus.NOT_FOUND);
      }

      return this._succes('Produk ditemukan', produk);
    } catch (err) {
      console.log('err', err);
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  async updateProduk(
    id: number,
    payload: UpdateProdukDto,
  ): Promise<ResponseSuccess> {
    const produk = await this.produkRepository.findOne({ where: { id } });

    if (!produk) {
      throw new HttpException('Produk tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    // Cek jika payload kosong
    if (Object.keys(payload).length === 0) {
      throw new HttpException('Isi untuk mengupdate', HttpStatus.BAD_REQUEST);
    }

    // Update produk
    await this.produkRepository.update(id, payload);

    return {
      status: 'Success',
      message: 'Produk berhasil diperbarui',
      data: { id, ...payload },
    };
  }

  async deleteProduk(id: number): Promise<ResponseSuccess> {
    const produk = await this.produkRepository.findOne({ where: { id } });

    if (!produk) {
      throw new HttpException('Produk tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    // Hapus produk dari database
    await this.produkRepository.remove(produk);

    return {
      status: 'Success',
      message: `Produk dengan ID ${id} berhasil dihapus.`,
    };
  }

  async deleteBulk(
    @Param('produkIds') produkIds: string,
  ): Promise<ResponseSuccess> {
    const idArray = produkIds.split(',').map(Number);
    const produk = await this.produkRepository.findByIds(idArray);

    if (!produk || produk.length === 0) {
      throw new HttpException('Produk tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    // Hapus produk dari database
    await this.produkRepository.remove(produk);

    return {
      status: 'Success',
      message: `Produk dengan ID ${idArray.join(', ')} berhasil dihapus.`,
    };
  }
}
