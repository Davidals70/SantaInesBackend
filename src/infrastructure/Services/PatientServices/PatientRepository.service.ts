import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientEntity } from '../../db-entities/patient.entity';
import { CreatePatientDto } from 'src/infrastructure/Dtos/CreatePatient.dto';
import { isUUID } from 'class-validator';
import { UpdatePatientDto } from 'src/infrastructure/Dtos/UpdatePatient.dto';
import { Paciente } from 'src/domain/paciente/dominio/Paciente';
import { PatientFactory } from 'src/domain/Factories/PatientFactory';

@Injectable()
export class PatientRepositoryService {

  private readonly logger = new Logger('ProductsService');
  
  constructor(
    @InjectRepository(PatientEntity)
    private pacienteRepository: Repository<PatientEntity>,
  ) {}

  async findAll(): Promise<PatientEntity[] | null> {//*****
    return this.pacienteRepository.find();
  }

  async findOne(id: string): Promise<Paciente | null> {//aaa!!!
    let patient:PatientEntity;
    if( isUUID(id)){
    patient = await this.pacienteRepository.findOne({ where: {ID: id} });
    }else{
     const queryBuilder = this.pacienteRepository.createQueryBuilder();
     patient = await queryBuilder.where("id_number = :id_number", { id_number: id }).getOne();
    }

    if (patient) {
      return this.mapPatientEntityToPaciente(patient);
    }else{
      throw new NotFoundException(`Patient with ${id} not found `)
    }
  }

  async create(pacienteData: Paciente): Promise<Paciente | null> {///***** Quito el Partial
    try{
      const pacienteDominio = new PatientEntity();
      pacienteDominio.name = pacienteData.getNombre(); 
      pacienteDominio.address = pacienteData.getDireccion(), 
      pacienteDominio.birthday = pacienteData.getFechaNacimiento(), 
      pacienteDominio.email = pacienteData.getCorreo(), 
      pacienteDominio.gender = pacienteData.getGenero(), 
      pacienteDominio.id_number = pacienteData.getCedula(),
      pacienteDominio.lastname = pacienteData.getApellido(), 
      pacienteDominio.phone_number = pacienteData.getTelefono();

        
      const createdPatient = await this.pacienteRepository.save(pacienteDominio);
      return this.mapPatientEntityToPaciente(createdPatient);
    } catch(error){
      console.log(error);
      this.handleDBExceptions(error);
      return null;
    }
  }

  async update(id: string, pacienteData: Paciente): Promise<Paciente | null> {//El Partial no es necesario porque estoy usando el DTO de update
    
    // const patient = await this.pacienteRepository.preload({
    //   ID: id,
    //   ...pacienteData
    // });
    try{
    const existingPatient = await this.findOne(id);
    if(existingPatient){
      if(pacienteData.getNombre())
        existingPatient.setNombre(pacienteData.getNombre());
      if(pacienteData.getApellido())
        existingPatient.setApellido(pacienteData.getApellido());
      if(pacienteData.getDireccion())
        existingPatient.setDireccion(pacienteData.getDireccion());
      if(pacienteData.getFechaNacimiento())
        existingPatient.setFechaNacimiento(pacienteData.getFechaNacimiento());
      if(pacienteData.getCedula())
        existingPatient.setCedula(pacienteData.getCedula());
      if(pacienteData.getCorreo())
        existingPatient.setCorreo(pacienteData.getCorreo());
      if(pacienteData.getGenero())
        existingPatient.setGenero(pacienteData.getGenero());
      if(pacienteData.getTelefono())
        existingPatient.setTelefono(pacienteData.getTelefono());

        const pacienteDominio = new PatientEntity();
        pacienteDominio.name = existingPatient.getNombre(); 
        pacienteDominio.address = existingPatient.getDireccion(), 
        pacienteDominio.birthday = existingPatient.getFechaNacimiento(), 
        pacienteDominio.email = existingPatient.getCorreo(), 
        pacienteDominio.gender = existingPatient.getGenero(), 
        pacienteDominio.id_number = existingPatient.getCedula(),
        pacienteDominio.lastname = existingPatient.getApellido(), 
        pacienteDominio.phone_number = existingPatient.getTelefono();

        await this.pacienteRepository.update(id,pacienteDominio);
        return this.mapPatientEntityToPaciente(pacienteDominio);
    }
    }catch(error){
      this.handleDBExceptions(error);
    }
    
    // await this.pacienteRepository.update(id_number, pacienteData);
    // return this.findOneByIdNumber(id_number);
  }



  async remove(id: string): Promise<void> {
    let patient;
    if( isUUID(id)){
      patient = await this.pacienteRepository.findOne({ where: {ID: id} });
    }else{
      const queryBuilder = this.pacienteRepository.createQueryBuilder();
      patient = await queryBuilder.where("id_number = :id_number", { id_number: id }).getOne();
    }
    await this.pacienteRepository.delete(patient);
  }



  private handleDBExceptions(error: any){
    if( error.code === '23505')
      throw new BadRequestException(error.detail)
    this.logger.error(error);
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }


  private mapPatientEntityToPaciente(patientEntity: PatientEntity): Paciente {
    const pacienteFactory = new PatientFactory();
    return pacienteFactory.CreatePatient(
      patientEntity.ID,
      patientEntity.name,
      patientEntity.lastname,
      patientEntity.birthday,
      patientEntity.id_number,
      patientEntity.address,
      patientEntity.phone_number,
      patientEntity.gender,
      patientEntity.email
    );
  }


}
