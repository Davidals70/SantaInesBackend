import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { AppointmentEntity } from './appointment.entity';

@Entity({ name: 'patient'})
export class PatientEntity {

  @PrimaryGeneratedColumn("uuid")
  ID: string;//id_en_la_bd

  @Column()
  name: string;//nombre

  @Column()
  lastname: string;//apellido

  @Column()
  birthday: Date;//2021-05-05

  @Column('text',{
    unique: true
  })
  id_number: string;//cedula//Unica

  @Column()
  address: string;//direccion

  @Column()
  phone_number: string;//numero_de_telefono

  @Column()
  gender: string;//genero

  @Column()
  email: string;///correo_electronico

  // @OneToMany(() => AppointmentEntity, appointment => appointment.patient_id)
  // @Column()
  // appointment: string;
}
