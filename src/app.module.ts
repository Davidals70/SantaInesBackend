import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from './infrastructure/Modules/appointment.module';
import { DoctorModule } from './infrastructure/Modules/doctor.module';
import { PatientModule } from './infrastructure/Modules/patient.module';
import { UserModule } from './infrastructure/Modules/user.module';
import { typeOrmConfig } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AppointmentModule,
    DoctorModule,
    PatientModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
