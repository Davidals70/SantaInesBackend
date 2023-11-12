import { IService } from "./IService";

export abstract class Decorator<TParameter, TValue> implements IService<TParameter, TValue> {
    protected service: IService<TParameter, TValue>;
    
    constructor(service: IService<TParameter, TValue>){
        this.service = service;
    }

    abstract Execute(parameter: TParameter): TValue;
}