import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LatihanModule } from './latihan/latihan.module';
import { TugasModule } from './tugas/tugas.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { SiswaModule } from './ujian/ujian.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),TypeOrmModule.forRootAsync({
    useFactory: async () =>{
      const {typeOrm} = await import('./config/typeorm.config');
      return typeOrm;
    }
  })
    ,LatihanModule, TugasModule, BookModule, SiswaModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
