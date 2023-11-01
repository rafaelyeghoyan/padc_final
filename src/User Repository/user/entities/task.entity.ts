import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Title: string;

  @Column()
  Content: string;

  @Column()
  DueDate: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  userId: number;
}
