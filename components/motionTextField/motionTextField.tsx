"use client"
import { useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useField } from "formik"
import { Button } from "../ui/button"
import { Eye, EyeOff } from "lucide-react"
import withMotion from "@/HOC/withMotion"
import clsx from "clsx"
import { IStyle } from "@/@types"
import { Checkbox } from "../ui/checkbox"
type CustomTextFieldProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "name"
>
& {
    name: string,
    label?: string,
    isPassword?: boolean,
    style?: IStyle
}

const CustomTextField : React.FC<CustomTextFieldProps> = ({
    name,
    label,
    isPassword,
    type,
    style,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [field, meta] = useField<string>(name);
    return (
        <div className="space-y-2">
            { label && (
                <Label
                htmlFor={name}
                className= {clsx(style?.label || "my-2")}
                >
                    {label}
                </Label>
            )
            }
            <div className="relative">
                {
                    type === "checkbox" ? (
                        <Checkbox
                            id={name}
                            checked={rest.checked}
                            {...field}
                            className={clsx(style?.input || "w-full", meta.error && "border-red-500")}
                        />
                        
                    ) : (
                        <Input
                            id={name}
                            {...field}
                            {...rest}
                            type={isPassword ? (showPassword ? "text" : "password") : type}
                            className= {clsx(style?.input || "w-full", meta.error && "border-red-500")}
                        />
                    )
                    
                }

                {
                    isPassword && (
                        <div>
                            <Button
                            type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                            {
                                showPassword ? (<EyeOff />) : (<Eye/>)
                            }   
                            </Button>
                        </div>
                    )
                }
            </div>
            {
                meta.touched && meta.error && (
                    <p className="text-sm text-red-500 mt-1">{meta.error}</p>
                )
            }
        </div>
    )
}
const MotionField = withMotion(CustomTextField);
export default MotionField;