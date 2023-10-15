import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { AppointmentRepositoryService } from '../Services/AppintmentServices/AppointmentRepository.service';
import { AppointmentDto } from '../Dtos/Appointment.dto';
import { CreateAppointmentDto } from '../Dtos/CreateAppointment.dto';
import { Cita } from 'src/domain/citas/Cita';
import { CitaFactory } from 'src/domain/Factories/CitaFactory';
import { UpdateAppointmentDto } from '../Dtos/UpdateAppointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentRepositoryService) {}

  // @Get()
  // findAll(): Promise<AppointmentEntity[]> {
  //   return this.appointmentService.findAll();
  // }

  @Get('iddoctor/:id')
  async findMany(@Param('id') id: string): Promise<Object> {
    const existingAppointments: Cita[] = await this.appointmentService.GetCitasPorIdDoctor(id);
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
      error: 'Error while searching'
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Object> {
    const existingAppointment: Cita = await this.appointmentService.GetCitaPorId(id);
    if(existingAppointment){
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
      error: 'Appointment not found'
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

    const createdCita: Cita = await this.appointmentService.CrearCita(cita);

    if(createdCita){
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
      error: 'Error while creating appointment'
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() appointmentData: UpdateAppointmentDto): Promise<Object> {
    const appointmentFactory: CitaFactory = new CitaFactory();
    const cita: Cita = appointmentFactory.CrearCita(
      null,
      null,
      null,
      null,
      appointmentData.appointmentDate,
      appointmentData.description,
      appointmentData.status
    );

    const updated: Boolean = await this.appointmentService.ActualizarCita(id, cita);

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
    const deleted: Boolean = await this.appointmentService.EliminarCita(id);
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
