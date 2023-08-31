import { Either } from "src/utilidad/Either";
import { Doctor} from "./Doctor";

export interface RepositorioDoctor{
    registrarDoctor(doctor: Doctor): Promise<Either<Error,Doctor>>;
    //buscarDoctor(): Promise<Either<Error,Iterable<Doctor>>>;
    //buscarDoctorPorEspecialidad(especialidad:string): Promise<Either<Error,Doctor>>;
   // buscarDoctorPorCorreo(correo:string): Promise<Either<Error,Doctor>>;
   // modificarDoctor(doctor: Doctor): Promise<Either<Error,Doctor>>;
}