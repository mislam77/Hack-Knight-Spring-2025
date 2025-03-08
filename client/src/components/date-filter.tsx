"use client";

import { useState } from "react";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { ChevronDown } from "lucide-react";
import qs from "query-string";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { Calendar } from "./ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose,
} from "./ui/popover"
import { Button } from "./ui/button";

export const DateFilter = () => {
    const router = useRouter();
    const pathname = usePathname();

    const params = useSearchParams();
    const from = params?.get("from") || "";
    const to = params?.get("to") || "";

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const paramState = {
        from: from ? new Date(from) : defaultFrom,
        to: to ? new Date(to) : defaultTo,
    }

    const [date, setDate] = useState<DateRange | undefined>(paramState);

    const pushToUrl = (dateRange: DateRange | undefined) => {
        const query = {
            from: format(dateRange?.from || defaultFrom, 'yyyy-MM-dd'),
            to: format(dateRange?.to || defaultTo, 'yyyy-MM-dd'),
        }

        const url = qs.stringifyUrl({
            url: pathname ?? '/',
            query,
        }, {skipNull: true, skipEmptyString: true});

        router.push(url);
    }

    const onReset = () => {
        setDate(undefined);
        pushToUrl(undefined);
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            timeZone: 'America/New_York',
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button disabled={false} size="sm" variant="outline" className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-black/80 hover:bg-black/20 hover:text-black border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
                    <span>
                        {date?.from && date?.to ? `${formatDate(date.from)} - ${formatDate(date.to)}` : `${formatDate(defaultFrom)} - ${formatDate(defaultTo)}`}
                    </span>
                    <ChevronDown className="ml-2 size-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="lg:w-auto w-full p-0" align="start">
                <Calendar 
                    disabled={false}
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                />
                <div className="p-4 w-full flex items-center gap-x-2">
                    <PopoverClose asChild>
                        <Button onClick={onReset} disabled={!date?.from || !date?.to} className="w-full" variant={"outline"}>
                            Reset
                        </Button>
                    </PopoverClose>
                    <PopoverClose asChild>
                        <Button onClick={() => pushToUrl(date)} disabled={!date?.from || !date?.to} className="w-full">
                            Apply
                        </Button>
                    </PopoverClose>
                </div>
            </PopoverContent>
        </Popover>
    )
}