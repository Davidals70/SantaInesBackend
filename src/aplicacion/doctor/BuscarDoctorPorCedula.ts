import { IApplicationService } from "src/utilidad/IApplicationService";
import { BuscarCedulaDto } from "./DataTransferObject/BuscarCedulaDto";
import { Doctor } from "../../domain/doctor/Doctor";
import { Inject } from "@nestjs/common";
import { Either } from "src/utilidad/either";
import { RepositorioDoctor } from "../../domain/repositories/RepositorioDoctor";

export class BuscarDoctorPorCedula implements IApplicationService<BuscarCedulaDto,Doctor>{

    private readonly doctorRepositorio: RepositorioDoctor;

    constructor(@Inject('RepositorioDoctor') doctorRepo: RepositorioDoctor) {
        this.doctorRepositorio = doctorRepo;
    }

    async execute(service: BuscarCedulaDto): Promise<Either<Error,Doctor>>{
            
        return await this.doctorRepositorio.buscarDoctorPorCedula(service.cedula);

    }
    
}