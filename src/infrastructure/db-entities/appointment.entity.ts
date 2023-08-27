import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PatientEntity } from './patient.entity';
import { DoctorEntity } from './doctor.entity';

@Entity({ name: 'appointment'})
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @ManyToOne(() => PatientEntity, patient => patient.appointment)
  @JoinColumn({ name: 'patient_id' })
  patient: PatientEntity;

  @ManyToOne(() => DoctorEntity, doctor => doctor.appointment)
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creation_date: Date;

  @Column()
  appointment_date: Date;

  @Column()
  status: string;

  @Column()
  description: string;
}
