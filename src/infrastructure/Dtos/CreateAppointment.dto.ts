import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  public patientId: string;

  @IsString()
  @IsNotEmpty()
  public doctorId: string;

  @IsDate()
  @IsNotEmpty()
  public appointmentDate: Date;

  @IsString()
  @IsNotEmpty()
  public status: string;

  @IsString()
  @IsNotEmpty()
  public description: string;
}