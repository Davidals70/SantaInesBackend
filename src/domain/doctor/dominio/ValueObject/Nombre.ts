import { Either } from "../../../../utilidad/Either";

export class Nombre {
    [x: string]: any;
    private cuerpo: string;

    private constructor(cuerpo: string) {
        this.cuerpo = cuerpo;
    }
    
    getNombre(): string{
        return this.cuerpo;
    }


    static create(cuerpo: string): Either<Error,Nombre> {
        return Either.makeRight<Error,Nombre>(new Nombre(cuerpo));
    }



}