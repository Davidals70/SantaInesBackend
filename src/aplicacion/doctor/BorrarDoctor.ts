import { Inject } from "@nestjs/common";
import { IApplicationService } from "src/utilidad/IApplicationService";
import { RepositorioDoctor } from "../../domain/repositories/RepositorioDoctor";
import { Either } from "src/utilidad/Either";
import { BorrarDoctorDto } from "./DataTransferObject/BorrarDoctorDto";

export class BorrarDoctor implements IApplicationService<BorrarDoctorDto,string>{

   
    private readonly doctorRepositorio: RepositorioDoctor;

    constructor(@Inject('RepositorioDoctor') docRepo: RepositorioDoctor) {
        this.doctorRepositorio = docRepo;
    }

    async execute(service: BorrarDoctorDto): Promise<Either<Error,string>>{

        
        if(service){

            return await this.doctorRepositorio.eliminarDoctor(service.IDdoctor);
        }
        else{
            return Either.makeLeft<Error,string>(new Error('Error con el Dto'));
        }

    }

    
}