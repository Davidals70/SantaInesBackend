import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from '../db-entities/patient.entity';
import { PatientRepositoryService } from '../Services/PatientServices/PatientRepository.service';
import { PatientController } from '../Controllers/Patient.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ PatientEntity ])],
  controllers: [PatientController],
  providers: [PatientRepositoryService],
  exports: [PatientRepositoryService],
})
export class PatientModule {}
