import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PaymentFormProps {
  cardNumber: string;
  handleInputChange: (e: { target: { value: string } }) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  cardNumber,
  handleInputChange,
}) => {
  return (
    <Card className="relative">
      <CardHeader className="mt-2">
        <CardTitle className="text-lg">Payment Method</CardTitle>
        <CardDescription>
          <p className="mt-1">Select a payment method.</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action="/submit" method="POST" autoComplete="off">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name on card</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="w-[350px] flex flex-col gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cardNumber">Card number</Label>
                <Input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleInputChange}
                  placeholder="0000 0000 0000 0000"
                />
              </div>
              <div className="flex flex-row justify-between gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="date">Expiration</Label>
                  <Input id="date" placeholder="01/2026" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input type="text" id="cvv" placeholder="123" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button variant="outline" className="rounded-lg cursor-pointer">
          Cancel
        </Button>
        <Button className="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white btn-color hover:cursor-pointer">
          Confirm payment
        </Button>
      </CardFooter>
      <div className="absolute left-5 top-2">
        <Link href="/data-dashboard-page" className="hover:text-[#41a5fa]">
          <div className="flex gap-1 items-center">
            <ArrowLeft size={15} />
            <span className="text-[14px]">Go to dashboard</span>
          </div>
        </Link>
      </div>
    </Card>
  );
};

export default PaymentForm;
