import { Inject } from "@nestjs/common";
import { IApplicationService } from "../../../utilidad/IApplicationService";
import { Either } from "../../../utilidad/either";
import { Doctor } from "../dominio/Doctor";
import { RepositorioDoctor } from "../dominio/RepositorioDoctor";
import { ModificarDoctorDto } from "./DataTransferObject/ModificarDoctorDto";

export class ModificarDoctor implements IApplicationService<ModificarDoctorDto,Doctor>{
    
    private readonly docotorRepositorio: RepositorioDoctor;

    constructor(@Inject('RepositorioDocotor') doctorRepo: RepositorioDoctor){
        this.docotorRepositorio = doctorRepo;
    }

    async execute(service: ModificarDoctorDto): Promise<Either<Error,Doctor>>{
        let doctor =   Doctor.create(service.nombre,service.apellido,service.fechaNacimiento,service.especialidad,service.cedula,service.Direccion,service.telefono,service.genero,service.correo,service.IdDoctor);

        if(doctor.isRight()){
            return await this.docotorRepositorio.modificarDoctor(doctor.getRight());
        }
        else{
            return Either.makeLeft<Error,Doctor>(doctor.getLeft());
        }
    }

}