import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';

export class ProdukDto {
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  barcode: string;

  @IsString()
  @IsNotEmpty()
  nama_produk: string;

  @IsNumber()
  @IsNotEmpty()
  kategori_id: number;

  @IsString()
  @IsNotEmpty()
  deskripsi_produk: string;

  @IsNotEmpty()
  @IsNumber()
  harga: number;

  @IsNotEmpty()
  @IsNumber()
  stok: number;

  @IsOptional()
  @IsString()
  foto: string;
}

export class CreateProdukDto extends OmitType(ProdukDto, ['id']) {}
export class CreateProdukArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProdukDto)
  data: CreateProdukDto[];
}
export class findAllProduk extends PageRequestDto {
  @IsString()
  @IsOptional()
  nama_produk: string;

  @IsString()
  @IsOptional()
  deskripsi_produk: string;

  @IsString()
  @IsOptional()
  nama_kategori: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  dari_harga: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sampai_harga: number;

  @IsString()
  @IsOptional()
  keyword: string;
}
export class UpdateProdukDto {
  @IsOptional()
  @IsString()
  @Length(8)
  barcode?: string;

  @IsOptional()
  @IsString()
  nama_produk?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  kategori_id?: number;

  @IsOptional()
  @IsString()
  deskripsi_produk?: string;

  @IsOptional()
  @IsNumber()
  harga?: number;

  @IsOptional()
  @IsNumber()
  stok?: number;

  @IsOptional()
  @IsString()
  foto?: string;
}
