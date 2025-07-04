"use client"

import withMotion from "@/HOC/withMotion";
import { Label } from "@radix-ui/react-label";
import { useField } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { IOptions } from "@/@types";
import { useEffect } from "react";


type ISelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "name"
> & {
  name: string
  label?: string
  options: IOptions[]
  defaultValue?: string
}

const CustomSelectField: React.FC<ISelectProps> = ({
  name,
  label,
  options,
  disabled,
  defaultValue
}) => {
  const [field, meta, helpers] = useField<string>(name);

  useEffect(() => {
    if (!field.value && options.length > 0) {
      helpers.setValue(defaultValue || options[0].value)
    }
  }, [field.value, options, helpers, defaultValue]);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label
          htmlFor={name}
          className="text-sm font-medium bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent"
        >
          {label}
        </Label>
      )}

      <Select
        name={field.name}
        value={field.value}
        onValueChange={(val) => helpers.setValue(val)}
        disabled={disabled || false} 
      >
        <SelectTrigger className="bg-slate-900/50 w-fit border border-cyan-600/30 text-slate-200 placeholder:text-cyan-300 hover:border-cyan-500 focus:border-cyan-500 focus:ring-cyan-500/30 transition-all duration-200">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent className="bg-slate-900/90 border border-cyan-600/20 text-blue-200 shadow-xl backdrop-blur-md">
          {options.map((option, index) => (
            <SelectItem
              key={index}
              value={option.value}
              className="cursor-pointer hover:bg-cyan-600/20 text-slate-200 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-700 data-[state=checked]:to-cyan-500"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {meta.touched && meta.error && (
        <div className="text-sm text-red-400 mt-1 bg-red-900/20 border border-red-700/30 rounded-md px-2 py-1">
          {meta.error}
        </div>
      )}
    </div>
  )
}

const MotionedSelect = withMotion(CustomSelectField)
export default MotionedSelect
