import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"

export const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    const date = payload[0]?.payload?.date;
    const amount = payload[0]?.value || 0;

    return (
        <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
            <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
                {date}
            </div>
            <Separator />
            <div className="p-2 px-3 space-y-1">
                <div className="flex items-center justify-between gap-x-4">
                    <div className="flex items-center gap-x-2">
                        <div className="size-1.5 bg-blue-500 rounded-full" />
                        <p className="text-sm text-muted-foreground">
                            Amount
                        </p>
                    </div>
                    <p className="text-sm text-right font-medium">
                        {formatCurrency(amount)}
                    </p>
                </div>
            </div>
        </div>
    )
}
