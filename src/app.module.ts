import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LatihanModule } from './latihan/latihan.module';
import { TugasModule } from './tugas/tugas.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { SiswaModule } from './ujian/ujian.module';
import { AuthModule } from './app/auth/auth.module';
import { MailService } from './app/mail/mail.service';
import { MailModule } from './app/mail/mail.module';
import { KategoriModule } from './app/kategori/kategori.module';
import { KantinKitaModule } from './kantin-kita/kantin-kita.module';
import { ProdukModule } from './app/produk/produk.module';
import { UploadController } from './app/upload/upload.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CloudinaryModule } from './app/cloudinary/cloudinary.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const { typeOrm } = await import('./config/typeorm.config');
        return typeOrm;
      },
    }),
    LatihanModule,
    TugasModule,
    BookModule,
    SiswaModule,
    AuthModule,
    MailModule,
    KategoriModule,
    KantinKitaModule,
    ProdukModule,
    CloudinaryModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, MailService],
})
export class AppModule {}
