import { Controller, Get, Param, Post, Body, Put, Delete , Res, HttpStatus} from '@nestjs/common';
import { BuscarCorreoDto } from 'src/aplicacion/doctor/DataTransferObject/BuscarCorreoDto';
import { BuscarDoctorNombreDto } from 'src/aplicacion/doctor/DataTransferObject/BuscarDoctorNombreDto';
import { BuscarEspecialidadDto } from 'src/aplicacion/doctor/DataTransferObject/BuscarEspecialidadDto';
import { ModificarDoctorDto } from 'src/aplicacion/doctor/DataTransferObject/ModificarDoctorDto';
import { RegistrarDoctorDto } from 'src/aplicacion/doctor/DataTransferObject/RegistrarDoctorDto';
import { BuscarDoctores } from 'src/aplicacion/doctor/BuscarDocotres';
import { BuscarDoctorPorCorreo } from 'src/aplicacion/doctor/BuscarDoctorPorCorreo';
import { BuscarDoctorPorEspecialidad } from 'src/aplicacion/doctor/BuscarDoctorPorEspecialidad';
import { BuscarDoctorPornombre } from 'src/aplicacion/doctor/BuscarDoctorPorNombre';
import { ModificarDoctor } from 'src/aplicacion/doctor/ModificarDoctor';
import { RegistrarDoctorService } from 'src/aplicacion/doctor/RegistrarDoctro';


@Controller('doctor')
export class DoctorController {
  constructor(private readonly buscarDoctoresService: BuscarDoctores,
              private readonly buscarPorCorreoService:BuscarDoctorPorCorreo,
              private readonly buscarPorEspecialidadService: BuscarDoctorPorEspecialidad,
              private readonly buscarPorNombreService:BuscarDoctorPornombre,
              private readonly modifcarDoctorService:ModificarDoctor,
              private readonly registrarDoctorService:RegistrarDoctorService,
    ) {}
    @Post('/create')
    async create(@Res() response, @Body() body: RegistrarDoctorDto){
        let result = await this.registrarDoctorService.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Get('/findAll')
    async findAll(@Res() response){
        let result = await this.buscarDoctoresService.execute('BuscarDoctores');
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }
    @Get('/findByName')
    async findByName(@Res() response, @Body() body: BuscarDoctorNombreDto){
        let result = await this.buscarPorNombreService.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Get('/findByEmail')
    async findByEmail(@Res() response, @Body() body: BuscarCorreoDto){
        let result = await this.buscarPorCorreoService.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    
    @Get('/findByspecialization')
    async findByspecialization(@Res() response, @Body() body: BuscarEspecialidadDto){
        let result = await this.buscarPorEspecialidadService.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }
    @Put('/modificate')
    async modificate(@Res() response, @Body() body: ModificarDoctorDto){
        let result = await this.modifcarDoctorService.execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }
  


 
}
