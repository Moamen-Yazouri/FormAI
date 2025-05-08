export interface IAvailableForms {
    id: string
    title: string
    description: string
    deadline?: string
    creator: string
}

export interface IAnsweredForms {
    id: string
    title: string
    date: string
}