import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorEntity } from '../../db-entities/doctor.entity';

@Injectable()
export class DoctorRepositoryService {
  constructor(
    @InjectRepository(DoctorEntity)
    private doctorRepository: Repository<DoctorEntity>,
  ) {}

  async findAll(): Promise<DoctorEntity[]> {
    return this.doctorRepository.find();
  }

  async findOneByidNumber(id_number: string): Promise<DoctorEntity> {
    return this.doctorRepository.findOne({ where: { id_number: id_number } });
  }

  async create(doctorData: Partial<DoctorEntity>): Promise<DoctorEntity> {
    const doctor = this.doctorRepository.create(doctorData);
    return this.doctorRepository.save(doctor);
  }

  async update(id_number: string, doctorData: Partial<DoctorEntity>): Promise<DoctorEntity> {
    await this.doctorRepository.update(id_number, doctorData);
    return this.findOneByidNumber(id_number);
  }

  async remove(id_number: string): Promise<void> {
    const doctor: DoctorEntity = await this.findOneByidNumber(id_number);
    await this.doctorRepository.delete(doctor.ID);
  }
}
