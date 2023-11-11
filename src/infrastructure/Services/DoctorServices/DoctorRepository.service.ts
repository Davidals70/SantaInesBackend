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
          Doctor.create(doctor.name,doctor.lastname,doctor.specialization,doctor.id_number,doctor.phone_number,doctor.gender,doctor.email,doctor.ID));
      return Either.makeRight<Error,Doctor[]>(doctores);
  }
  else{
      return Either.makeLeft<Error,Doctor[]>(new Error('Error de la base de datos busqueda'));
  }
 }

 
 async buscarDoctorPorCorreo(correo: string): Promise<Either<Error,Doctor>> {
  const result: DoctorEntity = await this.doctorRepository.findOneBy({email:correo});
  if(result){
      const doctores: Doctor = Doctor.create(result.name,result.lastname,result.specialization,result.id_number,result.phone_number,result.gender,result.email,result.ID);
      return Either.makeRight<Error,Doctor>(doctores);
  }
  else{
      return Either.makeLeft<Error,Doctor>(new Error('No se encontro el doctor por correo'));
  }
 }

 async buscarDoctorPorEspecialidad(especialidad: string): Promise<Either<Error,Doctor>> {
    const result: DoctorEntity = await this.doctorRepository.findOneBy({specialization:especialidad});
    if(result){
        const doctores: Doctor = Doctor.create(result.name,result.lastname,result.specialization,result.id_number,
                                               result.phone_number,result.gender,result.email,result.ID);
        return Either.makeRight<Error,Doctor>(doctores);
    }
    else{
        return Either.makeLeft<Error,Doctor>(new Error('No se encontro el doctor por especialidad'));
    }
   }



 async buscarDoctorPorNombre(nombre: string, apellido: string): Promise<Either<Error, Doctor>> {
    const nombreLowerCase = nombre.toLowerCase();
    const apellidoLowerCase = apellido.toLowerCase();
  
    const result: DoctorEntity = await this.doctorRepository.findOneBy({
      name: nombreLowerCase,
      lastname: apellidoLowerCase,
    });
  
    if (result) {
      const doctores: Doctor = Doctor.create(
        result.name,
        result.lastname,
        result.specialization,
        result.id_number,
        result.phone_number,
        result.gender,
        result.email,
        result.ID
      );
      return Either.makeRight<Error, Doctor>(doctores);
    } else {
      return Either.makeLeft<Error, Doctor>(new Error('No se encontró el doctor por nombre y apellido'));
    }
  }



 async buscarDoctorPorCedula(cedula: string): Promise<Either<Error,Doctor>> {
    const result: DoctorEntity = await this.doctorRepository.findOneBy({id_number:cedula});
    if(result){
        const doctores: Doctor = Doctor.create(result.name,result.lastname,result.specialization,
                                               result.id_number,result.phone_number,
                                               result.gender,result.email,result.ID);
        return Either.makeRight<Error,Doctor>(doctores);
    }
    else{
        return Either.makeLeft<Error,Doctor>(new Error('No se encontro el doctor por Cedula'));
    }
   }

   async modificarDoctor(doctor: Doctor): Promise<Either<Error, Doctor>> {
    try {
        let doctorId = await this.doctorRepository.findOneBy({id_number:doctor.getcedula()});
        if(doctorId){
            doctorId.name = doctor.getNombre().toLowerCase();
            doctorId.lastname = doctor.getApellido().toLowerCase();
            doctorId.specialization = doctor.getespecialidad().toLowerCase();
            doctorId.id_number = doctor.getcedula();
            doctorId.phone_number = doctor.gettelefono();
            doctorId.gender = doctor.getgenero().toLowerCase();
            doctorId.email = doctor.getCorreo().toLowerCase();
            

            const result = await this.doctorRepository.save(doctorId);
            if(result){
                return Either.makeRight<Error, Doctor>(doctor);
            }
        }
        return Either.makeLeft<Error,Doctor>(new Error('Doctor no encontrado'));
    } catch (error) {
        console.log("ERROR CONEXION", error);
        return Either.makeLeft<Error,Doctor>(new Error('Error en la conexión a la base de datos'));
    }
}

  async eliminarDoctor(cedula:string): Promise<Either<Error,string>> {
    const doctor: DoctorEntity = await this.doctorRepository.findOneBy({id_number:cedula});
    if(doctor){
        await this.doctorRepository.delete(doctor);
        return Either.makeRight<Error,string>(cedula);
    }
    else{
        return Either.makeLeft<Error,string>(new Error('Error de la base de datos'));
    }
}

}

