"use client";

import React, { useState } from "react";
import { FIREBASE_DB } from "../../../firebase/clientApp";
import { collection, addDoc, GeoPoint } from "firebase/firestore";
import PaymentMethodSelection from "@/components/payment-method-selection";
import OrderSummary from "@/components/order-summary";
import PaymentForm from "@/components/payment-form";
import FaceRecognitionDialog from "@/components/face-recognition-dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectItemText,
} from "@/components/ui/select";

import { ArrowLeft, Focus, IdCard, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const storeLocations = {
  "Queens College": { lat: 40.7365, lng: -73.8205 },
  "City College": { lat: 40.8198, lng: -73.9496 },
};

const SimulationPage: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState("Queens College");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orderSummary = [
    {
      amount: 3,
      item: "Tandoor Paneer Pizza",
      cost: 59.99,
    },
    {
      amount: 1,
      item: "French Fries",
      cost: 4.99,
    },
    {
      amount: 1,
      item: "Large Diet Coke",
      cost: 3.99,
    },
  ];

  const handlePayment = () => {
    setIsModalOpen(true);
  };

  const handleFaceRecognitionSuccess = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const distance = getDistance(
          userLocation,
          storeLocations[selectedStore]
        );
        const maxDistance = 0.1; // 100 meters

        if (distance <= maxDistance) {
          await addDoc(collection(FIREBASE_DB, "transactions"), {
            userId: "exampleUserId",
            storeId: "exampleStoreId",
            amount: 11.47,
            currency: "USD",
            storeName: selectedStore,
            storeLocation: new GeoPoint(
              storeLocations[selectedStore].lat,
              storeLocations[selectedStore].lng
            ),
            userLocation: new GeoPoint(userLocation.lat, userLocation.lng),
            items: orderSummary,
            createdAt: new Date(),
            status: "success",
          });
          setMessage("Transaction successful!");
        } else {
          setMessage(
            "Transaction failed: You are not within the store premises."
          );
        }
      });
    } catch (error) {
      console.error("Error during payment:", error);
      setMessage("Transaction failed.");
    }
  };

  interface Location {
    lat: number;
    lng: number;
  }

  const getDistance = (loc1: Location, loc2: Location): number => {
    const toRad = (value: number): number => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(loc2.lat - loc1.lat);
    const dLng = toRad(loc2.lng - loc1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(loc1.lat)) *
        Math.cos(toRad(loc2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const [cardNumber, setCardNumber] = React.useState("");

  const handleInputChange = (e: { target: { value: string } }) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(value);
  };

  const costArray = orderSummary.map((order) => order.cost);
  const subtotal = costArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const taxAmount = parseFloat((subtotal * 0.09).toFixed(2));
  const total = (subtotal + taxAmount).toFixed(2);

  return (
    <section className="py-5 bg-gray-50 h-screen flex items-center justify-center">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between relative">
          <div className="w-[720px]">
            <Card className="">
              <CardHeader>
                <CardTitle className="text-lg pt-5">Payment Method</CardTitle>
                <CardDescription>
                  <p className="mt-1">Select a payment method.</p>
                  <div className="flex gap-5 mt-6">
                    <button className="h-[100px] w-[100px] px-4 py-2 flex flex-col justify-center gap-1 hover:bg-gray-100 hover:cursor-pointer rounded-lg shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.75"
                        className="h-8 w-8 mx-auto"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                        <path d="M2 10h20"></path>
                      </svg>
                      <p className="text-center font-semibold text-[16px]">
                        Card
                      </p>
                    </button>
                    <button className="h-[100px] w-[100px] px-4 py-2 flex flex-col justify-center gap-1 hover:bg-gray-100 hover:cursor-pointer rounded-lg shadow-sm">
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        className="h-6 w-6 mx-auto"
                      >
                        <path
                          d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <p className="text-center font-semibold text-[16px]">
                        Paypal
                      </p>
                    </button>
                    <button className="h-[100px] w-[100px] px-4 py-2 flex flex-col justify-center gap-1 hover:bg-gray-100 hover:cursor-pointer rounded-lg shadow-sm">
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        className="h-7 w-7 mx-auto"
                      >
                        <path
                          d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <p className="text-center font-semibold text-[16px]">
                        Apple
                      </p>
                    </button>
                  </div>
                  <div className="flex items-center my-4">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-3 text-sm text-gray-500">or</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>
                  <div>
                    <button
                      onClick={handlePayment}
                      type="button"
                      className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white btn-color hover:cursor-pointer"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        {/* <svg
                        className="h-5 w-5 text-gray-300 group-hover:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10 2a8 8 0 1 1-8 8 8 8 0 0 1 8-8zm0 14a6 6 0 1 0-6-6 6 6 0 0 0 6 6zm-2-6a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm-2.5 0a4.5 4.5 0 0 1 9 0h-1a3.5 3.5 0 0 0-7 0h-1z" />
                      </svg> */}
                        <Focus strokeWidth={1.75} size={22} />
                      </span>
                      Pay with Invis.io
                    </button>
                  </div>
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
            </Card>
            <Select onValueChange={setSelectedStore} value={selectedStore}>
              <SelectTrigger className="w-full mb-4">
                <SelectValue>{selectedStore}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Locations</SelectLabel>
                  <SelectItem value="Queens College">
                    <SelectItemText>Queens College</SelectItemText>
                  </SelectItem>
                  <SelectItem value="City College">
                    <SelectItemText>City College</SelectItemText>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <PaymentForm
              cardNumber={cardNumber}
              handleInputChange={handleInputChange}
            />
            <PaymentMethodSelection handlePayment={handlePayment} />
          </div>
          <div className="w-[380px]">
            <OrderSummary
              orderSummary={orderSummary}
              subtotal={subtotal}
              taxAmount={taxAmount}
              total={total}
            />
          </div>
          <div className="absolute left-6 top-3">
            <Link href="/data-dashboard-page">
              <div className="flex items-center gap-1">
                <ArrowLeft strokeWidth={2} size={22} />
                <span className="w-full text-[17px] flex justify-center font-medium rounded-lg text-black bg-transparent hover:cursor-pointer">
                  Go to profile
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <FaceRecognitionDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRecognized={handleFaceRecognitionSuccess}
        storeLocation={storeLocations[selectedStore]}
      />
    </section>
  );
};

export default SimulationPage;
