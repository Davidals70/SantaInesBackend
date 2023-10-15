import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from '../db-entities/appointment.entity';
import { AppointmentRepositoryService } from '../Services/AppintmentServices/AppointmentRepository.service';
import { AppointmentController } from '../Controllers/Appointment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity])],
  controllers: [AppointmentController],
  providers: [AppointmentRepositoryService],
  exports: [AppointmentRepositoryService],
})
export class AppointmentModule {}
