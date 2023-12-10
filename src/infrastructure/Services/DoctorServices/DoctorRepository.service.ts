import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { DoctorEntity } from '../../db-entities/doctor.entity';
import { AppointmentEntity } from 'src/infrastructure/db-entities/appointment.entity';
import { Doctor } from 'src/domain/doctor/Doctor';
import { RepositorioDoctor } from "src/domain/repositories/RepositorioDoctor";
import { Either } from "src/utilidad/either";

@Injectable()
export class DoctorRepositoryService implements RepositorioDoctor 
{
  constructor(
    @InjectRepository(DoctorEntity)
    private doctorRepository: Repository<DoctorEntity>,

    @InjectRepository(AppointmentEntity)
    private AppointmentRepository: Repository<AppointmentEntity>


  ) {}

  async registrarDoctor(doctor: Doctor): Promise<Either<Error, Doctor>> {
    // Busca un doctor existente con la misma cédula
    const existingDoctor = await this.doctorRepository.findOneBy({id_number:doctor.getcedula()});

    // Si ya existe un doctor con la misma cédula, devuelve un error
    if (existingDoctor) {
        return Either.makeLeft<Error,Doctor>(new Error('Ya existe un doctor con esa cédula'));
    }


    const usuarioEnt : DoctorEntity = {
        ID: doctor.getId(),
        name: doctor.getNombre(),
        lastname: doctor.getApellido(),
        specialization: doctor.getespecialidad(),
        id_number: doctor.getcedula(),
        phone_number: doctor.gettelefono(),
        gender: doctor.getgenero(),
        email: doctor.getCorreo(),
        user_id:doctor.getIdUsuario(),
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
          Doctor.create(doctor.name,doctor.lastname,doctor.specialization,doctor.id_number,
                        doctor.phone_number,doctor.gender,
                        doctor.email,doctor.user_id,doctor.ID));
      return Either.makeRight<Error,Doctor[]>(doctores);
  }
  else{
      return Either.makeLeft<Error,Doctor[]>(new Error('No se encontro ningun doctor'));
  }
 }

 
 async buscarDoctorPorCorreo(correo: string): Promise<Either<Error,Doctor>> {
  const result: DoctorEntity = await this.doctorRepository.findOneBy({
    email:Raw(alias => `LOWER(${alias}) = LOWER('${correo}')`)});
  if(result){
      const doctores: Doctor = Doctor.create(result.name,result.lastname,result.specialization,result.id_number,result.phone_number,result.gender,result.email,result.user_id,result.ID);
      return Either.makeRight<Error,Doctor>(doctores);
  }
  else{
      return Either.makeLeft<Error,Doctor>(new Error('No se encontro el doctor por correo'));
  }
 }

 async buscarDoctorPorEspecialidad(especialidad: string): Promise<Either<Error,Doctor>> {
    const result: DoctorEntity = await this.doctorRepository.findOneBy({
        specialization:Raw(alias => `LOWER(${alias}) = LOWER('${especialidad}')`)});
    if(result){
        const doctores: Doctor = Doctor.create(result.name,result.lastname,result.specialization,result.id_number,
                                               result.phone_number,result.gender,result.email,result.user_id,result.ID);
        return Either.makeRight<Error,Doctor>(doctores);
    }
    else{
        return Either.makeLeft<Error,Doctor>(new Error('No se encontro el doctor por especialidad'));
    }
   }



 async buscarDoctorPorNombre(nombre: string, apellido: string): Promise<Either<Error, Doctor>> { 
    const result: DoctorEntity = await this.doctorRepository.findOneBy({
      name: Raw(alias => `LOWER(${alias}) = LOWER('${nombre}')`),
      lastname: Raw(alias => `LOWER(${alias}) = LOWER('${apellido}')`),
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
        result.user_id,
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
                                               result.gender,result.email,result.user_id,result.ID);
        return Either.makeRight<Error,Doctor>(doctores);
    }
    else{
        return Either.makeLeft<Error,Doctor>(new Error('No se encontro el doctor por Cedula'));
    }
   }

   

   async buscarIdUser(id_user: string): Promise<Either<Error,Doctor>> {
    const result: DoctorEntity = await this.doctorRepository.findOneBy({user_id:id_user});
    if(result){
        const doctores: Doctor = Doctor.create(result.name,result.lastname,result.specialization,
                                               result.id_number,result.phone_number,
                                               result.gender,result.email,result.user_id,result.ID);
        return Either.makeRight<Error,Doctor>(doctores);
    }
    else{
        return Either.makeLeft<Error,Doctor>(new Error('No se encontro doctores por id de secretaria'));
    }
   }

   async modificarDoctor(cedula: string, doctor: Doctor): Promise<Either<Error, Doctor>> {
    try {
        let doctorId = await this.doctorRepository.findOneBy({id_number: cedula});
        if(doctorId){
            // Verificar si la nueva cédula ya está en uso por otro doctor
            if (doctor.getcedula() !== cedula) {
                let doctorConNuevaCedula = await this.doctorRepository.findOneBy({id_number: doctor.getcedula()});
                if (doctorConNuevaCedula) {
                    return Either.makeLeft<Error,Doctor>(new Error('La nueva cédula ya está en uso'));
                }
            }
            // Continuar con la actualización si la nueva cédula no está en uso o es la misma que la cédula actual
            if (doctor.getNombre()) doctorId.name = doctor.getNombre();
            if (doctor.getApellido()) doctorId.lastname = doctor.getApellido();
            if (doctor.getespecialidad()) doctorId.specialization = doctor.getespecialidad();
            if (doctor.getcedula()) doctorId.id_number = doctor.getcedula();
            if (doctor.gettelefono()) doctorId.phone_number = doctor.gettelefono();
            if (doctor.getgenero()) doctorId.gender = doctor.getgenero();
            if (doctor.getCorreo()) doctorId.email = doctor.getCorreo();
            if (doctor.getIdUsuario()) doctorId.user_id = doctor.getIdUsuario();
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
     
        // Buscar citas para este doctor
        const citas = await this.AppointmentRepository.find({ where: { doctor_id: doctor.id_number } });
        if (citas.length > 0) {
            // Si el doctor tiene citas, no permitir la eliminación
            return Either.makeLeft<Error,string>(new Error('No se puede eliminar un doctor que tiene citas asignadas'));
        } else {
            // Si el doctor no tiene citas, proceder con la eliminación
            await this.doctorRepository.remove(doctor);
            return Either.makeRight<Error,string>(cedula);
        }
    }
    else{
        return Either.makeLeft<Error,string>(new Error('Error de la base de datos'));
    }
}


}

