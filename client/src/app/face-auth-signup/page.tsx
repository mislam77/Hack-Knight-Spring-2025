"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FIREBASE_STORAGE, FIREBASE_DB } from "../../../firebase/clientApp";
import { ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import Loading from "../assets/loading.gif";
import Webcam from "react-webcam";

const FaceAuthSignupContent = () => {
  const [isReady, setIsReady] = useState(false);
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const userIdParam = searchParams.get("userId");
    if (userIdParam) {
      setUserId(userIdParam);
    }
  }, [searchParams]);

  const handleReady = async () => {
    setIsReady(true);
    try {
      const response = await fetch("/api/face-take", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      console.log("Face authentication setup complete:", data);
      alert("Face authentication setup complete!");
      router.push(`/face-auth-train?userId=${userId}`);
    } catch (error) {
      console.error("Error during face authentication setup:", error);
      alert("Error: " + error.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Face Authentication Signup
        </h2>
        {!isReady ? (
          <div className="space-y-4">
            <p className="text-center">
              Position your face for the camera and press the ready button when
              ready.
            </p>
            <Webcam
              audio={false}
              screenshotFormat="image/jpeg"
              className="w-full rounded-md"
            />
            <button
              onClick={handleReady}
              className="w-full px-4 py-2 font-medium text-white rounded-lg btn-color hover:cursor-pointer"
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
            <p className="text-center mt-4">Taking pictures, please wait...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const FaceAuthSignupPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FaceAuthSignupContent />
    </Suspense>
  );
};

export default FaceAuthSignupPage;