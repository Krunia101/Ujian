import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class KantinKita {
  @PrimaryGeneratedColumn()
  id: number; // Kolom ID (Primary Key)

  @Column()
  nama: string; // Kolom nama

  @Column()
  kategori: string; // Kolom kategori

  @Column('int')
  harga: number; // Kolom harga

  @Column('float', { nullable: true })
  rating: number; // Kolom rating (opsional)

  @Column('text', { nullable: true })
  imageUrl: string; // Kolom imageUrl (opsional)

  @Column({ type: 'int', nullable: true })
  jumlahStok: number;
}
