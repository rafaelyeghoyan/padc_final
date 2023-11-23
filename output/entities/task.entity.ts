import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('Task', { schema: 'public' })
export class Task {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'Id' })
  id: number;

  @Column('character varying', { name: 'Title' })
  title: string;

  @Column('character varying', { name: 'Content' })
  content: string;

  @Column('date', { name: 'DueDate' })
  dueDate: Date;

  @Column('boolean', { name: 'isActive', default: () => 'true' })
  isActive: boolean;

  @Column('integer', { name: 'userId' })
  userId: number;
}
