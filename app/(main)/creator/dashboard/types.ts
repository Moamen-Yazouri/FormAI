
export interface IFormCreationData {
    date: string
    count: number
}

export interface IFormResponseData {
    formId: string
    formTitle: string
    responsesCount: number
}

export interface ICreatorActivityData {
    date: string
    formsCreated: number
    responsesReceived: number
}