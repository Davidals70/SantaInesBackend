import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AppointmentEntity } from './appointment.entity';

@Entity({ name: 'doctor'})
export class DoctorEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  id_number: string;

  @Column()
  specialization: string;

  @Column()
  phone_number: string;

  @Column()
  gender: string;

  @Column()
  email: string;

  @OneToMany(() => AppointmentEntity, appointment => appointment.doctor)
  appointment: AppointmentEntity[];
}
