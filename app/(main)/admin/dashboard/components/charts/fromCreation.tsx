// "use client"

// import type { IFormTable } from "@/@types"
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
// import { ChartTooltip, ResponsiveContainer } from "@/components/ui/chart"
// import { Line, LineChart, XAxis, YAxis } from "recharts"

// interface IProps {
//     formCreationData: IFormTable[]
// }

// const FormCreationChart = ({ formCreationData }: IProps) => {
//     return (
//         <Card className="bg-gradient-to-br from-slate-900/60 via-violet-900/40 to-indigo-900/40 border border-violet-800/30 shadow-xl backdrop-blur-sm">
//         <CardHeader>
//             <CardTitle className="text-lg font-semibold bg-gradient-to-r from-violet-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
//             Form Creation Trend
//             </CardTitle>
//             <CardDescription className="text-slate-400">Monthly form creation activity</CardDescription>
//         </CardHeader>

//         <CardContent className="pt-2">
//             <div className="h-[300px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={formCreationData}>
//                 <XAxis dataKey="name" stroke="#a1a1aa" tick={{ fontSize: 12, fill: "#a1a1aa" }} />
//                 <YAxis stroke="#a1a1aa" tick={{ fontSize: 12, fill: "#a1a1aa" }} />
//                 <ChartTooltip
//                     contentStyle={{
//                     backgroundColor: "rgba(30, 27, 75, 0.95)",
//                     borderColor: "rgba(139, 92, 246, 0.5)",
//                     borderRadius: "8px",
//                     backdropFilter: "blur(8px)",
//                     boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
//                     }}
//                     labelStyle={{ color: "#c4b5fd" }}
//                     itemStyle={{ color: "#e0e7ff" }}
//                 />
//                 <Line
//                     type="monotone"
//                     dataKey="forms"
//                     name="Forms Created"
//                     stroke="#8b5cf6"
//                     strokeWidth={2}
//                     dot={{ stroke: "#8b5cf6", strokeWidth: 2, fill: "#1e1b4b", r: 4 }}
//                     activeDot={{ stroke: "#8b5cf6", strokeWidth: 2, fill: "#c4b5fd", r: 6 }}
//                 />
//                 </LineChart>
//             </ResponsiveContainer>
//             </div>
//         </CardContent>
//         </Card>
//     )
// }

// export default FormCreationChart
