"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FIREBASE_DB } from '../../../firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import Image from "next/image";
import Loading from "../assets/loading.gif";

const FaceAuthLoginPage = () => {
    const [message, setMessage] = useState('Please position your face directly towards the camera and wait a moment till it recognizes.');
    const router = useRouter();

    useEffect(() => {
        const recognizeFace = async () => {
            try {
                const response = await fetch('/api/face-recognize', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();

                if (data.error) {
                    setMessage('Face data not found.');
                } else {
                    const userDoc = await getDoc(doc(FIREBASE_DB, 'users', data.user_id));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setMessage(`Welcome back, ${userData.firstName} ${userData.lastName}`);
                        setTimeout(() => {
                            router.push('/');
                        }, 2000);
                    } else {
                        setMessage('Face data not found.');
                    }
                }
            } catch (error) {
                console.error('Error during face recognition:', error);
                setMessage('Face data not found.');
            }
        };

        recognizeFace();
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Face Authentication Sign In</h2>
                <div className="flex justify-center">
                    <Image 
                        src={Loading} 
                        alt="Loading Screen for face recognition" 
                        className="pointer-events-none select-none"
                        draggable={false}
                    />
                </div>
                <p className="text-center">{message}</p>
            </div>
        </div>
    );
};

export default FaceAuthLoginPage;