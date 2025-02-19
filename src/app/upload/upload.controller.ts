/* eslint-disable prettier/prettier */
import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import BaseResponse from 'src/utils/response.utils';
import { ResponseSuccess } from 'src/Interpace';
import { JwtGuard } from '../auth/auth.guard';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import * as fs from 'fs';

@UseGuards(JwtGuard)
@Controller('upload')
export class UploadController extends BaseResponse {
  constructor(private readonly CloudinaryService: CloudinaryService) {
    super();
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/uploads',
        filename: (req, file, cb) => {
          const fileExtension = file.originalname.split('.').pop();
          cb(null, `${new Date().getTime()}.${fileExtension}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return cb(
            new HttpException('Hanya file gambar dan PDF yang diperbolehkan', HttpStatus.BAD_REQUEST),
            false,
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB dalam byte
      },
    }),
  )
  @Post('file')
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<ResponseSuccess> {
    try {
      const url = `${process.env.BASE_CLIENT_URL}/uploads/${file.filename}`;
      return this._succes('OK', {
        file_url: url,
        file_name: file.filename,
        file_size: file.size,
      });
    } catch (err) {
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: 'public/uploads',
        filename: (req, file, cb) => {
          const fileExtension = file.originalname.split('.').pop();
          cb(null, `${new Date().getTime()}.${fileExtension}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return cb(
            new HttpException('Hanya file gambar dan PDF yang diperbolehkan', HttpStatus.BAD_REQUEST),
            false,
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB dalam byte
      },
    }),
  )
  @Post('files')
  async uploadFileMulti(@UploadedFiles() files: Express.Multer.File[]): Promise<ResponseSuccess> {
    try {
      const file_response = files.map((file) => ({
        file_url: `${process.env.BASE_CLIENT_URL}/uploads/${file.filename}`,
        file_name: file.filename,
        file_size: file.size,
      }));
      return this._succes('OK', { file: file_response });
    } catch (err) {
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('file/delete/:filename')
  async DeleteFile(@Param('filename') filename: string): Promise<ResponseSuccess> {
    try {
      const filePath = `public/uploads/${filename}`;
      if (!fs.existsSync(filePath)) {
        throw new HttpException('File tidak ditemukan', HttpStatus.NOT_FOUND);
      }
      fs.unlinkSync(filePath);
      return this._succes('Berhasil menghapus File');
    } catch (err) {
      throw new HttpException('File tidak ditemukan', HttpStatus.NOT_FOUND);
    }
  }

  @Post('cloudinary')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.CloudinaryService.uploadFile(file);
  }

  @Delete('cloudinary/delete/:publicId')
  async deleteFileCloudinary(@Param('publicId') publicId: string) {
    try {
      const result = await this.CloudinaryService.deleteFile(publicId);
      return this._succes('Berhasil menghapus file di Cloudinary', result);
    } catch (err) {
      throw new HttpException('File tidak ditemukan di Cloudinary', HttpStatus.NOT_FOUND);
    }
  }
}
