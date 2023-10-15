import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
// import { PatientEntity } from './patient.entity';
// import { DoctorEntity } from './doctor.entity';

@Entity({ name: 'appointment'})
export class AppointmentEntity {
  @PrimaryGeneratedColumn("uuid")
  ID: string;

  // @ManyToOne(() => PatientEntity, patient => patient.appointment)
  // @JoinColumn({ name: 'patient_id' })
  @Column()
  patient_id: string;

  // @ManyToOne(() => DoctorEntity, doctor => doctor.appointment)
  // @JoinColumn({ name: 'doctor_id' })
  @Column()
  doctor_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creation_date: Date;

  @Column()
  appointment_date: Date;

  @Column()
  status: string;

  @Column()
  description: string;
}
