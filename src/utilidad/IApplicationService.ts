import { Either } from "../utilidad/Either";

export interface IApplicationService<TService,T>{
    execute(service: TService): Promise<Either<Error,T>>;
}