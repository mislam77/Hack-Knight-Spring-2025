"use client";

import React, { useState } from "react";
import CustomModal from "./custom-modal";
import { FIREBASE_DB } from "../../firebase/clientApp";
import { doc, getDoc, collection, addDoc, GeoPoint } from "firebase/firestore";
import Image from "next/image";
import Loading from "../app/assets/loading.gif";
import Webcam from "react-webcam";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface FaceRecognitionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRecognized: () => void;
}

const storeLocation = { lat: 40.739854, lng: -73.820106 };

const FaceRecognitionDialog: React.FC<FaceRecognitionDialogProps> = ({ isOpen, onClose, onRecognized }) => {
  const [isReady, setIsReady] = useState(false);
  const [message, setMessage] = useState("Stay still while we recognize your face...");
  const [userData, setUserData] = useState<{ firstName: string; lastName: string; userId: string }>({ firstName: "", lastName: "", userId: "" });

  const handleReady = () => {
    setIsReady(true);
    recognizeFace();
  };

  const recognizeFace = async () => {
    try {
      const response = await fetch("/api/face-recognize", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.error) {
        setMessage("Face data not found.");
      } else {
        const userDoc = await getDoc(doc(FIREBASE_DB, "users", data.user_id));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserData({ firstName: userData.firstName, lastName: userData.lastName, userId: data.user_id });
          setMessage(`Are you ${userData.firstName} ${userData.lastName}?`);
        } else {
          setMessage("Face data not found.");
        }
      }
    } catch (error) {
      console.error("Error during face recognition:", error);
      setMessage("Face data not found.");
    }
  };

  const handleYes = () => {
    verifyLocation();
  };

  const handleNo = () => {
    setIsReady(false);
    setMessage("Stay still while we recognize your face...");
  };
  
  const verifyLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
  
        const distance = getDistance(userLocation, storeLocation);
        const maxDistance = 1; // 100 meters
        console.log(userData);
  
        if (distance <= maxDistance) {
            await addDoc(collection(FIREBASE_DB, "transactions"), {
                userId: userData.userId,
                amount: 11.47,
                currency: "USD",
                storeName: "McDonald's Times Square, NY",
                storeLocation: new GeoPoint(storeLocation.lat, storeLocation.lng),
                userLocation: new GeoPoint(userLocation.lat, userLocation.lng),
                items: [
                    { itemName: "Tandoor Paneer Pizza", quantity: 3, price: 59.99 },
                    { itemName: "French Fries", quantity: 1, cost: 4.99 },
                    { itemName: "Large Diet Coke", quantity: 1, cost: 3.99 }
                ],
                createdAt: new Date(),
                category: "Food",
              });              
          toast.success("Location matched: Transaction Successful!");
        } else {
          toast.error("Location mismatch: Transaction denied.");
        }
        onClose();
      });
    } catch (error) {
      console.error("Error during location verification:", error);
      toast.error("Location verification failed.");
      onClose();
    }
  };

  const getDistance = (loc1: { lat: number; lng: number }, loc2: { lat: number; lng: number }): number => {
    const toRad = (value: number): number => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(loc2.lat - loc1.lat);
    const dLng = toRad(loc2.lng - loc1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(loc1.lat)) * Math.cos(toRad(loc2.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <>
      <CustomModal isOpen={isOpen} onClose={onClose}>
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Face Recognition</h2>
          {isReady ? (
            <div className="flex flex-col items-center">
              <Image
                src={Loading}
                alt="Loading Screen for face recognition"
                className="pointer-events-none select-none"
                draggable={false}
              />
              <div className="text-center mt-4">{message}</div>
              {message.includes("Are you") && (
                <div className="flex gap-4 mt-4">
                  <button onClick={handleYes} className="bg-green-500 text-white px-4 py-2 rounded-md">Yes</button>
                  <button onClick={handleNo} className="bg-red-500 text-white px-4 py-2 rounded-md">No</button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                Position your face directly towards the camera and press the ready button when ready.
              </div>
              <Webcam
                audio={false}
                screenshotFormat="image/jpeg"
                className="w-full rounded-md"
              />
              <button
                onClick={handleReady}
                className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Ready
              </button>
            </div>
          )}
        </div>
      </CustomModal>
      <ToastContainer />
    </>
  );
};

export default FaceRecognitionDialog;