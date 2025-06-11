"use client"

import FormsTable from "@/components/forms-table/formsTable";
import { IFormTable } from "@/@types";

interface IProps {
    forms: IFormTable[];
}

const CreatorFormsTable = ({ forms }: IProps) => {
    return (
        <FormsTable forms={forms} isSummary={true}/>
    )
}

export default CreatorFormsTable;
