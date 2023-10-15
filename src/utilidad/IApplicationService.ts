import { Either } from "../utilidad/either";

export interface IApplicationService<TService,T>{
    execute(service: TService): Promise<Either<Error,T>>;
}