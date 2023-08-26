import { Optional } from "src/utilidad/Optional";
import { v4 as uuidv4 } from 'uuid';

export class idCita{
    private UUID: string;

    private constructor(id: Optional<string>){
        if(id.hasvalue()){
            this.UUID = id.getValue();
        }
        else{
            this.UUID = uuidv4();
        }
    }

    getIDCita(){
        return this.UUID;
    }

    static create(id?: string): idCita{
        return new idCita(new Optional<string>(id));
    }
}