import { Either } from "src/utilidad/Either";

export interface IApplicationService<TService,T>{
    execute(service: TService): Promise<Either<Error,T>>;
}