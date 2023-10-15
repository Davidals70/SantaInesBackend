import { idDoctor } from "../doctor/ValueObject/idDoctor";
import { idPaciente } from "../paciente/dominio/ValueObject/idPaciente";
import { IdCita } from "./ValueObject/IdCita";
import { FechaCreacion } from "./ValueObject/FechaCreacion";

export class Cita {
  private fechaCreacion: FechaCreacion;
  private fechaCita: FechaCreacion;
  private idDoctor: idDoctor;
  private idPaciente: idPaciente;
  private idCita: IdCita;
  private descripcion: string;
  private estado: string;

  constructor(
    fechaCreacion: FechaCreacion,
    fechaCita: FechaCreacion,
    idDoctor: idDoctor,
    idPaciente: idPaciente,
    idCita: IdCita,
    descripcion: string,
    estado: string
  ) {
    this.descripcion = descripcion;
    this.fechaCreacion = fechaCreacion;
    this.fechaCita = fechaCita;
    this.idDoctor = idDoctor;
    this.idCita = idCita;
    this.idPaciente = idPaciente;
    this.estado = estado;
  }

  getDescripcion(): string {
    return this.descripcion;
  }

  setDescripcion(value: string) {
    this.descripcion = value;
  }

  getFechaCreacion(): Date {
    return this.fechaCreacion.getFechaCreacion();
  }

  setFechaCreacion(value: FechaCreacion) {
    this.fechaCreacion = value;
  }

  getFechaCita(): Date {
    return this.fechaCita.getFechaCreacion();
  }

  setFechaCita(value: FechaCreacion) {
    this.fechaCita = value;
  }

  getIdDoctor(): string {
    return this.idDoctor.getIDDoctor();
  }

  setIdDoctor(value: idDoctor) {
    this.idDoctor = value;
  }

  getIdCita(): string {
    return this.idCita.getIDCita();
  }

  setIdCita(value: IdCita) {
    this.idCita = value;
  }

  getIdPaciente(): string {
    return this.idPaciente.getIDPaciente();
  }

  setIdPaciente(value: idPaciente) {
    this.idPaciente = value;
  }

  getEstado(): string {
    return this.estado;
  }

  setEstado(value: string) {
    this.estado = value;
  }
}
