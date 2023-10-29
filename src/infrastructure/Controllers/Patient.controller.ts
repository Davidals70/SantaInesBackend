import { Controller, Get, Param, Post, Body, Put, Delete, ParseUUIDPipe } from '@nestjs/common';
import { PatientRepositoryService } from '../Services/PatientServices/PatientRepository.service';
import { PatientEntity } from '../db-entities/patient.entity';
import { CreatePatientDto } from '../Dtos/CreatePatient.dto';
import { UpdatePatientDto } from '../Dtos/UpdatePatient.dto';
import { idDoctor } from 'src/domain/doctor/ValueObject/idDoctor';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientRepositoryService) {}

  @Get()//aaa!!!
  findAll(): Promise<CreatePatientDto[]> {
    return this.patientService.findAll();
  }

  @Get(':id')//aaa!!!
  findOne(@Param('id') id: string): Promise<CreatePatientDto> {
    return this.patientService.findOne(id);
  }

  @Post()//aaa!!!
  create(@Body() patientData: CreatePatientDto): Promise<CreatePatientDto> {//Quito el partial porque queremos que sea obligatorio todo
    return this.patientService.create(patientData);
  }

  @Put(':id')//aaa!!!
  update(
  @Param('id', ParseUUIDPipe) id: string, 
  @Body() patientData: UpdatePatientDto): Promise<UpdatePatientDto> {//Quito el partial porque no es necesario
    return this.patientService.update(id, patientData);
  }

  @Delete(':id')//aaa!!!
  remove(@Param('id') id: string): Promise<void> {
    return this.patientService.remove(id);
  }
}
