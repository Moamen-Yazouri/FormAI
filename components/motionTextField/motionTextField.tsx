"use client"
import { useState } from "react"
import type React from "react"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useField } from "formik"
import { Button } from "../ui/button"
import { Eye, EyeOff } from "lucide-react"
import withMotion from "@/HOC/withMotion"
import clsx from "clsx"
import type { IStyle } from "@/@types"
import { Checkbox } from "../ui/checkbox"

type CustomTextFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> & {
  name: string
  label?: string
  isPassword?: boolean
  style?: IStyle
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  name,
  label,
  isPassword,
  type,
  style,
  ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [field, meta, helpers] = useField(name)

    return (
        <div className="space-y-2">
        {label && type !== "checkbox" && (
            <Label
            htmlFor={name}
            className={clsx(
                style?.label ??
                "text-sm font-semibold text-blue-300 tracking-wide",
            )}
            >
            {label}
            </Label>
        )}
        <div className="relative">
            {type === "checkbox" ? (
            <div className="flex items-center gap-3">
                <Checkbox
                id={name}
                checked={!!field.value}
                onCheckedChange={(val: boolean) => helpers.setValue(val)}
                className={clsx(
                    "border-cyan-500/40 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-indigo-600 data-[state=checked]:to-cyan-500 data-[state=checked]:border-cyan-400 transition-all duration-200",
                    style?.input,
                    meta.error && "border-red-500",
                )}
                />
                <Label
                htmlFor={name}
                className={clsx(
                    style?.label ??
                    "!text-slate-300 hover:text-cyan-300 transition-colors duration-200 cursor-pointer",
                )}
                >
                {label}
                </Label>
            </div>
            ) : (
            <Input
                id={name}
                {...field}
                {...rest}
                type={isPassword ? (showPassword ? "text" : "password") : type}
                className={clsx(
                style?.input ??
                    "w-full bg-slate-900/60 border-cyan-600/30 text-slate-200 placeholder:text-blue-300 focus:border-cyan-400 focus:ring-cyan-300/40 hover:border-cyan-500 transition-all duration-200",
                meta.touched && meta.error &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500/50",
                )}
            />
            )}

            {isPassword && (
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-blue-900/30 text-slate-400 hover:text-cyan-300 transition-all"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            )}
        </div>

        {meta.touched && meta.error && (
            <p className="text-sm text-red-400 mt-1 bg-red-900/10 border border-red-600/30 rounded-md px-2 py-1">
            {meta.error}
            </p>
        )}
        </div>
  )
}

const MotionField = withMotion(CustomTextField)
export default MotionField
