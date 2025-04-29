import FormTemplate from "@/components/form-template/formTemplate";

interface IProps {
  params: Promise<{id: string}>
}

const AnswerFormPage = async (props: IProps) => {
  const id = (await props.params).id;

  return (
    <FormTemplate id={id} isPreview={false}  isView={false}/>
  );
};

export default AnswerFormPage;