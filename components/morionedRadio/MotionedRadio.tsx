import { IStyle } from '@/@types'
import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useField } from 'formik'
import clsx from 'clsx'
import withMotion from '@/HOC/withMotion'
type IProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "name"
>
& {
    name: string,
    style?: IStyle,
    value: string,
}
const MotionRadio = (props: IProps) => {
    const [field, meta] = useField<string>(props.name);
    const id = `${props.name}-${props.value}`;
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className='flex items-center gap-2'>
                <Input
                    type="radio"
                    id={id}
                    name={field.name}  
                    value={props.value} 
                    checked={field.value === props.value} 
                    onChange={field.onChange} 
                    onBlur={field.onBlur}
                    required={props.required || false}
                    className={clsx(props.style?.input || "h-4 w-4 text-purple-500 focus:ring-purple-500")}
                />
                <span className={clsx(props.style?.label || "ml-2")}>{props.value}</span>
            </Label>
            {
                meta.touched && meta.error && (
                    <p className="text-sm text-red-500 mt-1">{meta.error}</p>
                )
            }
        </div>
    )
}
const MotionedRadio = withMotion(MotionRadio);
export default MotionedRadio;