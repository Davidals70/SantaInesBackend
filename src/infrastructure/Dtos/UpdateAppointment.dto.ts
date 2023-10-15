import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class UpdateAppointmentDto {
  @IsDate()
  public appointmentDate: Date;

  @IsString()
  public status: string;

  @IsString()
  public description: string;
}
