import { IStyle } from "@/@types";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useField } from "formik";
import clsx from "clsx";
import withMotion from "@/HOC/withMotion";

type IProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "name"
> & {
    name: string;
    style?: IStyle;
    value: string;
};

const MotionRadio = (props: IProps) => {
    const [field, meta] = useField<string>(props.name);
    const id = `${props.name}-${props.value}`;

    return (
        <div className="space-y-2">
        <Label htmlFor={id} className="flex items-center gap-2 text-slate-200">
            <Input
            type="radio"
            id={id}
            name={field.name}
            value={props.value}
            checked={field.value === props.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            required={props.required || false}
            className={clsx(
                "h-4 w-4 bg-slate-950 border-slate-700 text-cyan-500 ring-offset-slate-950",
                "focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:border-cyan-500",
                "checked:bg-cyan-500 checked:border-cyan-500",
                props.style?.input
            )}
            />
            <span className={clsx("text-slate-200", props.style?.label)}>
            {props.value}
            </span>
        </Label>

        {meta.touched && meta.error && (
            <p className="text-sm text-red-500 mt-1">{meta.error}</p>
        )}
        </div>
    );
};

const MotionedRadio = withMotion(MotionRadio);
export default MotionedRadio;
