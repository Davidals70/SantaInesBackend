import { IAppointmentRepository } from "src/domain/repositories/IAppointmentRepository";
import { IService } from "../IService";
import { UpdateAppointmentWithId } from "src/aplicacion/ParameterObject/UpdateAppointmentWithId";

export class UpdateAppointmentService implements IService<UpdateAppointmentWithId, Promise<Boolean>>{
    constructor(private readonly appointmentRepository: IAppointmentRepository){}

    async Execute(parameter: UpdateAppointmentWithId): Promise<Boolean> {
        const updatedAppointment: Boolean = await this.appointmentRepository.UpdateAppointment(parameter.getAppointmentId(), parameter.getAppointment());
        return updatedAppointment;
    }
}