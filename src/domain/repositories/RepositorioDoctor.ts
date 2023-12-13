import { Either } from "../../utilidad/either";
import { Doctor} from "../doctor/Doctor";

export interface RepositorioDoctor{
    registrarDoctor(doctor: Doctor): Promise<Either<Error,Doctor>>;
    buscarDoctores(): Promise<Either<Error,Iterable<Doctor>>>;
    buscarDoctorPorNombre(nombre: string,apellido:string): Promise<Either<Error, Doctor[]>>;
    buscarDoctorPorEspecialidad(especialidad:string): Promise<Either<Error, Doctor[]>>;
    buscarDoctorPorCorreo(correo:string): Promise<Either<Error,Doctor>>;
    buscarDoctorPorCedula(cedula:string): Promise<Either<Error,Doctor>>;
    modificarDoctor(cedula:string,doctor:Doctor): Promise<Either<Error,Doctor>>;
    buscarIdUser(id_user: string): Promise<Either<Error, Doctor[]>>;
    eliminarDoctor (cedula:string): Promise<Either<Error,string>>;
}