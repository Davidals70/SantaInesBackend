import { IApplicationService } from "src/utilidad/IApplicationService";
import { BuscarIdUserDto } from "./DataTransferObject/BuscarIdUserDto";
import { Doctor } from "../../domain/doctor/Doctor";
import { Inject } from "@nestjs/common";
import { Either } from "src/utilidad/either";
import { RepositorioDoctor } from "../../domain/repositories/RepositorioDoctor";

export class BuscarIdUser implements IApplicationService<BuscarIdUserDto,Doctor>{

    private readonly doctorRepositorio: RepositorioDoctor;

    constructor(@Inject('RepositorioDoctor') doctorRepo: RepositorioDoctor) {
        this.doctorRepositorio = doctorRepo;
    }

    async execute(service: BuscarIdUserDto): Promise<Either<Error,Doctor>>{
            
        return await this.doctorRepositorio.buscarIdUser(service.id_user);

    }
    
}