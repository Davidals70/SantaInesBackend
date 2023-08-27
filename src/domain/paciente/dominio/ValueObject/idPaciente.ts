import { Optional } from "../../../../utilidad/Optional";
import { v4 as uuidv4 } from 'uuid';

export class idPaciente{
    private UUID: string;

    private constructor(id: Optional<string>){
        if(id.hasvalue()){
            this.UUID = id.getValue();
        }
        else{
            this.UUID = uuidv4();
        }
    }

    getIDPaciente(){
        return this.UUID;
    }

    static create(id?: string): idPaciente{
        return new idPaciente(new Optional<string>(id));
    }
}