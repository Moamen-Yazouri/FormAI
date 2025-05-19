"use client"

import FormsTable from "@/components/forms-table/formsTable"
import { IFormTable } from "@/@types"

interface IProps {
    forms: IFormTable[];
    name: string;
}

const CreatorFormsTable = ({ forms, name }: IProps) => {
    return (
        <FormsTable forms={forms} role="creator" name={name} isSummary={true}/>
    )
}

export default CreatorFormsTable;
