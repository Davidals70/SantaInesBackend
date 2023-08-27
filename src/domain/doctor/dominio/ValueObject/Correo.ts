import { Either } from "src/utilidad/Either";

export class Correo{
    private correo: string;

    private constructor(correo: string){
        this.correo = correo;
    }

    getCorreo(){
        return this.correo;
    }

    private isValid(): boolean{
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(this.correo) && this.correo.length>0;
    }

    static create(correo:string): Either<Error,Correo>{
        const correoPaciente = new Correo(correo);
        if(correoPaciente.isValid()){
            return Either.makeRight<Error,Correo>(correoPaciente);
        }
        else{
            return Either.makeLeft<Error,Correo>(new Error('El correo del paciente no es valido'));
        }
    }
}