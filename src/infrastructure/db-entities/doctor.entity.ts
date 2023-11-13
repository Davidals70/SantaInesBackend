import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'doctor'})
export class DoctorEntity {
  @PrimaryGeneratedColumn("uuid")
  ID: string;

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

 @Column({ nullable: true })
 user_id: string;


  // @OneToMany(() => AppointmentEntity, appointment => appointment.doctor_id)
  // @Column()
  // appointment: string;
}
