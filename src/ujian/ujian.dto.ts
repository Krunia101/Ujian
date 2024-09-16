import { OmitType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsNotEmpty, Length, IsInt, Max, Min, MinLength, IsOptional, IsEmail, IsNumber, IsDate } from "class-validator";

export class UjianDTO {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  nama: string;


  @IsNotEmpty()
  @IsEmail()
  email : string;

  @IsNotEmpty()
  tempat_lahir: string;

  @IsDate()
  tanggal_lahir: Date;

  @IsNotEmpty()
  @MinLength(5)
  nisn: string;

  @IsNotEmpty()
  @MinLength(5)
  nik: string;

  @IsNotEmpty()
  alamat: string;
}

export class CreateUjianDTO extends OmitType(UjianDTO, ['id']) {}
export class UpdateUjianDTO extends UjianDTO {}
