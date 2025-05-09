import withMotion from "@/HOC/withMotion"
import { Label } from "@radix-ui/react-label"
import { Field, useField } from "formik"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type ISelectProps = Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "name"
> & {
    name: string,
    label?: string,
    options: IOptions[],
    defaultValue?: string,
}

const CustomSelectField: React.FC<ISelectProps> = ({
    name,
    label,
    options,
    ...rest
}) => {
    const [field, meta, helpers] = useField<string>(name);
    return(
        <div className="">
            {
                label && (
                    <Label htmlFor={name}>
                        {label}
                    </Label>
                )
            }
            <div>
                <Select 
                    onValueChange={(val) => helpers.setValue(val)}
                    {...field}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            options.map((option, index) => (
                                <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>

            {
                meta.touched && meta.error && (
                    <div className="text-red-500 text-sm">
                        {meta.error}
                    </div>
                )
            }
        </div>
    )
}
const MotionSelect = withMotion(CustomSelectField);

export default MotionSelect;