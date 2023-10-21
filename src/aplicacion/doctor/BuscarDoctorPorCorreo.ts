import { IApplicationService } from "src/utilidad/IApplicationService";
import {BuscarCorreoDto } from "./DataTransferObject/BuscarCorreoDto";
import { Doctor } from "../../domain/doctor/Doctor";
import { Inject } from "@nestjs/common";
import { Either } from "src/utilidad/Either";
import { RepositorioDoctor } from "../../domain/repositories/RepositorioDoctor";

export class BuscarDoctorPorCorreo implements IApplicationService<BuscarCorreoDto,Doctor>{

    private readonly doctorRepositorio: RepositorioDoctor;

    constructor(@Inject('RepositorioDoctor') doctorRepo: RepositorioDoctor) {
        this.doctorRepositorio = doctorRepo;
    }

    async execute(service: BuscarCorreoDto): Promise<Either<Error,Doctor>>{
            
        return await this.doctorRepositorio.buscarDoctorPorCorreo(service.correo);

    }
    
}