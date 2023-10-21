import { Inject } from "@nestjs/common";
import { IApplicationService } from "src/utilidad/IApplicationService";
import { Either } from "src/utilidad/either";
import { Doctor } from "../../domain/doctor/Doctor";
import { RepositorioDoctor } from "../../domain/repositories/RepositorioDoctor";

export class BuscarDoctores implements IApplicationService<string,Iterable<Doctor>>{

    private readonly doctorRepositorio: RepositorioDoctor;

    constructor(@Inject('RepositorioDoctor') doctorRepo: RepositorioDoctor) {
        this.doctorRepositorio = doctorRepo;
    }

    async execute(service: string): Promise<Either<Error,Iterable<Doctor>>>{
            
        console.log(service);
        return await this.doctorRepositorio.buscarDoctores();

    }

}