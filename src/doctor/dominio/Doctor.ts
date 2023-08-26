import { idDoctor } from "./ValueObject/idDoctor";
import { FechaNacimiento } from "./ValueObject/FechaNacimiento";
import { Correo } from "./ValueObject/Correo";

export class Paciente{
private nombre :string;
private apellido: string;
private fechaNacimiento: FechaNacimiento;
private especialidad :string;
private cedula: string ;
private Direccion :string;
private telefono: string;
private genero: string;
private correo: Correo;
private id: idDoctor; 

 private constructor(nombre :string, apellido: string,fechaNacimiento: FechaNacimiento,especialidad: string, cedula: string , Direccion :string,telefono: string, genero: string,  correo: Correo ,id?: idDoctor ){
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

}