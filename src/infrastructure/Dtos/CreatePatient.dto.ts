import { Type } from "class-transformer";
import { IsDate, IsString, Min, MinDate, MinLength } from "class-validator";


export class CreatePatientDto{

    @IsString()
    @MinLength(1)
    name: string;//nombre
  
    @IsString()
    @MinLength(1)
    lastname: string;//apellido
  
    @IsDate()
    @Type(() => Date)
    @MinDate(new Date('1850-05-05'))
    birthday: Date;//2021-05-05
  
    @IsString()
    @MinLength(1)
    id_number: string;//cedula//Unica

    @IsString()
    @MinLength(1)
    address: string;//direccion
  
    @IsString()
    @MinLength(1)
    phone_number: string;//numero_de_telefono
  
    @IsString()
    @MinLength(1)
    gender: string;//genero
  
    @IsString()
    @MinLength(1)
    email: string;///correo_electronico
}