import { Either } from "./either";
export interface Iaplication3<T1, T2, T3> {
    execute(arg1: T1, arg2: T2): Promise<Either<Error, T3>>;
}
