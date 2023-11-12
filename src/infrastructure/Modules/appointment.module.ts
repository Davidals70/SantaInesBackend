import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from '../db-entities/appointment.entity';
import { AppointmentRepositoryService } from '../Services/AppintmentServices/AppointmentRepository.service';
import { AppointmentController } from '../Controllers/Appointment.controller';
import { AppointmentFacade } from 'src/aplicacion/Facade/AppointmentFacade';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity])],
  controllers: [AppointmentController],
  providers: [
    {provide:'AppointmentRepository', useClass: AppointmentRepositoryService},
    AppointmentFacade
  ],
  exports: [AppointmentFacade],
})
export class AppointmentModule {}
