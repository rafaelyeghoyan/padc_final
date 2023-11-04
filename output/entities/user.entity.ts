import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'Id' })
  id: number;

  @Column('character varying', { name: 'FirstName' })
  firstName: string;

  @Column('character varying', { name: 'LastName' })
  lastName: string;

  @Column('character varying', { name: 'UserName' })
  userName: string;

  @Column('character varying', { name: 'Phone' })
  phone: string;

  @Column('character varying', { name: 'Email' })
  email: string;

  @Column('character varying', { name: 'Password' })
  password: string;

  @Column('boolean', { name: 'isActive', default: () => 'true' })
  isActive: boolean;

  @Column('character varying', { name: 'Role', default: () => "'user'" })
  role: string;
}
