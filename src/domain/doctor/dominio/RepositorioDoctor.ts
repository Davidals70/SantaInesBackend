import { Either } from "../../../utilidad/either";
import { Doctor} from "./Doctor";

export interface RepositorioDoctor{
    registrarDoctor(doctor: Doctor): Promise<Either<Error,Doctor>>;
    buscarDoctores(): Promise<Either<Error,Iterable<Doctor>>>;
    buscarDoctorPorNombre(nombre: string,apellido:string): Promise<Either<Error,Doctor>>;
    buscarDoctorPorEspecialidad(especialidad:string): Promise<Either<Error,Doctor>>;
    buscarDoctorPorCorreo(correo:string): Promise<Either<Error,Doctor>>;
    modificarDoctor(doctor: Doctor): Promise<Either<Error,Doctor>>;
}