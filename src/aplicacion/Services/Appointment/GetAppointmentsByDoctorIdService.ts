import { Cita } from "src/domain/citas/Cita";
import { IService } from "../IService";
import { IAppointmentRepository } from "src/domain/repositories/IAppointmentRepository";

export class GetAppointmentsByDoctorIdService implements IService<string, Promise<Cita[]>>{
    constructor(private readonly appointmentRepository: IAppointmentRepository){}

    async Execute(parameter: string): Promise<Cita[]> {
        const appointmets: Cita[] = await this.appointmentRepository.GetAppointmentsByDoctorId(parameter);
        return appointmets;
    }
}