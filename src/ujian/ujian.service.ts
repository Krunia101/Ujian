import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Siswa } from './ujian.entity';
import { CreateUjianDTO } from './ujian.dto';

@Injectable()
export class SiswaService {
  constructor(
    @InjectRepository(Siswa)
    private readonly siswaRepository: Repository<Siswa>,
  ) {}

    async add(payload: CreateUjianDTO): Promise<Siswa> {
    return await this.siswaRepository.save(payload);

    
  }
}