import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientEntity } from '../../db-entities/patient.entity';

@Injectable()
export class PatientRepositoryService {
  constructor(
    @InjectRepository(PatientEntity)
    private pacienteRepository: Repository<PatientEntity>,
  ) {}

  async findAll(): Promise<PatientEntity[]> {
    return this.pacienteRepository.find();
  }

  async findOneByIdNumber(id_number: string): Promise<PatientEntity> {
    return this.pacienteRepository.findOne({ where: { id_number: id_number } });
  }

  async create(pacienteData: Partial<PatientEntity>): Promise<PatientEntity> {
    const paciente = this.pacienteRepository.create(pacienteData);
    return this.pacienteRepository.save(paciente);
  }

  async update(id_number: string, pacienteData: Partial<PatientEntity>): Promise<PatientEntity> {
    await this.pacienteRepository.update(id_number, pacienteData);
    return this.findOneByIdNumber(id_number);
  }

  async remove(id_number: string): Promise<void> {
    const paciente: PatientEntity = await this.findOneByIdNumber(id_number);
    await this.pacienteRepository.delete(paciente.ID);
  }
}
