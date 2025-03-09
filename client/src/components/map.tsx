"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase/clientApp";
import { getUserTransactions } from "../../firebase/firestoreService";

const mapContainerStyle = {
    width: "100%",
    height: "100%",
};

const defaultCenter = { lat: 40.739854, lng: -73.820106 }; // Queens College in Flushing

type Transaction = {
    brand: string;
    date: string;
    purchasedDetail: string;
    totalAmount: string;
    status: string;
    storeLocation: { latitude: number; longitude: number; storeName: string };
};

type Props = {
    transactions: Transaction[];
};

const MapComponent = ({ transactions }: Props) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    const [stores, setStores] = useState([]);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        async function fetchTransactions(userId) {
            try {
                const transactions = await getUserTransactions(userId);
                const storeLocations = transactions.map(transaction => transaction.storeLocation);
                setStores(storeLocations);
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
            }
        }

        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
                // User is signed in
                const userId = user.uid;
                console.log("User authenticated:", userId);
                setUserId(userId);
                fetchTransactions(userId);
            } else {
                console.error("User not authenticated");
            }
        });
    }, []);

    if (loadError) return <p>Error loading maps</p>;
    if (!isLoaded) return <p>Loading...</p>;

    return (
        <div className="w-full h-100 bg-gray-100 mt-4 rounded-lg shadow-lg">
            <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={14}>
                {stores.map((store, idx) => (
                    <MarkerF
                        key={idx}
                        position={{ lat: store.latitude, lng: store.longitude }}
                        title={store.storeName}
                    />
                ))}
            </GoogleMap>
        </div>
    );
};

export default MapComponent;