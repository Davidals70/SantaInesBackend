import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { AppointmentDto } from '../Dtos/Appointment.dto';
import { CreateAppointmentDto } from '../Dtos/CreateAppointment.dto';
import { Cita } from 'src/domain/citas/Cita';
import { CitaFactory } from 'src/domain/Factories/CitaFactory';
import { UpdateAppointmentDto } from '../Dtos/UpdateAppointment.dto';
import { AppointmentFacade } from 'src/aplicacion/Facade/AppointmentFacade';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentFacade) {}

  // DEV ONLY
  @Delete('dev/:id')
  async deleteDev(@Param('id') id: string): Promise<Object> {
    const deleted: Boolean = await this.appointmentService.DevDeleteAppointment(id);
    if(deleted){
      return {
        message: "Succesful",
        value: true
      }
    }
    else{
      return {
        message: "Error while deleting",
        value: false
      }
    }
  }

  // @Get()
  // findAll(): Promise<AppointmentEntity[]> {
  //   return this.appointmentService.findAll();
  // }

  @Get('iddoctor/:id')
  async findByDoctor(@Param('id') id: string): Promise<Object> {
    const existingAppointments: Cita[] = await this.appointmentService.GetAppointmentsByDoctorId(id);
    if(existingAppointments){
      var appointments: AppointmentDto[] = [];
      for (const existingAppointment of existingAppointments) {
        const appointment: AppointmentDto = {
          id: existingAppointment.getIdCita(),
          doctorId: existingAppointment.getIdDoctor(),
          patientId: existingAppointment.getIdPaciente(),
          creationDate: existingAppointment.getFechaCreacion(),
          appointmentDate: existingAppointment.getFechaCita(),
          status: existingAppointment.getEstado(),
          description: existingAppointment.getDescripcion(),
        };  
        appointments.push(appointment);
      }
      return appointments;
    }
    return {
      message: 'Error while getting appointments by doctor'
    };
  }
  
  @Get('idpatient/:id')
  async findByPatient(@Param('id') id: string): Promise<Object> {
    const existingAppointments: Cita[] = await this.appointmentService.GetAppointmentByPatientId(id);
    if(existingAppointments){
      var appointments: AppointmentDto[] = [];
      for (const existingAppointment of existingAppointments) {
        const appointment: AppointmentDto = {
          id: existingAppointment.getIdCita(),
          doctorId: existingAppointment.getIdDoctor(),
          patientId: existingAppointment.getIdPaciente(),
          creationDate: existingAppointment.getFechaCreacion(),
          appointmentDate: existingAppointment.getFechaCita(),
          status: existingAppointment.getEstado(),
          description: existingAppointment.getDescripcion(),
        };  
        appointments.push(appointment);
      }
      return appointments;
    }
    return {
      message: 'Error while getting appointments by patient'
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Object> {
    const existingAppointment: Cita | string = await this.appointmentService.GetAppointmentById(id);
    if(existingAppointment instanceof Cita){
      const appointment: AppointmentDto = new AppointmentDto();
      appointment.id = existingAppointment.getIdCita();
      appointment.doctorId = existingAppointment.getIdDoctor();
      appointment.patientId = existingAppointment.getIdPaciente();
      appointment.creationDate = existingAppointment.getFechaCreacion();
      appointment.appointmentDate = existingAppointment.getFechaCita();
      appointment.status = existingAppointment.getEstado();
      appointment.description = existingAppointment.getDescripcion();
      return appointment;
    }
    return {
      message: existingAppointment
    };

  }

  @Post()
  async create(@Body() appointmentData: CreateAppointmentDto): Promise<Object> {
    const appointmentFactory: CitaFactory = new CitaFactory();
    const cita: Cita = appointmentFactory.CrearCita(
      null,
      appointmentData.doctorId,
      appointmentData.patientId,
      null,
      appointmentData.appointmentDate,
      appointmentData.description,
      appointmentData.status
    );

    const createdCita: Cita | string = await this.appointmentService.CreateAppointment(cita);

    if(createdCita instanceof Cita){
      const appointment: AppointmentDto = new AppointmentDto();
      appointment.id = createdCita.getIdCita();
      appointment.doctorId = createdCita.getIdDoctor();
      appointment.patientId = createdCita.getIdPaciente();
      appointment.creationDate = createdCita.getFechaCreacion();
      appointment.appointmentDate = createdCita.getFechaCita();
      appointment.status = createdCita.getEstado();
      appointment.description = createdCita.getDescripcion();
      return appointment;
    }
    return {
      message: createdCita
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() appointmentData: UpdateAppointmentDto): Promise<Object> {
    const appointmentFactory: CitaFactory = new CitaFactory();
    const cita: Cita = appointmentFactory.CrearCita(
      null,
      null,
      appointmentData.patientId,
      null,
      appointmentData.appointmentDate,
      appointmentData.description,
      appointmentData.status
    );

    const updated: Boolean = await this.appointmentService.UpdateAppointment(id, cita);

    if(updated){
      return {
        message: "Succesful",
        value: true
      }
    }
    else{
      return {
        message: "Error while updating",
        value: false
      }
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Object> {
    const deleted: Boolean = await this.appointmentService.DeleteAppointment(id);
    if(deleted){
      return {
        message: "Succesful",
        value: true
      }
    }
    else{
      return {
        message: "Error while deleting",
        value: false
      }
    }
  }
}
