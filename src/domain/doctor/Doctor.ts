import { Either } from "../../utilidad/either";
import { idDoctor } from "./ValueObject/idDoctor";
import { Correo } from "./ValueObject/Correo";
import { Nombre } from "./ValueObject/Nombre";
import { Apellido } from "./ValueObject/Apellido";


export class Doctor{
private nombre :Nombre;
private apellido: Apellido;
private especialidad :string;
private cedula: string ;
private telefono: string;
private genero: string;
private correo: Correo;
private id: idDoctor; 

constructor(nombre :Nombre, apellido: Apellido , especialidad: string, cedula: string ,telefono: string, 
            genero: string,  correo: Correo ,id?: idDoctor )
 
    {
    this.nombre=nombre;
    this.apellido=apellido;
    this.especialidad=especialidad;
    this.cedula=cedula;
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

  static create(nombre :string, apellido: string ,especialidad: string, cedula: string ,telefono: string
             , genero: string,  correo: string ,id: string ): Either <Error,Doctor>{
               
   const nombreDoctor = Nombre.create(nombre);
   const uuiddoctor = idDoctor.create(id)
   if(nombreDoctor.isLeft()){
       return Either.makeLeft<Error,Doctor>(nombreDoctor .getLeft());
   }
   else{
       const ApellidoDoctor = Apellido.create(apellido);
       if(ApellidoDoctor.isLeft()){
           return Either.makeLeft<Error,Doctor>(ApellidoDoctor.getLeft());
       }
               else{
                   const correoDoctor = Correo.create(correo);
                   if(correoDoctor.isLeft()){
                   return Either.makeLeft<Error,Doctor>(correoDoctor.getLeft());
                   }
               else{
                   return Either.makeRight<Error,Doctor>(new Doctor(nombreDoctor.getRight(),ApellidoDoctor.getRight(),especialidad,cedula,telefono,genero,correoDoctor.getRight(),uuiddoctor));
               }
           }
       }
   }
}




