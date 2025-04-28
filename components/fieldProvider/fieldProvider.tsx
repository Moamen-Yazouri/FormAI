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
                    name={props.field.label.toLowerCase()}
                    label={props.field.label}
                    placeholder={props.field.placeholder || ""}
                    required={props.field.required}
                />
            )
        }
        case "select":
        case "dropdown": {
            return (
            <MotionedSelect
                name={props.field.label.toLowerCase()}
                label={props.field.label}
                required={props.field.required}
                options={options}
            />
            );
        }
        case "radio": {
            return (
                <MotionedRadio
                    value={props.field.label.toLowerCase()} 
                    name={props.field.label.toLowerCase()}
                    required={props.field.required}                
                />
            )
        }
        default: {
            return (
                <MotionField
                    isPassword={false} 
                    name={props.field.label.toLowerCase()}
                    label={props.field.label}
                    placeholder={props.field.placeholder || ""}
                    type= {props.field.type}
                    required={props.field.required}
                />
            )
        }
    }
}

export default FieldProvider