import { Cita } from "src/domain/citas/Cita";
import { IService } from "../IService";
import { IAppointmentRepository } from "src/domain/repositories/IAppointmentRepository";

export class CreateAppointmentService implements IService<Cita, Promise<Cita | string>>{
    constructor(private readonly appointmentRepository: IAppointmentRepository){}

    async Execute(parameter: Cita): Promise<string | Cita> {
        try {
            const appointment: Cita | null = await this.appointmentRepository.GetAppointmentByDateAndDoctorId(parameter.getFechaCita(), parameter.getIdDoctor());
            if(!appointment){
                const newAppointment: Cita | null = await this.appointmentRepository.CreateAppointment(parameter);
                return newAppointment;
            }
            return 'Appointment on this datetime for this doctor already exists';
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}