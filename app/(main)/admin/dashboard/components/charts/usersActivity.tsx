import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { IUsersActivityData } from "@/@types";

interface IProps {
    userActivityData: IUsersActivityData[];
}

const UserActivityChart = (props: IProps) => {
    return (
        <Card>
            <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>
                Daily active users and new registrations
            </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={props.userActivityData}>
                    <XAxis
                    dataKey="name"
                    interval={0} // show all day labels
                    tick={{ fill: "#6b7280", fontSize: 12 }} // optional styling
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="new" name="New Users" fill="#c4b5fd" />
                    <Bar dataKey="active" name="Active Users" fill="#8b5cf6" />
                </BarChart>
                </ResponsiveContainer>
            </div>
            </CardContent>
        </Card>
    );
};


export default UserActivityChart;
