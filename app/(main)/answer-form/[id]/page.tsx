
import FormTemplate from "@/components/form-template/formTemplate";
import { notFound, redirect, unauthorized } from "next/navigation";
import { getAccessRights } from "../service/accessRights.service";

interface IProps {
  params: Promise<{id: string}>
}

const AnswerFormPage = async (props: IProps) => {
  const id = (await props.params).id;
  const accessRight = await getAccessRights(id);

  if(accessRight === "unauthorized") {
    return unauthorized();
  }

  if(accessRight === "notFound") {
    return notFound();
  }

  return (
    <FormTemplate id={id} isPreview={false}  isView={false}/>
    
  );
};

export default AnswerFormPage;