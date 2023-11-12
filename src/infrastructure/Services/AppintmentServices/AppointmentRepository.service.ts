import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentEntity } from '../../db-entities/appointment.entity';
import { IAppointmentRepository } from '../../../domain/repositories/IAppointmentRepository';
import { Cita } from '../../../domain/citas/Cita';
import { CitaFactory } from 'src/domain/Factories/CitaFactory';

@Injectable()
export class AppointmentRepositoryService implements IAppointmentRepository {
  constructor(
    @InjectRepository(AppointmentEntity)
    private appointmentRepository: Repository<AppointmentEntity>,
  ) {}

  async CreateAppointment(cita: Cita): Promise<Cita | null> {
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

  async GetAppointmentById(appointmentId: string): Promise<Cita | null> {
    const appointment = await this.appointmentRepository.findOne({ where: {ID: appointmentId} });
    if (appointment) {
      return this.mapAppointmentEntityToCita(appointment);
    }
    return null;
  }

  async GetAppointmentsByDoctorId(doctorId: string): Promise<Cita[]> {
    try {
      const appointments = await this.appointmentRepository.find({
        where: { doctor_id: doctorId },
        order: {
          appointment_date: 'DESC', // Use 'DESC' for descending order
        },
      });  
      return appointments.map((appointment) => this.mapAppointmentEntityToCita(appointment));
    } catch (error) {
      console.error('Error in GetAppointmentsByDoctorId:', error);
      return [];
    }
  }
  
  async GetAppointmentsByPatientId(patientId: string): Promise<Cita[]> {
    try {
      const appointments = await this.appointmentRepository.find({
        where: { patient_id: patientId },
        order: {
          appointment_date: 'DESC', // Use 'DESC' for descending order
        },
      });  
      return appointments.map((appointment) => this.mapAppointmentEntityToCita(appointment));
    } catch (error) {
      console.error('Error in GetAppointmentsByPatientId:', error);
      return [];
    }
  }

  async GetAppointmentByDateAndDoctorId(appointmentDate: Date, doctorId: string): Promise<Cita | null> {
    try {
      const appointment = await this.appointmentRepository.findOne({
        where: { doctor_id: doctorId, appointment_date: appointmentDate }
      });  
      return (appointment) ? this.mapAppointmentEntityToCita(appointment) : null;
    } catch (error) {
      console.error('Error in GetAppointmentDateAndByDoctorId:', error);
      return null;
    }
  }

  async UpdateAppointment(id:string, cita: Cita): Promise<Boolean> {
    const existingAppointment = await this.GetAppointmentById(id);
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

  async DeleteAppointment(appointmentId: string): Promise<Boolean> {
    const existingAppointment = await this.GetAppointmentById(appointmentId);
    if (existingAppointment) {
      existingAppointment.setEstado('Deleted');
      this.UpdateAppointment(appointmentId, existingAppointment);
      // await this.appointmentRepository.remove(existingAppointment);
      return true;
    }
    return false;
  }
  
  async DevOnlyTrueDeleteAppointment(appointmentId: string): Promise<Boolean> {
    try {
      const appointment = await this.appointmentRepository.findOne({
        where: { ID: appointmentId },
      });

      if (!appointment) {
        return false;
      }

      await this.appointmentRepository.remove(appointment);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
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