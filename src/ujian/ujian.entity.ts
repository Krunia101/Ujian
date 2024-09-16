import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('siswa')
export class Siswa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

  @Column({ unique: true })
  email: string;

  @Column({type : 'text'})
  tempat_lahir: string;

  @Column()
  tanggal_lahir: Date;

  @Column()
  nisn: string;

  @Column()
  nik: string;

  @Column({type : 'text'})
  alamat: string;
}