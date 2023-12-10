import { Inject } from "@nestjs/common";
import { Iaplication3 } from "src/utilidad/Iaplication3";
import { Either } from "src/utilidad/either";
import { Doctor } from "src/domain/doctor/Doctor";
import { RepositorioDoctor } from "../../domain/repositories/RepositorioDoctor";
import { ModificarDoctorDto } from "./DataTransferObject/ModificarDoctorDto";


export class ModificarDoctor implements Iaplication3<string, ModificarDoctorDto, Doctor> {    
    private readonly doctorRepositorio: RepositorioDoctor;
    constructor(@Inject('RepositorioDoctor') doctorRepo: RepositorioDoctor){
        this.doctorRepositorio = doctorRepo;
    }
    async execute(cedula: string, dto: ModificarDoctorDto): Promise<Either<Error,Doctor>>{
        let doctor = Doctor.create(dto.nombre || "", dto.apellido || "", dto.especialidad || "", dto.cedula,
                                   dto.telefono || "", dto.genero || "", dto.correo || "", dto.id_usuario || null, dto.id || null);
        if(doctor){
            return await this.doctorRepositorio.modificarDoctor(cedula, doctor);
        }
    }
}

