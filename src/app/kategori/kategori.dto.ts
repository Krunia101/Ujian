import { OmitType } from '@nestjs/mapped-types';
import {
  IsInt,
  IsOptional,
  IsString,
  Min,
  isString,
  IsObject,
} from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';

export class KategoriDto {
  @IsInt()
  id?: number;

  @IsString()
  nama_kategori: string;

  @IsObject()
  @IsOptional()
  created_by: { id: number };

  @IsObject()
  @IsOptional()
  updated_by: { id: number };
}
export class KategoriIdDto {
  @IsInt({ message: 'ID harus berupa angka' })
  @Min(1, { message: 'ID harus lebih besar dari 0' })
  id: number;
}
export class UpdateKategoriDto {
  @IsOptional()
  @IsString({ message: 'Nama kategori harus berupa string' })
  nama_kategori?: string;
}

export class CreateKategoriDto extends OmitType(KategoriDto, [
  'id',
  'updated_by',
]) {}
export class findAllKategori extends PageRequestDto {
  @IsString()
  @IsOptional()
  nama_kategori: string;

  @IsOptional()
  isme?: number | 0 | 1;
}
