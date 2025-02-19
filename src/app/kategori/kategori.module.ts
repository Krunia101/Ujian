import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KategoriService } from './kategori.service';
import { KategoriController } from './kategori.controller';
import { Kategori } from './kategori.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kategori])],
  providers: [KategoriService],
  controllers: [KategoriController],
})
export class KategoriModule {}
