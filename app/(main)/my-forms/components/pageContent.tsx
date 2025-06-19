import FormsTable from "@/components/forms-table/formsTable";
import { getCreatorForms } from "../service/fetchData.service";

interface IProps {
    name: string;
}

const PageContent = async ({name}: IProps) => {
    const forms = await getCreatorForms(name)
    return (
        <FormsTable forms={forms}/>
    )
}

export default PageContent