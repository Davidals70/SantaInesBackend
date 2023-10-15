import { Cita } from "../citas/Cita";
import { FechaCreacion } from "../citas/ValueObject/FechaCreacion";
import { IdCita } from "../citas/ValueObject/IdCita";
import { idDoctor } from "../doctor/ValueObject/idDoctor";
import { idPaciente } from "../paciente/dominio/ValueObject/idPaciente";

export class CitaFactory{
    CrearCita(id: string | null, doctor: string, paciente: string, fechaCreacion: Date, fechaCita: Date, descripcion: string, estado: string): 
    Cita{
        return new Cita(
            FechaCreacion.create(fechaCreacion).getRight(),
            FechaCreacion.create(fechaCita).getRight(),
            idDoctor.create(doctor),
            idPaciente.create(paciente),
            IdCita.create(id),
            descripcion,
            estado
          );
    }
}