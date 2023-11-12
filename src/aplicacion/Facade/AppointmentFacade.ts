import { Cita } from "src/domain/citas/Cita";
import { IAppointmentRepository } from "src/domain/repositories/IAppointmentRepository";
import { IService } from "../Services/IService";
import { GetAppointmentByIdService } from "../Services/Appointment/GetAppointmentByIdService";
import { CreateAppointmentService } from "../Services/Appointment/CreateAppointmentService";
import { GetAppointmentsByDoctorIdService } from "../Services/Appointment/GetAppointmentsByDoctorIdService";
import { UpdateAppointmentService } from "../Services/Appointment/UpdateAppointmentService";
import { UpdateAppointmentWithId } from "../ParameterObject/UpdateAppointmentWithId";
import { DeleteAppointmentService } from "../Services/Appointment/DeleteAppointmentService";
import { GetAppointmentsByPatientIdService } from "../Services/Appointment/GetAppointmentsByPatientIdService";
import { DevOnlyTrueDeleteAppointmentService } from "../Services/Appointment/DevOnlyTrueDeleteAppointmentService";
import { Inject } from "@nestjs/common";

export class AppointmentFacade{
    constructor(@Inject('AppointmentRepository') private readonly appointmentRepository: IAppointmentRepository){}

    public async CreateAppointment(appointment: Cita): Promise<Cita | string>{
        const service: IService<Cita, Promise<Cita | string>> = new CreateAppointmentService(this.appointmentRepository);
        return await service.Execute(appointment);
    }

    public async GetAppointmentById(appointmentId: string): Promise<Cita | string>{
        const service: IService<string, Promise<Cita | string>> = new GetAppointmentByIdService(this.appointmentRepository);
        return await service.Execute(appointmentId);
    }

    public async GetAppointmentsByDoctorId(doctorId: string): Promise<Cita[]>{
        const service: IService<string, Promise<Cita[]>> = new GetAppointmentsByDoctorIdService(this.appointmentRepository);
        return await service.Execute(doctorId);
    }
    
    public async GetAppointmentByPatientId(patientId: string): Promise<Cita[]>{
        const service: IService<string, Promise<Cita[]>> = new GetAppointmentsByPatientIdService(this.appointmentRepository);
        return await service.Execute(patientId);
    }

    public async UpdateAppointment(id: string, appointment: Cita): Promise<Boolean>{
        const service: IService<UpdateAppointmentWithId, Promise<Boolean>> = new UpdateAppointmentService(this.appointmentRepository);
        const parameter: UpdateAppointmentWithId = new UpdateAppointmentWithId(id, appointment);
        return await service.Execute(parameter);
    }

    public async DeleteAppointment(appointmentId: string): Promise<Boolean>{
        const service: IService<string, Promise<Boolean>> = new DeleteAppointmentService(this.appointmentRepository);
        return await service.Execute(appointmentId);
    }

    // DEV - ONLY FOR TESTING
    public async DevDeleteAppointment(appointmentId: string): Promise<Boolean>{
        const service: IService<string, Promise<Boolean>> = new DevOnlyTrueDeleteAppointmentService(this.appointmentRepository);
        return await service.Execute(appointmentId);
    }
}