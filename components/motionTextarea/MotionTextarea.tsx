import { useField } from "formik";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { IStyle } from "@/@types";
import withMotion from "@/HOC/withMotion";
import clsx from "clsx";

type TProps = Omit<
            React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"
        > & {
            name: string;
            label?: string;
            placeholder?: string;
            className?: string;
            style?: IStyle
        };

const TextArea = (props: TProps) => {
    const { name, label, placeholder, className, style, ...rest } = props;
    const [field, meta] = useField<string>(name);
    return (
        <div className="space-y-2">
            { label && (
                <Label
                htmlFor={name}
                className={style?.label || "my-2"}
                >
                    {label}
                </Label>
            )
            }
            <div className="relative">
                <Textarea
                    id={name}
                    placeholder={placeholder || ""}
                    {...field}
                    {...rest}
                    className= {
                            clsx(
                                style?.input || "my-2 w-full", 
                                meta.error && "border-red-500"
                            )
                    }
                />
            </div>
            {
                meta.touched && meta.error && (
                    <p className="text-sm text-red-500 mt-1">{meta.error}</p>
                )
            }
        </div>
    )
} 
const MotionedTextArea = withMotion(TextArea);
export default MotionedTextArea;