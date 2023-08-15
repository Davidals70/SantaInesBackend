import { idPaciente } from "./ValueObject/idPaciente";
import { FechaNacimiento } from "./ValueObject/FechaNacimiento";
import { Correo } from "./ValueObject/Correo";

export class Paciente{
private nombre :string;
private apellido: string;
private fechaNacimiento: FechaNacimiento;
private cedula: string ;
private Direccion :string;
private telefono: string;
private genero: string;
private correo: Correo;
private id: idPaciente; 

 private constructor(nombre :string, apellido: string,fechaNacimiento: FechaNacimiento, cedula: string , Direccion :string,telefono: string, genero: string,  correo: Correo ,id?: idPaciente ){
    this.nombre=nombre;
    this.apellido=apellido;
    this.fechaNacimiento=fechaNacimiento;
    this.cedula=cedula;
    this.Direccion=Direccion;
    this.telefono= telefono;
    this.genero=genero;
    this.correo=correo;
    this.id= id;
}

}