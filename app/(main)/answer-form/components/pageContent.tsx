import { handleAccess } from "@/lib/triggerCoventions";
import { getAccessRights } from "../service/accessRights.service";
import FormTemplate from "@/components/form-template/formTemplate";

interface IProps {
    id: string;
}

const PageContent = async({id}: IProps) => {
    const accessRight = await getAccessRights(id);
    handleAccess(accessRight);
    return (
        <FormTemplate id={id} isPreview={false}  isView={false}/>
    )
}

export default PageContent