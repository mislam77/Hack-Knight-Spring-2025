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
  SelectItemIndicator,
} from "@/components/ui/select";

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

        const distance = getDistance(userLocation, storeLocations[selectedStore]);
        const maxDistance = 0.1; // 100 meters

        if (distance <= maxDistance) {
          await addDoc(collection(FIREBASE_DB, "transactions"), {
            userId: "exampleUserId",
            storeId: "exampleStoreId",
            amount: 11.47,
            currency: "USD",
            storeName: selectedStore,
            storeLocation: new GeoPoint(storeLocations[selectedStore].lat, storeLocations[selectedStore].lng),
            userLocation: new GeoPoint(userLocation.lat, userLocation.lng),
            items: orderSummary,
            createdAt: new Date(),
            status: "success",
          });
          setMessage("Transaction successful!");
        } else {
          setMessage("Transaction failed: You are not within the store premises.");
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
        <div className="flex justify-between">
          <div className="w-[720px]">
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
            <PaymentForm cardNumber={cardNumber} handleInputChange={handleInputChange} />
            <PaymentMethodSelection handlePayment={handlePayment} />
          </div>
          <div className="w-[380px]">
            <OrderSummary orderSummary={orderSummary} subtotal={subtotal} taxAmount={taxAmount} total={total} />
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