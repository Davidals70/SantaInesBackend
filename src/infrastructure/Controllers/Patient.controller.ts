import { Controller, Get, Param, Post, Body, Put, Delete, ParseUUIDPipe, Patch } from '@nestjs/common';
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

  @Get()//*****
  async findAll(): Promise<CreatePatientDto[]> {
    return this.patientService.findAll();
  }

  @Get(':id')//aaa!!!
  async findOne(@Param('id') id: string): Promise<Object> {
    const existingPatient: Paciente = await this.patientService.findOne(id);
    if(existingPatient){
      const patient: PatientEntity = new PatientEntity();
      patient.name = existingPatient.getNombre();
      patient.lastname = existingPatient.getApellido();
      patient.address = existingPatient.getDireccion();
      patient.birthday = existingPatient.getFechaNacimiento();
      patient.id_number = existingPatient.getCedula();
      patient.email = existingPatient.getCorreo();
      patient.phone_number = existingPatient.getTelefono();
      patient.gender = existingPatient.getGenero();
      return patient;
    }
    return {
      error: 'Patient not found'
    };
    // return this.patientService.findOne(id);
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

  @Patch(':id')//aaa!!!
  async update(
  @Param('id', ParseUUIDPipe) id: string, 
  @Body() patientData: UpdatePatientDto): Promise<Object> {//Quito el partial porque no es necesario
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
    
    return await this.patientService.update(id, patient);
    // return this.patientService.update(id, patientData);
  }


  @Delete(':id')//aaa!!!
  async remove(@Param('id') id: string): Promise<void> {
    await this.patientService.remove(id);

    // if(deleted){
    //   return {
    //     message: "Succesful",
    //     value: true
    //   }
    // }
    // else{
    //   return {
    //     message: "Error while deleting",
    //     value: false
    //   }
    // }

    // return this.patientService.remove(id);
  }
}
