import { Either } from "src/utilidad/Either";

export class FechaNacimiento{
    private fecha: Date;

    private constructor(fecha: Date){
        this.fecha = fecha;
    }

    getFechaNacimiento(){
        return this.fecha;
    }

    static create(fecha: Date): Either<Error,FechaNacimiento>{
        const fechaNacimiento = new FechaNacimiento(fecha);

        return Either.makeRight<Error,FechaNacimiento>(fechaNacimiento);
  
    }
}