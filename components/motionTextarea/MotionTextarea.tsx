import { useField } from "formik";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { IStyle } from "@/@types";
import withMotion from "@/HOC/withMotion";
import clsx from "clsx";

type TProps = Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "name"
> & {
    name: string;
    label?: string;
    placeholder?: string;
    className?: string;
    style?: IStyle;
};

const TextArea = (props: TProps) => {
    const { name, label, placeholder, className, style, ...rest } = props;
    const [field, meta] = useField<string>(name);

    return (
        <div className="space-y-2">
            {label && (
            <Label
                htmlFor={name}
                className={clsx( style?.label || "my-2")}
            >
                {label}
            </Label>
            )}

            <div className="relative">
                <Textarea
                    id={name}
                    placeholder={placeholder || ""}
                    {...field}
                    {...rest}
                    className={clsx(
                    
                        "w-full min-h-[4rem] rounded-md border border-slate-700 bg-[#0e172d] px-3 py-2 text-slate-200 placeholder:text-slate-400",
                        "focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:border-cyan-500 outline-none",
                        "transition-[color,box-shadow] disabled:opacity-50 disabled:cursor-not-allowed",
                        style?.input,
                        className
                    )}
                />
            </div>

            {meta.touched && meta.error && (
            <p className="text-sm text-red-500 mt-1">{meta.error}</p>
            )}
        </div>
    );
};  

const MotionedTextArea = withMotion(TextArea);
export default MotionedTextArea;
