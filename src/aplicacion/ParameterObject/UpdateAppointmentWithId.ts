import { Cita } from "src/domain/citas/Cita";

export class UpdateAppointmentWithId{
    constructor(
        private readonly appointmentId: string,
        private readonly appointment: Cita,
    ){}

    getAppointmentId(): string{
        return this.appointmentId;
    }

    getAppointment(): Cita{
        return this.appointment;
    }
}