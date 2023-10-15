import { Inject } from "@nestjs/common";
import { IApplicationService } from "../../../utilidad/IApplicationService";
import { Either } from "../../../utilidad/either";
import { Doctor } from "../dominio/Doctor";
import { RepositorioDoctor } from "../dominio/RepositorioDoctor";

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