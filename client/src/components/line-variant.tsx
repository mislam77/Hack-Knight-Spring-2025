import { format } from "date-fns";
import {
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
    CartesianGrid,
    LineChart,
    Line,
} from "recharts";

import { CustomTooltip } from "./custom-tooltip";

type Props = {
    data: {
        date: string
        amount: number
    }[]
}

export const LineVariant = ({ data }: Props) => {
    // Sort data by date in ascending order
    const sortedData = [...data].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return (
        <ResponsiveContainer width={"100%"} height={350}>
            <LineChart data={sortedData}>
                <CartesianGrid strokeDasharray={"3 3"} />
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
                <Line 
                    dataKey="amount"
                    stroke="#3d82f6"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}