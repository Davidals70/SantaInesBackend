import { IApplicationService } from "src/utilidad/IApplicationService";
import {BuscarEspecialidadDto } from "./DataTransferObject/BuscarEspecialidadDto";
import { Doctor } from "../../domain/doctor/Doctor";
import { Inject } from "@nestjs/common";
import { Either } from "src/utilidad/Either";
import { RepositorioDoctor } from "../../domain/repositories/RepositorioDoctor";

export class buscarDoctorPorEspecialidad implements IApplicationService<BuscarEspecialidadDto,Doctor>{

    private readonly doctorRepositorio: RepositorioDoctor;

    constructor(@Inject('RepositorioDoctor') doctorRepo: RepositorioDoctor) {
        this.doctorRepositorio = doctorRepo;
    }

    async execute(service: BuscarEspecialidadDto): Promise<Either<Error,Doctor>>{
            
        return await this.doctorRepositorio.buscarDoctorPorEspecialidad(service.especialidad);

    }
    
}