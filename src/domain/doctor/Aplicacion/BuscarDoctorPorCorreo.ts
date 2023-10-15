import { IApplicationService } from "../../../utilidad/IApplicationService";
import {BuscarCorreoDto } from "./DataTransferObject/BuscarCorreoDto";
import { Doctor } from "../dominio/Doctor";
import { Inject } from "@nestjs/common";
import { Either } from "../../../utilidad/either";
import { RepositorioDoctor } from "../dominio/RepositorioDoctor";

export class buscarDoctorPorCorreo implements IApplicationService<BuscarCorreoDto,Doctor>{

    private readonly doctorRepositorio: RepositorioDoctor;

    constructor(@Inject('RepositorioDoctor') doctorRepo: RepositorioDoctor) {
        this.doctorRepositorio = doctorRepo;
    }

    async execute(service: BuscarCorreoDto): Promise<Either<Error,Doctor>>{
            
        return await this.doctorRepositorio.buscarDoctorPorCorreo(service.correo);

    }
    
}