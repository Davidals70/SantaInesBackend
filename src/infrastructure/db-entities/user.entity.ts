import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  user_type: string;
}
