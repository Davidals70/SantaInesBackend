export interface IService<TParameter, TValue>{
    Execute(parameter: TParameter): TValue;
}