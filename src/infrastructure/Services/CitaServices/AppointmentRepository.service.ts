import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentEntity } from '../../db-entities/appointment.entity';

@Injectable()
export class AppointmentRepositoryService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private appointmentRepository: Repository<AppointmentEntity>,
  ) {}
  
  async findAll(): Promise<AppointmentEntity[]> {
    return this.appointmentRepository.find();
  }

  // async findOneByPatient(pacienteId: number): Promise<AppointmentEntity> {
  //   return this.appointmentRepository.findOne({ where: { patientID: patientId } });
  // }

  async create(appointmentData: Partial<AppointmentEntity>): Promise<AppointmentEntity> {
    const appointment = this.appointmentRepository.create(appointmentData);
    return this.appointmentRepository.save(appointment);
  }

  // async update(id: number, appointmentData: Partial<AppointmentEntity>): Promise<AppointmentEntity> {
  //   await this.appointmentRepository.update(id, appointmentData);
  //   return this.findOne(id);
  // }

  // async remove(id: number): Promise<void> {
  //   await this.appointmentRepository.delete(id);
  // }
}
