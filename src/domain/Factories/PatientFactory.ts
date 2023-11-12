import { Paciente } from "../paciente/dominio/Paciente";
import { Correo } from "../paciente/dominio/ValueObject/Correo";
import { FechaNacimiento } from "../paciente/dominio/ValueObject/FechaNacimiento";
import { idPaciente } from "../paciente/dominio/ValueObject/idPaciente";




export class PatientFactory{
    CreatePatient(id: string | null, nombre: string, apellido: string, fechaNacimiento: Date, cedula: string, direccion: string, telefono: string, genero: string, correo: string):
    Paciente{
        return new Paciente(
            nombre,
            apellido,
            FechaNacimiento.create(fechaNacimiento).getRight(),
            cedula,
            direccion,
            telefono,
            genero,
            Correo.create(correo).getRight(),
            idPaciente.create(id),
          );
    }
}