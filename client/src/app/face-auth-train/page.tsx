"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image";
import Loading from "../assets/loading.gif";

const FaceAuthTrainPage = () => {
    const [isTraining, setIsTraining] = useState(true);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const userId = searchParams.get('userId');
        if (userId) {
            // Send the user ID to the face-recognition route
            fetch('/api/face-train', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Face training complete:', data);
                alert('Face training complete!');
                setIsTraining(false);
                router.push('/login');
            })
            .catch(error => {
                console.error('Error during face training:', error);
                alert('Error: ' + error.message || 'Something went wrong!');
                setIsTraining(false);
            });
        }
    }, [searchParams, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Face Authentication Training</h2>
                {isTraining ? (
                    <div className="flex flex-col items-center">
                        <Image 
                            src={Loading} 
                            alt="Loading Screen for face recognition" 
                            className="pointer-events-none select-none"
                            draggable={false}
                        />
                        <p className="text-center mt-4">Please wait a few seconds while your face is being trained...</p>
                    </div>
                ) : (
                    <p className="text-center">Face training complete!</p>
                )}
            </div>
        </div>
    );
};

export default FaceAuthTrainPage;