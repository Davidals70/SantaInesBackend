import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PatientRepositoryService } from '../Services/PatientServices/PatientRepository.service';
import { PatientEntity } from '../db-entities/patient.entity';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientRepositoryService) {}

  @Get()
  findAll(): Promise<PatientEntity[]> {
    return this.patientService.findAll();
  }

  @Get(':id_number')
  findOneByIdNumber(@Param('id_number') id_number: string): Promise<PatientEntity> {
    return this.patientService.findOneByIdNumber(id_number);
  }

  @Post()
  create(@Body() patientData: Partial<PatientEntity>): Promise<PatientEntity> {
    return this.patientService.create(patientData);
  }

  @Put(':id_number')
  update(@Param('id_number') id_number: string, @Body() patientData: Partial<PatientEntity>): Promise<PatientEntity> {
    return this.patientService.update(id_number, patientData);
  }

  @Delete(':id_number')
  remove(@Param('id_number') id_number: string): Promise<void> {
    return this.patientService.remove(id_number);
  }
}
