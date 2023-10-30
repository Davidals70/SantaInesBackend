import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorEntity } from '../../db-entities/doctor.entity';
import { Doctor } from "src/domain/doctor/Doctor";
import { RepositorioDoctor } from "src/domain/repositories/RepositorioDoctor";

import { Either } from "src/utilidad/either";

@Injectable()
export class DoctorRepositoryService implements RepositorioDoctor 
{
  constructor(
    @InjectRepository(DoctorEntity)
    private doctorRepository: Repository<DoctorEntity>,
  ) {}

  async registrarDoctor(doctor: Doctor): Promise<Either<Error, Doctor>> {

    const usuarioEnt : DoctorEntity = {
        ID: doctor.getId(),
        name: doctor.getNombre(),
        lastname: doctor.getApellido(),
        specialization: doctor.getespecialidad(),
        id_number: doctor.getcedula(),
       phone_number: doctor.gettelefono(),
       gender: doctor.getgenero(),
        email: doctor.getCorreo(),
    };

    const result = await this.doctorRepository.save(usuarioEnt);

    if(result){
        return Either.makeRight<Error,Doctor>(doctor);

    }
    else{
        return Either.makeLeft<Error,Doctor>(new Error('Error de la base de datos registro'));
    }

 }

 async buscarDoctores(): Promise<Either<Error, Iterable<Doctor>>> {
  const result: DoctorEntity[] = await this.doctorRepository.find();
  if(result.length!=0){
      const doctores: Doctor[] = result.map((doctor) =>
          Doctor.create(doctor.name,doctor.lastname,doctor.specialization,doctor.id_number,doctor.phone_number,doctor.gender,doctor.email).getRight());
      return Either.makeRight<Error,Doctor[]>(doctores);
  }
  else{
      return Either.makeLeft<Error,Doctor[]>(new Error('Error de la base de datos busqueda'));
  }
 }

 
 async buscarDoctorPorCorreo(correo: string): Promise<Either<Error,Doctor>> {
  const result: DoctorEntity = await this.doctorRepository.findOneBy({email:correo});
  if(result){
      const doctores: Doctor = Doctor.create(result.name,result.lastname,result.specialization,result.id_number,result.phone_number,result.gender,result.email).getRight();
      return Either.makeRight<Error,Doctor>(doctores);
  }
  else{
      return Either.makeLeft<Error,Doctor>(new Error('No se encontro el doctor por correo'));
  }
 }

 async buscarDoctorPorEspecialidad(especialidad: string): Promise<Either<Error,Doctor>> {
  const result: DoctorEntity = await this.doctorRepository.findOneBy({specialization:especialidad});
  if(result){
      const doctores: Doctor = Doctor.create(result.name,result.lastname,result.specialization,result.id_number,result.phone_number,result.gender,result.email).getRight();
      return Either.makeRight<Error,Doctor>(doctores);
  }
  else{
      return Either.makeLeft<Error,Doctor>(new Error('No se encontro el doctor por especialidad'));
  }
 }

 async buscarDoctorPorNombre(nombre: string ,apellido :string): Promise<Either<Error,Doctor>> {
  const result: DoctorEntity = await this.doctorRepository.findOneBy({name:nombre,lastname:apellido});
  if(result){
      const doctores: Doctor = Doctor.create(result.name,result.lastname,result.specialization,result.id_number,result.phone_number,result.gender,result.email).getRight();
      return Either.makeRight<Error,Doctor>(doctores);
  }
  else{
      return Either.makeLeft<Error,Doctor>(new Error('No se encontro el doctor por nombre y apellido'));
  }
 }

 async buscarDoctorPorCedula(cedula: string): Promise<Either<Error,Doctor>> {
    const result: DoctorEntity = await this.doctorRepository.findOneBy({id_number:cedula});
    if(result){
        const doctores: Doctor = Doctor.create(result.name,result.lastname,result.specialization,result.id_number,result.phone_number,result.gender,result.email).getRight();
        return Either.makeRight<Error,Doctor>(doctores);
    }
    else{
        return Either.makeLeft<Error,Doctor>(new Error('No se encontro el doctor por nombre y apellido'));
    }
   }

 async modificarDoctor(cedula: string): Promise<Either<Error, Doctor>> {
    // Aquí puedes buscar al doctor por cédula
    let doctor = await this.buscarDoctorPorCedula(cedula);
  
    if(doctor.isRight()){
      const DoctorEnt : DoctorEntity = {
        ID: doctor.getRight().getId(),
        name: doctor.getRight().getNombre(),
        lastname: doctor.getRight().getApellido(),
        specialization: doctor.getRight().getespecialidad(),
        id_number: doctor.getRight().getcedula(),
        phone_number: doctor.getRight().gettelefono(),
        gender: doctor.getRight().getgenero(),
        email: doctor.getRight().getCorreo(),
      };
  
      const result = await this.doctorRepository.save(DoctorEnt);
  
      if(result){
          return Either.makeRight<Error,Doctor>(doctor.getRight());
      }
      else{
          return Either.makeLeft<Error,Doctor>(new Error('Error de la base de datos no se modifico'));
      }
    }
    else{
      return Either.makeLeft<Error,Doctor>(doctor.getLeft());
    }
  }


 async eliminarDoctor(cedula:string): Promise<Either<Error,string>> {

    const result = await this.doctorRepository.delete(cedula);
    if(result.affected != 0){
        return Either.makeRight<Error,string>(cedula);
    }
    else{
        return Either.makeLeft<Error,string>(new Error('Error de la base de datos'));
    }

  }
}

