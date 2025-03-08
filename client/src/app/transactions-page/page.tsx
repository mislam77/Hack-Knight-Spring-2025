"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Bar, BarChart, ResponsiveContainer } from "recharts"
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const invoices = [
  {
    brand: "Chicken Italiano",
    date: "07/03/2025",
    purchasedDetail: "Tandoor Paneer Pizza",
    totalAmount: "$50.00",
    status: "Pending",
  },
  {
    brand: "Starbucks",
    date: "03/03/2025",
    purchasedDetail: "Small Iced Coffee",
    totalAmount: "$10.00",
    status: "Paid",
  },
  {
    brand: "Jio",
    date: "01/03/2025",
    purchasedDetail: "Prepaid Recharge",
    totalAmount: "$34.99",
    status: "Paid",
  },
  {
    brand: "Target",
    date: "25/02/2025",
    purchasedDetail: "Red T-shirt",
    totalAmount: "$39.99",
    status: "Paid",
  },
  {
    brand: "McDonalds",
    date: "20/02/2025",
    purchasedDetail: "Big Mac",
    totalAmount: "$14.99",
    status: "Paid",
  },
  {
    brand: "Dollar Tree",
    date: "20/02/2025",
    purchasedDetail: "Toilet Papers",
    totalAmount: "$15.39",
    status: "Paid",
  },
  {
    brand: "Chipotle",
    date: "16/02/2025",
    purchasedDetail: "Steak Bowl",
    totalAmount: "$13.75",
    status: "Paid",
  },
];

export default function TransactionsPage() {
  return (
    <section className="py-10 bg-[#F9FAFB]">
      <div className="w-[900px] mx-auto">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">Your Balance</CardTitle>
          </CardHeader>
          <CardContent className="-mt-3">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-3xl">$3090.89</h2>
              <div className="flex gap-3">
                <p>This Month</p>
                <div className="rounded-lg border border-blue-300 px-2">
                  $1090.67
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <ChartContainer
                config={chartConfig}
                className="min-h-[50px] w-[100px]"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <Bar dataKey="desktop" fill="#1e8fde" radius={4} />
                  <Bar dataKey="mobile" fill="#1e8fde" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between mt-3">
            <div className="">
              <h3 className="font-bold text-lg">$872</h3>
              <p className="#4B5563">Expenses</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">126</h3>
              <p className="#4B5563">Transactions</p>
            </div>
          </CardFooter>
        </Card>
        <div className="bg-white px-3 rounded-lg mt-8 shadow-lg">
          <Table className="">
            <TableHeader>
              <TableRow className="">
                <TableHead className="w-[100px]">Brand</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Purchased Detail</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.brand}>
                  <TableCell className="font-medium">{invoice.brand}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.purchasedDetail}</TableCell>
                  <TableCell>{invoice.totalAmount}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
