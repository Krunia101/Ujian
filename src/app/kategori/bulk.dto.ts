import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateKategoriDto } from './kategori.dto';

export class CreateBulkKategoriDto {
  @IsArray()
  @ValidateNested({ each: true }) // Validasi setiap elemen array
  @Type(() => CreateKategoriDto) // Transformasi elemen ke CreateKategoriDto
  kategori: CreateKategoriDto[];
}
