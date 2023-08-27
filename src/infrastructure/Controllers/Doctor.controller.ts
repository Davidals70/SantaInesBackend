import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { DoctorRepositoryService } from '../Services/DoctorServices/DoctorRepository.service';
import { DoctorEntity } from '../db-entities/doctor.entity';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorRepositoryService) {}

  @Get()
  findAll(): Promise<DoctorEntity[]> {
    return this.doctorService.findAll();
  }

  @Get(':id_number')
  findOne(@Param('id_number') id_number: string): Promise<DoctorEntity> {
    return this.doctorService.findOneByidNumber(id_number);
  }

  @Post()
  create(@Body() doctorData: Partial<DoctorEntity>): Promise<DoctorEntity> {
    return this.doctorService.create(doctorData);
  }

  @Put(':id_number')
  update(@Param('id_number') id_number: string, @Body() doctorData: Partial<DoctorEntity>): Promise<DoctorEntity> {
    return this.doctorService.update(id_number, doctorData);
  }

  @Delete(':id_number')
  remove(@Param('id_number') id_number: string): Promise<void> {
    return this.doctorService.remove(id_number);
  }
}
