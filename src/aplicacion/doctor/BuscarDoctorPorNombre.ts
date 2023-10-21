import { IApplicationService } from "src/utilidad/IApplicationService";
import {BuscarDoctorNombreDto } from "./DataTransferObject/BuscarDoctorNombreDto";
import { Doctor } from "../../domain/doctor/Doctor";
import { Inject } from "@nestjs/common";
import { Either } from "src/utilidad/either";
import { RepositorioDoctor } from "../../domain/repositories/RepositorioDoctor";

export class BuscarDoctorPornombre implements IApplicationService<BuscarDoctorNombreDto,Doctor>{

    private readonly doctorRepositorio: RepositorioDoctor;

    constructor(@Inject('RepositorioDoctor') doctorRepo: RepositorioDoctor) {
        this.doctorRepositorio = doctorRepo;
    }

    async execute(service: BuscarDoctorNombreDto): Promise<Either<Error,Doctor>>{
            
        return await this.doctorRepositorio.buscarDoctorPorNombre(service.nombre,service.apellido);

    }
    
}