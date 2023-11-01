import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column()
  UserName: string;

  @Column()
  Phone: string;

  @Column()
  Email: string;

  @Column()
  Password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 'user' })
  Role: string;
}
