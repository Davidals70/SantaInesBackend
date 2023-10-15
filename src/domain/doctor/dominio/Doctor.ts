import { Either } from "../../../utilidad/either";
import { idDoctor } from "./ValueObject/idDoctor";
import { FechaNacimiento } from "./ValueObject/FechaNacimiento";
import { Correo } from "./ValueObject/Correo";
import { Nombre } from "./ValueObject/Nombre";
import { Apellido } from "./ValueObject/Apellido";


export class Doctor{
private nombre :Nombre;
private apellido: Apellido;
private fechaNacimiento: FechaNacimiento;
private especialidad :string;
private cedula: string ;
private Direccion :string;
private telefono: string;
private genero: string;
private correo: Correo;
private id: idDoctor; 

 private constructor(nombre :Nombre, apellido: Apellido,fechaNacimiento: FechaNacimiento,especialidad: string, cedula: string , Direccion :string,telefono: string, genero: string,  correo: Correo ,id?: idDoctor ){
    this.nombre=nombre;
    this.apellido=apellido;
    this.fechaNacimiento=fechaNacimiento;
    this.especialidad=especialidad;
    this.cedula=cedula;
    this.Direccion=Direccion;
    this.telefono= telefono;
    this.genero=genero;
    this.correo=correo;
    this.id= id;
}


public getNombre(): string{
    return this.nombre.getNombre();
}

public getApellido(): string{
    return this.apellido.getApellido();
}

public getFechaNacimiento(): Date{
    return this.fechaNacimiento.getFechaNacimiento();
}

public getespecialidad():string {
    return this.especialidad.toString();
}

public getcedula():string {
    return this.cedula.toString();
}
public getDireccion():string {
    return this.Direccion.toString();
}

public gettelefono():string {
    return this.telefono.toString();
}

public getgenero():string {
    return this.genero.toString();
}

public getCorreo(): string{
    return this.correo.getCorreo();
}


public getId(): string{
    return this.id.getIDDoctor();
}

static create(nombre :string, apellido: string,fechaNacimiento: Date ,especialidad: string, cedula: string , Direccion :string,telefono: string, genero: string,  correo: string ,id?: string ): Either <Error,Doctor>{
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