import { PartialType } from '@nestjs/mapped-types';//npm i @nestjs/mapped-types
import { CreatePatientDto } from './CreatePatient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {}