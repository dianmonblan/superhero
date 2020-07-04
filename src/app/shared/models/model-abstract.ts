interface ModelInterface<T> {
    setData(data: T): void
}

export abstract class ModelAbstract<T> implements ModelInterface<T> {
    constructor(data: T) {
        if (data)
            this.setData(data)
    }

    abstract setData(data: T): void
}