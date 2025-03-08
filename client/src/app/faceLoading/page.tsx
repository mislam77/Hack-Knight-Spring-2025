"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "../assets/loading.gif";

function FaceRec() {
    // State to track whether scanning is complete
    const [isScanning, setIsScanning] = useState(true);
    
    // This effect simulates the scanning process completing after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsScanning(false);
        }, 5000); // 5 seconds timer
        
        return () => clearTimeout(timer); // Clean up timer
    }, []);
    
    return (
        <div className="mx-auto max-w-[400px] mt-[230px]">
            <div className="">
                <div>
                    <Image 
                        src={Loading} 
                        alt="Loading Screen for face recognition" 
                        className="pointer-events-none select-none"
                        draggable={false}
                    />
                </div>
                <h1 className="text-center font-medium text-3xl pointer-events-none select-none" draggable="false">
                    {isScanning 
                        ? "Don't move, scanning face......" 
                        : "Scan complete! Welcome back."}
                </h1>
            </div>
        </div>
    );
}

export default FaceRec;