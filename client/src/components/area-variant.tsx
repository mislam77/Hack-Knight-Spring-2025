import {
    Tooltip,
    XAxis,
    YAxis,
    AreaChart,
    Area,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts"
import { format } from "date-fns"
import { CustomTooltip } from "./custom-tooltip"

type Props = {
    data: {
        date: string
        amount: number
    }[]
}

export const AreaVariant = ({ data }: Props) => {
    // Sort data by date in ascending order
    const sortedData = [...data].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    return (
        <ResponsiveContainer width={"100%"} height={350}>
            <AreaChart data={sortedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <defs>
                    <linearGradient id="amount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="2%" stopColor="#3d82f6" stopOpacity={0.8} />
                        <stop offset="98%" stopColor="#3d82f6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis 
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(new Date(value), "dd MMM")}
                    style={{fontSize: "12px"}}
                    tickMargin={16}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    style={{fontSize: "12px"}}
                    tickMargin={16}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                    type="monotone"
                    dataKey="amount"
                    stackId="amount"
                    strokeWidth={2}
                    stroke="#3d82f6"
                    fill="url(#amount)"
                    className="drop-shadow-sm"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}
