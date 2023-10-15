export class AppointmentDto {
  public id: string;
  public patientId: string;
  public doctorId: string;
  public appointmentDate: Date;
  public creationDate: Date;
  public status: string;
  public description: string;
}
