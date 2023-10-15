import { Optional } from "../../../utilidad/Optional";
import { v4 as uuidv4 } from 'uuid';

export class IdCita{
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

    static create(id?: string): IdCita{
        return new IdCita(new Optional<string>(id));
    }
}