import { IsOptional } from 'class-validator';

export class ModificarDoctorDto{
    @IsOptional()
    nombre?: string;

    @IsOptional()
    apellido?: string;

    @IsOptional()
    especialidad?: string;

    cedula: string;

    @IsOptional()
    telefono?: string;

    @IsOptional()
    genero?: string;

    @IsOptional()
    correo?: string;

    @IsOptional()
    id_usuario?: string | null;

    @IsOptional()
    id?: string;
}
