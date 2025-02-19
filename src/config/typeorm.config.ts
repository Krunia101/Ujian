import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/app/auth/auth.entity';
import { Kategori } from 'src/app/kategori/kategori.entity';
import { ResetPassword } from 'src/app/mail/reset_password.entity';
import { Produk } from '../app/produk/produk.entity';
import { Book } from 'src/book/book.entity';
import { KantinKita } from 'src/kantin-kita/kantin-kita.entity';
import { Siswa } from 'src/ujian/ujian.entity';

export const typeOrm: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    Siswa,
    Book,
    User,
    User,
    ResetPassword,
    Kategori,
    KantinKita,
    Produk,
  ],
  synchronize: true,
  logging: true,
};
