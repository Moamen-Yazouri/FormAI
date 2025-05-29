import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, ArrowUpRight } from "lucide-react"

interface IStateCard {
  stateTitle: string
  stateValue: string | number
  statePercentage: string | number
}

interface IProps extends IStateCard {}

const StateCard = (props: IProps) => {
  const { stateTitle, stateValue, statePercentage } = props

  return (
    <Card className="bg-gradient-to-br from-slate-950/60 via-blue-900/40 to-indigo-900/40 border border-blue-700/30 shadow-xl backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-[#93c1ff]">{stateTitle}</CardTitle>
        <Users className="h-4 w-4 text-blue-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-200">{stateValue}</div>
        <p className="text-xs text-slate-400 mt-1">
          <span className="text-cyan-500 font-medium flex items-center">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            {`${statePercentage} from last month`}
          </span>
        </p>
      </CardContent>
    </Card>
  )
}

export default StateCard
