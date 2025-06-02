import FormTemplate from '@/components/form-template/formTemplate';
import { handleAccess } from '@/lib/triggerCoventions';
import React from 'react'
import { getAccessRights } from '../service/accessRight.service';
interface IProps {
    params: Promise<{id: string}>
}
const page = async(props: IProps) => {
    const id = (await props.params).id;
    const access = await getAccessRights(id);
    handleAccess(access);
    return (
        <FormTemplate isPreview={false} id={id} isView={true}/>
    )
}

export default page