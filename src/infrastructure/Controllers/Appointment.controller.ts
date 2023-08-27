import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { AppointmentRepositoryService } from '../Services/CitaServices/AppointmentRepository.service';
import { AppointmentEntity } from '../db-entities/appointment.entity';

@Controller('appointment')
export class appointmentController {
  constructor(private readonly appointmentService: AppointmentRepositoryService) {}

  @Get()
  findAll(): Promise<AppointmentEntity[]> {
    return this.appointmentService.findAll();
  }

//   @Get(':id')
//   findOne(@Param('id') id: number): Promise<AppointmentEntity> {
//     return this.appointmentService.findOne(id);
//   }

  @Post()
  create(@Body() appointmentData: Partial<AppointmentEntity>): Promise<AppointmentEntity> {
    return this.appointmentService.create(appointmentData);
  }

//   @Put(':id')
//   update(@Param('id') id: number, @Body() appointmentData: Partial<AppointmentEntity>): Promise<AppointmentEntity> {
//     return this.appointmentService.update(id, appointmentData);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: number): Promise<void> {
//     return this.appointmentService.remove(id);
//   }
}
