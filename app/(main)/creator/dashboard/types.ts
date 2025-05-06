
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

export interface ICreatorFormData {
    id: string
    title: string
    createdAt: string
    responsesCount: number
}

export interface ICreatorResponses {
    id: string,
    formTitle: string,
    respondent: string,
    date: string,
}