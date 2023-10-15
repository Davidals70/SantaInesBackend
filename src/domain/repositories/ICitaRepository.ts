import { Cita } from "../citas/Cita";

export interface ICitaRepository{
    CrearCita(cita: Cita): Promise<Cita | null>;
    GetCitaPorId(idCita: string): Promise<Cita | null>;
    GetCitasPorIdDoctor(idDoctor: string): Promise<Cita[]>;
    ActualizarCita(id:string, cita: Cita): Promise<Boolean>;
    EliminarCita(idCita: string): Promise<Boolean>;
}