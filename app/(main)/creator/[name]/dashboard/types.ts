import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

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
    respondentName: string,
    respondentEmail: string,
    date: string,
}

export interface IStateCard {
    stateTitle: string;
    stateValue: number;
    statePercentage: number;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> 
            & RefAttributes<SVGSVGElement>>
}

