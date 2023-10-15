import { Either } from "../../../utilidad/either";

export class FechaCreacion{
    private fecha: Date;

    private constructor(fecha: Date){
        this.fecha = fecha;
    }

    getFechaCreacion(){
        return this.fecha;
    }

    static create(fecha: Date): Either<Error,FechaCreacion>{
        const fechaCreacion = new FechaCreacion(fecha);

        return Either.makeRight<Error,FechaCreacion>(fechaCreacion);
  
    }
}