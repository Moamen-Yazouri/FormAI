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
                    name={props.field.fieldId.toLowerCase()}
                    label={props.field.label}
                    placeholder={props.field.placeholder || ""}
                    required={props.field.required}
                />
            )
        }
        case "checkbox": {
        return (
                <MotionField
                type="checkbox"
                name={props.field.fieldId.toLowerCase()}
                label={props.field.label}
                required={props.field.required}
                />
            )
        }
        case "select":
        case "dropdown": {
            return (
            <MotionedSelect
                name={props.field.fieldId.toLowerCase()}
                label={props.field.label}
                required={props.field.required}
                options={options}
            />
            );
        }
        case "radio": {
            return (
                <fieldset className="flex flex-col items-start justify-center gap-y-2">
                <legend className="text-slate-200 mb-2 text-base">
                    {props.field.label}:
                </legend>

                {options.map((option, index) => (
                    <MotionedRadio
                    key={index}
                    name={props.field.fieldId.toLowerCase()}
                    value={option.value}
                    required={props.field.required}
                    className="text-slate-200 focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:border-cyan-500" // apply here if custom input
                    />
                ))}
                </fieldset>

            )
        }
        default: {
            return (
                <MotionField
                    isPassword={false} 
                    name={props.field.fieldId.toLowerCase()}
                    label={props.field.label}
                    placeholder={props.field.placeholder || ""}
                    type= {props.field.type}
                    checked={false}
                />
            )
        }
    }
}

export default FieldProvider