import { Controller, Post, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { SiswaService } from './ujian.service';
import { Siswa } from './ujian.entity';
import { CreateUjianDTO, UpdateUjianDTO } from './ujian.dto';

@Controller('siswa')
export class SiswaController {
  constructor(private readonly siswaService: SiswaService) {}

@Post('/create')
async createSiswa(@Body() siswa: CreateUjianDTO): Promise<Siswa> {
  return await this.siswaService.add(siswa);
}
}