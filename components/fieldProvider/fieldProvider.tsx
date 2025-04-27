import { IFormField } from '@/@types'
import React from 'react'
import MotionedTextArea from '../motionTextarea/MotionTextarea'
import MotionedSelect from '../motionedSelect/motionedSelect'
import MotionedRadio from '../morionedRadio/MotionedRadio'
import MotionField from '../motionTextField/motionTextField'
interface IProps {
    field: IFormField
}
const FieldProvider = (props: IProps) => {
    const options: IOptions[] = props.field.options?.map((option) => {
        return {
            value: option,
            label: option[0].toUpperCase() + option.slice(1),
        }
    }) || []
    switch(props.field.type) {
        case "textarea": {
            return (
                <MotionedTextArea
                    name= {props.field.label.toLowerCase()}
                    {...props.field}
                />
            )
        }
        case "select": {
            return (

                <MotionedSelect
                    name= {props.field.label.toLowerCase()}
                    {...props.field}    
                    options={options}
                />
            )
        }
        case "radio": {
            return (
                <MotionedRadio
                    name= {props.field.label.toLowerCase()}
                    {...props.field}
                    value={props.field.label.toLowerCase()}
                />
            )
        }
        default: {
            return (
                <MotionField
                    name= {props.field.label.toLowerCase()}
                    {...props.field}
                />
            )
        }
    }
}

export default FieldProvider