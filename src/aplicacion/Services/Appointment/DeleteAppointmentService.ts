import { IAppointmentRepository } from "src/domain/repositories/IAppointmentRepository";
import { IService } from "../IService";

export class DeleteAppointmentService implements IService<string, Promise<Boolean>>{
    constructor(private readonly appointmentRepository: IAppointmentRepository){}

    async Execute(parameter: string): Promise<Boolean> {
        const deletedAppointment: Boolean = await this.appointmentRepository.DeleteAppointment(parameter);
        return deletedAppointment;
    }
}