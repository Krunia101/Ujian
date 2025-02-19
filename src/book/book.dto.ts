import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsInt,
  Max,
  Min,
  MinLength,
  IsOptional,
} from 'class-validator';

export class BookDTO {
  @IsOptional()
  id: number;

  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  title: string;

  @IsNotEmpty({ message: 'Author is required' })
  author: string;

  @IsInt({ message: 'Year must be an integer' })
  @Min(2020, { message: 'Year must be at least 2020' })
  @Max(2025, { message: 'Year must be at most 2025' })
  year: number;

  @IsNotEmpty({ message: 'Description is required' })
  @MinLength(5, { message: 'Description must be at least 5 characters long' })
  description: string;
}

export class CreateBookDTO extends OmitType(BookDTO, ['id']) {}
export class UpdateBookDTO extends BookDTO {}

export class FindBookDto {
  @IsInt()
  @Type(() => Number)
  page = 1;

  @IsInt()
  @Type(() => Number)
  pageSize = 10;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit = 10;

  @IsOptional()
  title?: string;

  @IsOptional()
  author?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  year?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  from_year?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  to_year?: number;

  @IsOptional()
  keyword?: string;
}
