import { Either } from "../utilidad/either";

export interface IApplicationList<TService, T> {
    execute(service: TService): Promise<Either<Error, T[]>>;
}
