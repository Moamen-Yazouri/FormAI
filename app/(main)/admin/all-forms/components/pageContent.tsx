import { IFormTable } from "@/@types";
import fetchDataService from "../../dashboard/services/fetchData.service";
import FormsTable from "@/components/forms-table/formsTable";

const PageContent = async () => {
    const forms: IFormTable[] = await fetchDataService.formsData();
    return (
        <FormsTable forms={forms}/>
    )
}

export default PageContent