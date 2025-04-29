import FormTemplate from '@/components/form-template/formTemplate';
import React from 'react'
interface IProps {
    params: Promise<{id: string}>
}
const page = async(props: IProps) => {
    const id = (await props.params).id;
    return (
        <FormTemplate isPreview={false} id={id} isView={true}/>
    )
}

export default page