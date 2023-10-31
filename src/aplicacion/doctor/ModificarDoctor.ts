import { Inject } from "@nestjs/common";
import { IApplicationService } from "src/utilidad/IApplicationService";
import { Either } from "src/utilidad/either";
import { Doctor } from "../../domain/doctor/Doctor";
import { RepositorioDoctor } from "../../domain/repositories/RepositorioDoctor";
import { ModificarDoctorDto } from "./DataTransferObject/ModificarDoctorDto";


export class ModificarDoctor implements IApplicationService<ModificarDoctorDto, Doctor> {    
    private readonly doctorRepositorio: RepositorioDoctor;
    constructor(@Inject('RepositorioDoctor') doctorRepo: RepositorioDoctor){
        this.doctorRepositorio = doctorRepo;
    }
    async execute(dto: ModificarDoctorDto): Promise<Either<Error,Doctor>>{
        let doctor = Doctor.create(dto.IdDoctor,dto.nombre, dto.apellido, dto.especialidad, dto.cedula,
                                   dto.telefono, dto.genero, dto.correo);
        if(doctor.isRight()){
            return await this.doctorRepositorio.modificarDoctor(doctor.getRight());
        }
        else{
            return Either.makeLeft<Error,Doctor>(doctor.getLeft());
        }
    }
}
