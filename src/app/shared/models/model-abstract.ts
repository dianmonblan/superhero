import { ModelInterface } from './interfaces';

export abstract class ModelAbstract<T> implements ModelInterface<T> {
    setData(data: T): void {
        if (data)
            Object.assign(this, data)
    }
}