import { IFormCreationData } from "@/@types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, XAxis, YAxis, Line, LineChart, Tooltip  } from "recharts"
interface IProps {
    formCreationData: IFormCreationData[];
}
const FormCreationTrend = (props: IProps) => {
    return (
        <Card>
        <CardHeader>
            <CardTitle>Form Creation Trend</CardTitle>
            <CardDescription>Monthly form creation activity</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={props.formCreationData}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Line type="monotone" dataKey="forms" name="Forms Created" stroke="#8b5cf6"
                            strokeWidth={2}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
    )
}

export default FormCreationTrend