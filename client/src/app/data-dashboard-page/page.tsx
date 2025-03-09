"use client";

import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../firebase/clientApp';
import { getUser } from '../../../firebase/firestoreService';
import { DataCharts } from '@/components/data-charts';
import { DataGrid } from '@/components/data-grid';

export default function DashboardPage() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, async (user) => {
            if (user) {
                const userId = user.uid;
                console.log("User authenticated:", userId);
                try {
                    const user = await getUser(userId);
                    setUserName(`${user.firstName} ${user.lastName}`);
                } catch (error) {
                    console.error("Failed to fetch user profile:", error);
                }
            } else {
                console.error("User not authenticated");
            }
        });
    }, []);

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-36">
            <h1 className="text-4xl text-white font-bold mb-6 text-center">Welcome, {userName}!</h1>
            <DataGrid />
            <DataCharts />
        </div>
    );
}