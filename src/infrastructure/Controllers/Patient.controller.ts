import { Controller, Get, Param, Post, Body, Put, Delete, ParseUUIDPipe } from '@nestjs/common';
import { PatientRepositoryService } from '../Services/PatientServices/PatientRepository.service';
import { PatientEntity } from '../db-entities/patient.entity';
import { CreatePatientDto } from '../Dtos/CreatePatient.dto';
import { UpdatePatientDto } from '../Dtos/UpdatePatient.dto';
import { idDoctor } from 'src/domain/doctor/ValueObject/idDoctor';
import { PatientFactory } from 'src/domain/Factories/PatientFactory';
import { Paciente } from 'src/domain/paciente/dominio/Paciente';
import { isUUID } from 'class-validator';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientRepositoryService,
    ) {}

  @Get()//aaa!!!
  findAll(): Promise<CreatePatientDto[]> {
    return this.patientService.findAll();
  }

  @Get(':id')//aaa!!!
  findOne(@Param('id') id: string): Promise<CreatePatientDto> {
    return this.patientService.findOne(id);
  }

  @Post()//*****
  async create(@Body() patientData: CreatePatientDto): Promise<Object> {//Quito el partial porque queremos que sea obligatorio todo
    const patientFactory: PatientFactory = new PatientFactory();
    const patient: Paciente = patientFactory.CreatePatient(
      null,
      patientData.name,
      patientData.lastname,
      patientData.birthday,
      patientData.id_number,
      patientData.address,
      patientData.phone_number,
      patientData.gender,
      patientData.email,
    );

    const createdPatient: Paciente = await this.patientService.create(patient);
    if(createdPatient){
      const patient: PatientEntity = new PatientEntity();
      patient.name = createdPatient.getNombre();
      patient.lastname = createdPatient.getApellido();
      patient.address = createdPatient.getDireccion();
      patient.birthday = createdPatient.getFechaNacimiento();
      patient.id_number = createdPatient.getCedula();
      patient.phone_number = createdPatient.getTelefono();
      patient.gender = createdPatient.getGenero();
      patient.email = createdPatient.getDireccion();
      patient.ID  = String(createdPatient.getId());
      return patient;
    }


      return {
        error:'Error mientras se crea el paciente'
      };
    // return this.patientService.create(patientData);
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
