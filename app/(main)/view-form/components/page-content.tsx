import { handleAccess } from "@/lib/triggerCoventions";
import { getAccessRights } from "../service/accessRight.service";
import FormTemplate from "@/components/form-template/formTemplate";

interface IProps {
    id: string;
}

const PageContent = async({ id }: IProps) => {
    const access = await getAccessRights(id);
    handleAccess(access);
    return (
        <FormTemplate isPreview={false} id={id} isView={true}/>
    )
}

export default PageContent