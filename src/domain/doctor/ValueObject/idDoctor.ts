
import { v4 as uuidv4 } from 'uuid';

export class idDoctor {
    private UUID: string;

    private constructor(id?: string) {
        this.UUID = id || uuidv4();
    }

    getIDDoctor() {
        return this.UUID;
    }

    static create(id?: string): idDoctor {
        return new idDoctor(id);
    }
}