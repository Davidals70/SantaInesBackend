import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentEntity } from '../../db-entities/appointment.entity';
import { ICitaRepository } from '../../../domain/repositories/ICitaRepository';
import { Cita } from '../../../domain/citas/Cita';
import { CitaFactory } from 'src/domain/Factories/CitaFactory';

@Injectable()
export class AppointmentRepositoryService implements ICitaRepository {
  constructor(
    @InjectRepository(AppointmentEntity)
    private appointmentRepository: Repository<AppointmentEntity>,
  ) {}

  async CrearCita(cita: Cita): Promise<Cita | null> {
    const appointment = new AppointmentEntity();
    appointment.patient_id = cita.getIdPaciente();
    appointment.doctor_id = cita.getIdDoctor();
    appointment.appointment_date = cita.getFechaCita();
    appointment.status = cita.getEstado();
    appointment.description = cita.getDescripcion();

    

    try {
      const createdAppointment = await this.appointmentRepository.save(appointment);
      return this.mapAppointmentEntityToCita(createdAppointment);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async GetCitaPorId(idCita: string): Promise<Cita | null> {
    const appointment = await this.appointmentRepository.findOne({ where: {ID: idCita} });
    if (appointment) {
      return this.mapAppointmentEntityToCita(appointment);
    }
    return null;
  }

  async GetCitasPorIdDoctor(idDoctor: string): Promise<Cita[]> {
    try {
      const appointments = await this.appointmentRepository.find({
        where: { doctor_id: idDoctor },
      });  
      return appointments.map((appointment) => this.mapAppointmentEntityToCita(appointment));
    } catch (error) {
      console.error('Error in GetCitasPorIdDoctor:', error);
      return [];
    }
  }y

  async ActualizarCita(id:string, cita: Cita): Promise<Boolean> {
    const existingAppointment = await this.GetCitaPorId(id);
    if (existingAppointment) {

      var appointment: Object = {};
      if(cita.getFechaCita())
        appointment = { ...appointment, appointment_date: cita.getFechaCita() };
      if(cita.getEstado())
        appointment = { ...appointment, status: cita.getEstado() };
      if(cita.getDescripcion())
        appointment = { ...appointment, description: cita.getDescripcion() };
        
      await this.appointmentRepository.update(id, appointment);
      return true;
    }
    return false;
  }

  async EliminarCita(idCita: string): Promise<Boolean> {
    const existingAppointment = await this.GetCitaPorId(idCita);
    if (existingAppointment) {
      existingAppointment.setEstado('Deleted');
      this.ActualizarCita(idCita, existingAppointment);
      // await this.appointmentRepository.remove(existingAppointment);
      return true;
    }
    return false;
  }

  private mapAppointmentEntityToCita(appointmentEntity: AppointmentEntity): Cita {
    const appointmentFactory = new CitaFactory();
    return appointmentFactory.CrearCita(
      appointmentEntity.ID,
      appointmentEntity.doctor_id,
      appointmentEntity.patient_id,
      appointmentEntity.creation_date,
      appointmentEntity.appointment_date,
      appointmentEntity.description,
      appointmentEntity.status
    );
  }
}