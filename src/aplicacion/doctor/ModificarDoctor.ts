import { Inject } from "@nestjs/common";
import { IApplicationService } from "src/utilidad/IApplicationService";
import { Either } from "src/utilidad/either";
import { Doctor } from "../../domain/doctor/Doctor";
import { RepositorioDoctor } from "../../domain/repositories/RepositorioDoctor";
import { ModificarDoctorDto } from "./DataTransferObject/ModificarDoctorDto";

export class ModificarDoctor implements IApplicationService<ModificarDoctorDto,Doctor>{
    
    private readonly docotorRepositorio: RepositorioDoctor;

    constructor(@Inject('RepositorioDocotor') doctorRepo: RepositorioDoctor){
        this.docotorRepositorio = doctorRepo;
    }

    async execute(service: ModificarDoctorDto): Promise<Either<Error,Doctor>>{
        let doctor =   Doctor.create(service.nombre,service.apellido,service.especialidad,service.cedula,service.telefono,service.genero,service.correo,service.IdDoctor);

        if(doctor.isRight()){
            return await this.docotorRepositorio.modificarDoctor(doctor.getRight());
        }
        else{
            return Either.makeLeft<Error,Doctor>(doctor.getLeft());
        }
    }

}