import { IApplicationService } from "src/utilidad/IApplicationService";
import { RegistrarDoctorDto } from "./DataTransferObject/RegistrarDoctorDto";
import { Doctor } from "../../domain/doctor/Doctor";
import { RepositorioDoctor } from "../../domain/repositories/RepositorioDoctor";
import { Inject } from "@nestjs/common";
import { Either } from "src/utilidad/either";

export class RegistrarDoctorService implements IApplicationService<RegistrarDoctorDto,Doctor>{

    private readonly Repositoriodoctor: RepositorioDoctor;

    constructor(@Inject('RepositorioDoctor') doctorRepo: RepositorioDoctor){
        this.Repositoriodoctor = doctorRepo;
    }

    async execute(service: RegistrarDoctorDto): Promise<Either<Error,Doctor>>{
        let doctor = Doctor.create(service.nombre,service.apellido,service.especialidad
                                  ,service.cedula,service.telefono,service.genero,
                                  service.correo,service.id_usuario,service.id);

        if(doctor){
            return await this.Repositoriodoctor.registrarDoctor(doctor);
        }
        
    }

}