import React from 'react'
interface IProps {
    params: Promise<{name: string}>
}
const MyForms = async(props: IProps) => {
    const name = (await props.params).name;
     
    return (
        <div></div>
    )
}

export default MyForms;