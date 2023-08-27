import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from '../db-entities/doctor.entity';
import { DoctorRepositoryService } from '../Services/DoctorServices/DoctorRepository.service';
import { DoctorController } from '../Controllers/Doctor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  controllers: [DoctorController],
  providers: [DoctorRepositoryService],
  exports: [DoctorRepositoryService],
})
export class DoctorModule {}
