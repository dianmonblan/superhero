export interface ModelInterface<T> {
    setData(data: T): void
}

export interface MenuOption {
    name: string
    link: string
}

export interface PositioningSEO {
    titleSEO: string
    descriptionSEO: string
    keywordsSEO: string
}