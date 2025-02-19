import { Module } from '@nestjs/common';
import { KantinKitaController } from './kantin-kita.controller';
import { KantinKitaService } from './kantin-kita.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KantinKita } from './kantin-kita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KantinKita])],
  controllers: [KantinKitaController],
  providers: [KantinKitaService],
})
export class KantinKitaModule {}
