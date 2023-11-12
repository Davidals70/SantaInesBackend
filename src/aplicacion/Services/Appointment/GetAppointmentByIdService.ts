import { Cita } from "src/domain/citas/Cita";
import { IService } from "../IService";
import { IAppointmentRepository } from "src/domain/repositories/IAppointmentRepository";

export class GetAppointmentByIdService implements IService<string, Promise<string | Cita>>{
    constructor(private readonly appointmentRepository: IAppointmentRepository){}

    async Execute(parameter: string): Promise<string | Cita> {
        const appointmet: null | Cita = await this.appointmentRepository.GetAppointmentById(parameter);
        if(!appointmet) return 'No appointment found';
        return appointmet;
    }
}