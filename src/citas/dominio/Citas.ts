import { idDoctor } from "src/doctor/dominio/ValueObject/idDoctor";
import { idPaciente } from "src/paciente/dominio/ValueObject/idPaciente";
import { idCita } from "./ValueObject/idCita";
import { FechaCreacion } from "./ValueObject/FechaCreacion";

export class Paciente{
private fechaCreacion: FechaCreacion;
private fechaCita:FechaCreacion;
private id_doctor: idDoctor; 
private id_paciente: idPaciente;
private id_cita: idCita; 
private descripcion: string;

 private constructor(descripcion:string,fechaCreacion:FechaCreacion,fechaCita:FechaCreacion ,id_doctor?: idDoctor ,id_cita?: idCita,id_paciente?: idPaciente){
    this.descripcion=descripcion;
    this.fechaCreacion=fechaCreacion;
    this.fechaCita=fechaCita;
    this.id_doctor= id_doctor;
    this.id_cita=id_cita; 
    this.id_paciente=id_paciente; 
}

}