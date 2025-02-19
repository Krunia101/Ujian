import { OmitType } from '@nestjs/mapped-types';
import {
  IsInt,
  IsOptional,
  IsString,
  Min,
  IsNumber,
  IsUrl,
  IsIn,
} from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';

export class kantinkitaDTO {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  nama: string;

  @IsOptional()
  @IsString()
  @IsIn(['Pizza', 'Burger', 'Jus'], {
    message: 'Kategori harus salah satu dari Pizza, Burger, atau Jus',
  })
  kategori?: string;

  @IsNumber()
  @Min(0)
  harga: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  rating?: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  jumlahStok: number;
}
