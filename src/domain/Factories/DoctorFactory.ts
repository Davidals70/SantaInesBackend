import { Either } from "../../utilidad/either";
import { idDoctor } from "../doctor/ValueObject/idDoctor";
import { FechaNacimiento } from "../doctor/ValueObject/FechaNacimiento";
import { Correo } from "../doctor/ValueObject/Correo";
import { Nombre } from "../doctor/ValueObject/Nombre";
import { Apellido } from "../doctor/ValueObject/Apellido";
import { Doctor } from "../doctor/Doctor";


export class DoctorFactory
{ static Create(nombre :string, apellido: string,fechaNacimiento: Date ,especialidad: string, cedula: string , Direccion :string,telefono: string, genero: string,  correo: string ,id?: string ): Either <Error,Doctor>{
    const nombreDoctor = Nombre.create(nombre);
    if(nombreDoctor.isLeft()){
        return Either.makeLeft<Error,Doctor>(nombreDoctor .getLeft());
    }
    else{
        const ApellidoDoctor = Apellido.create(apellido);
        if(ApellidoDoctor.isLeft()){
            return Either.makeLeft<Error,Doctor>(ApellidoDoctor.getLeft());
        }
        else{
            const fechaNacimientoDoctor = FechaNacimiento.create(fechaNacimiento);
                if(fechaNacimientoDoctor.isLeft()){
                    return Either.makeLeft<Error,Doctor>(fechaNacimientoDoctor.getLeft());
            }
            else{
                const fechaNacimientoUsuario = FechaNacimiento.create(fechaNacimiento);
                if(fechaNacimientoUsuario.isLeft()){
                    return Either.makeLeft<Error,Doctor>(fechaNacimientoUsuario.getLeft());
                }
                else{
                    const correoDoctor = Correo.create(correo);
                    if(correoDoctor.isLeft()){
                    return Either.makeLeft<Error,Doctor>(correoDoctor.getLeft());
                    }
                else{
                    return Either.makeRight<Error,Doctor>(new Doctor(nombreDoctor.getRight(),ApellidoDoctor.getRight(),fechaNacimientoDoctor.getRight(),especialidad,cedula,Direccion,telefono,genero,correoDoctor.getRight(),idDoctor.create(id)));
                }
            }
        }
    }
}

 }
}