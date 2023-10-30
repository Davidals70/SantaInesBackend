import { Inject } from "@nestjs/common";
import { IApplicationService } from "src/utilidad/IApplicationService";
import { Either } from "src/utilidad/either";
import { Doctor } from "../../domain/doctor/Doctor";
import { RepositorioDoctor } from "../../domain/repositories/RepositorioDoctor";

export class ModificarDoctor implements IApplicationService<string, Doctor> {
    
    private readonly doctorRepositorio: RepositorioDoctor;

    constructor(@Inject('RepositorioDoctor') doctorRepo: RepositorioDoctor){
        this.doctorRepositorio = doctorRepo;
    }

    async execute(cedula: string): Promise<Either<Error,Doctor>>{
        // Aquí puedes buscar al doctor por cédula
        let doctor = await this.doctorRepositorio.buscarDoctorPorCedula(cedula);

        if(doctor.isRight()){
            return await this.doctorRepositorio.modificarDoctor(cedula, doctor.getRight());
        }
        else{
            return Either.makeLeft<Error,Doctor>(doctor.getLeft());
        }
    }
}
