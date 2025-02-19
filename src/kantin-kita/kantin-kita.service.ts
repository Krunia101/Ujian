import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KantinKita } from './kantin-kita.entity';
import { kantinkitaDTO } from './kantin-kita.dto';

@Injectable()
export class KantinKitaService {
  constructor(
    @InjectRepository(KantinKita)
    private readonly kantinKitaRepository: Repository<KantinKita>,
  ) {}

  async create(kantinKitaDto: kantinkitaDTO): Promise<KantinKita> {
    const kantinKita = this.kantinKitaRepository.create(kantinKitaDto);
    return this.kantinKitaRepository.save(kantinKita);
  }

  // Method untuk menerima banyak data
  async createMany(kantinKitaDtos: kantinkitaDTO[]): Promise<KantinKita[]> {
    const kantinKitaEntities = this.kantinKitaRepository.create(kantinKitaDtos);
    return this.kantinKitaRepository.save(kantinKitaEntities);
  }

  async update(id: number, kantinKitaDto: kantinkitaDTO): Promise<KantinKita> {
    await this.kantinKitaRepository.update(id, kantinKitaDto);
    return this.findOne(id);
  }

  async findOne(id: number): Promise<KantinKita> {
    return this.kantinKitaRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<KantinKita[]> {
    return this.kantinKitaRepository.find();
  }
}
