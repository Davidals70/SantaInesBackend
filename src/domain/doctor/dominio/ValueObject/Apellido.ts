import { Either } from "src/utilidad/Either";

export class Apellido {
    [x: string]: any;
    private cuerpo: string;

    private constructor(cuerpo: string) {
        this.cuerpo = cuerpo;
    }
    
    getApellido(): string{
        return this.cuerpo;
    }


    static create(cuerpo: string): Either<Error,Apellido> {
        return Either.makeRight<Error,Apellido>(new Apellido(cuerpo));
    }



}