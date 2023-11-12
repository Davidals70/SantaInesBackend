import { idPaciente } from "./ValueObject/idPaciente";
import { FechaNacimiento } from "./ValueObject/FechaNacimiento";
import { Correo } from "./ValueObject/Correo";

export class Paciente{
private nombre: string;
private apellido: string;
private fechaNacimiento: FechaNacimiento;
private cedula: string ;
private Direccion :string;
private telefono: string;
private genero: string;
private correo: Correo;
private id: idPaciente; 

constructor(nombre :string, apellido: string,fechaNacimiento: FechaNacimiento, cedula: string , Direccion :string,telefono: string, genero: string,  correo: Correo ,id?: idPaciente ){
    this.nombre=nombre;
    this.apellido=apellido;
    this.fechaNacimiento=fechaNacimiento;
    this.cedula=cedula;
    this.Direccion=Direccion;
    this.telefono= telefono;
    this.genero=genero;
    this.correo=correo;
    this.id=id;
}


//getters and setters
public getNombre(): string {
    return this.nombre;
}

public setNombre(nombre: string): void {
    this.nombre = nombre;
}

public getApellido(): string {
    return this.apellido;
}

public setApellido(apellido: string): void {
    this.apellido = apellido;
}

public getFechaNacimiento(): Date {
    return this.fechaNacimiento.getFechaNacimiento();
}

public setFechaNacimiento(fechaNacimiento: Date): void {
    this.fechaNacimiento = FechaNacimiento.create(fechaNacimiento).getRight();
}

public getCedula(): string {
    return this.cedula;
}

public setCedula(cedula: string): void {
    this.cedula = cedula;
}

public getDireccion(): string {
    return this.Direccion;
}

public setDireccion(Direccion: string): void {
    this.Direccion = Direccion;
}

public getTelefono(): string {
    return this.telefono;
}

public setTelefono(telefono: string): void {
    this.telefono = telefono;
}

public getGenero(): string {
    return this.genero;
}

public setGenero(genero: string): void {
    this.genero = genero;
}

public getCorreo(): string {
    return this.correo.getCorreo();
}

public setCorreo(correo: string): void {
    this.correo = Correo.create(correo).getRight();
}

public getId(): idPaciente {
    return this.id;
}

public setId(id: idPaciente): void {
    this.id = id;
}


}