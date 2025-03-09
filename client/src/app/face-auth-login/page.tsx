"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FIREBASE_DB, FIREBASE_AUTH } from "../../../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { signInWithCustomToken } from "firebase/auth";
import Image from "next/image";
import Loading from "../assets/loading.gif";
import Webcam from "react-webcam";

const FaceAuthLoginPage = () => {
  const [message, setMessage] = useState(
    "Stay still while we recognize your face..."
  );
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

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
        // Sign in with custom token
        await signInWithCustomToken(FIREBASE_AUTH, data.custom_token);

        const userDoc = await getDoc(doc(FIREBASE_DB, "users", data.user_id));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setMessage(
            `Welcome back, ${userData.firstName} ${userData.lastName}`
          );
          setTimeout(() => {
            router.push("/data-dashboard-page");
          }, 2000);
        } else {
          setMessage("Face data not found.");
        }
      }
    } catch (error) {
      console.error("Error during face recognition:", error);
      setMessage("Face data not found.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Face Authentication Sign In
        </h2>
        {!isReady ? (
          <div className="space-y-4">
            <p className="text-center">
              Position your face directly towards the camera and press the ready button when ready.
            </p>
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
        ) : (
          <div className="flex flex-col items-center">
            <Image
              src={Loading}
              alt="Loading Screen for face recognition"
              className="pointer-events-none select-none"
              draggable={false}
            />
            <p className="text-center mt-4">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceAuthLoginPage;