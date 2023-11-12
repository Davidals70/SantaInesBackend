import { IAppointmentRepository } from "src/domain/repositories/IAppointmentRepository";
import { IService } from "../IService";

export class DevOnlyTrueDeleteAppointmentService implements IService<string, Promise<Boolean>>{
    constructor(private readonly appointmentRepository: IAppointmentRepository){}

    async Execute(parameter: string): Promise<Boolean> {
        const deleted: Boolean = await this.appointmentRepository.DevOnlyTrueDeleteAppointment(parameter);
        return deleted;
    }
}