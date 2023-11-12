import { Cita } from "../citas/Cita";

export interface IAppointmentRepository{
    CreateAppointment(appointment: Cita): Promise<Cita | null>;
    GetAppointmentById(appointmentId: string): Promise<Cita | null>;
    GetAppointmentsByDoctorId(doctorId: string): Promise<Cita[]>;
    GetAppointmentsByPatientId(patientId: string): Promise<Cita[]>;
    GetAppointmentByDateAndDoctorId(appointmentDate: Date, doctorId: string): Promise<Cita | null>;
    UpdateAppointment(appointmentId: string, appointment: Cita): Promise<Boolean>;
    DeleteAppointment(appointmentId: string): Promise<Boolean>;
    DevOnlyTrueDeleteAppointment(appointmentId: string): Promise<Boolean>;
}