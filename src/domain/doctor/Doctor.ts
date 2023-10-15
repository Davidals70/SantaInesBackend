import { Either } from "../../utilidad/either";
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

constructor(nombre :Nombre, apellido: Apellido,fechaNacimiento: FechaNacimiento,especialidad: string, cedula: string , Direccion :string,telefono: string, genero: string,  correo: Correo ,id?: idDoctor )
 
    {
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


 getNombre(): string{
    return this.nombre.getNombre();
 }

 setNombre(value: Nombre) {
    this.nombre= value;
  }
 getApellido(): string{
    return this.apellido.getApellido();
 }

 setApellido(value:Apellido ) {
    this.apellido = value;
  }

 getFechaNacimiento(): Date{
    return this.fechaNacimiento.getFechaNacimiento();
 } 

 setFechaNacimiento(value:FechaNacimiento ) {
    this.fechaNacimiento = value;
 }

 getespecialidad():string {
    return this.especialidad.toString();
 }

 setespecialidad(value:string ) {
    this.especialidad= value;
  }

 getcedula():string {
    return this.cedula.toString();
 }

 setcedula(value: string) {
    this.cedula = value;
  } 

 getDireccion():string {
    return this.Direccion.toString();
 }

 setDireccion(value:string ) {
    this.Direccion = value;
  }

 gettelefono():string {
    return this.telefono.toString();
 }

 settelefono(value:string ) {
    this.telefono = value;
  }

 getgenero():string {
    return this.genero.toString();
 }

 setgenero(value:string ) {
    this.genero= value;
   }

 getCorreo(): string{
    return this.correo.getCorreo();
 }

 setCorreo(value:Correo ) {
    this.correo= value;
  }


 getId(): string{
    return this.id.getIDDoctor();
 }

 setId(value:idDoctor) {
    this.id= value;
  }


}