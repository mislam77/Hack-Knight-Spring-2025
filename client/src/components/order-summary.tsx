import React from "react";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

interface OrderSummaryProps {
  orderSummary: { amount: number; item: string; cost: number }[];
  subtotal: number;
  taxAmount: number;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderSummary, subtotal, taxAmount, total }) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white px-3 rounded-lg w-full">
          <Table className="">
            <TableHeader>
              <TableRow className="border-none">
                <TableHead className="sr-only">Amount</TableHead>
                <TableHead className="sr-only">Item</TableHead>
                <TableHead className="sr-only">Cost</TableHead>
                <TableHead className="sr-only">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-gray-600 text-[13px] rounded-lg">
              {orderSummary.map((order) => (
                <TableRow key={order.item} className="border-none">
                  <TableCell className="font-medium">
                    <span>x</span>
                    {order.amount}
                  </TableCell>
                  <TableCell>{order.item}</TableCell>
                  <TableCell>${order.cost}</TableCell>
                  <TableCell>
                    <Button className="bg-transparent hover:bg-transparent shadow-none hover:cursor-pointer">
                      <Trash2 strokeWidth={1.75} className="text-gray-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex justify-between w-full text-[14px] text-gray-800">
            <p>Subtotal</p>
            <p>${subtotal}</p>
          </div>
          <div className="flex justify-between w-full text-[14px] text-gray-800">
            <p>Tax</p>
            <p>${taxAmount}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between w-full text-sm font-bold text-gray-800">
            <p>Order Total</p>
            <p>${total}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 -mt-2">
        <div className="flex gap-3 w-full">
          <Label htmlFor="coupon" className="sr-only">
            Coupon
          </Label>
          <Input id="coupon" placeholder="Coupon code" />
          <Button variant="outline" className="hover:cursor-pointer">
            Apply
          </Button>
        </div>
        <Button className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white btn-color hover:cursor-pointer">
          Confirm payment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;