import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from '../db-entities/appointment.entity';
import { AppointmentRepositoryService } from '../Services/CitaServices/AppointmentRepository.service';
import { appointmentController } from '../Controllers/Appointment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity])],
  controllers: [appointmentController],
  providers: [AppointmentRepositoryService],
  exports: [AppointmentRepositoryService],
})
export class AppointmentModule {}
