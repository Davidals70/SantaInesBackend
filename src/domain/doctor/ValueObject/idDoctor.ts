import { Optional } from "../../../utilidad/Optional";
import { v4 as uuidv4 } from 'uuid';

export class idDoctor{
    private UUID: string;

    private constructor(id: Optional<string>){
        if(id.hasvalue()){
            this.UUID = id.getValue();
        }
        else{
            this.UUID = uuidv4();
        }
    }

    getIDDoctor(){
        return this.UUID;
    }

    static create(id: string): idDoctor{
        return new idDoctor(new Optional<string>(id));
    }
}