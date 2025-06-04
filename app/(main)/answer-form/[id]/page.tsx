import FormTemplate from "@/components/form-template/formTemplate";
import { getAccessRights } from "../service/accessRights.service";
import { handleAccess } from "@/lib/triggerCoventions";

interface IProps {
  params: Promise<{id: string}>
}

const AnswerFormPage = async (props: IProps) => {
  const id = (await props.params).id;
  const accessRight = await getAccessRights(id);
  handleAccess(accessRight);
  
  return (
    <FormTemplate id={id} isPreview={false}  isView={false}/>
    
  );
};

export default AnswerFormPage;