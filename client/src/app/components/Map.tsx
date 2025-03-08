"use client";

import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../firebase/clientApp";
import { getUserTransactions } from "../../../firebase/firestoreService";

const mapContainerStyle = {
    width: "70%",
    height: "500px",
};

const defaultCenter = { lat: 40.7365, lng: -73.8203 }; // Rosenthal Library, Queens College in Flushing

export default function Map({ userLat = defaultCenter.lat, userLng = defaultCenter.lng }) {
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
    }, [userLat, userLng]);

    if (loadError) return <p>Error loading maps</p>;
    if (!isLoaded) return <p>Loading...</p>;

    return (
        <GoogleMap mapContainerStyle={mapContainerStyle} center={{ lat: userLat, lng: userLng }} zoom={14}>
            {stores.map((store, idx) => (
                <MarkerF
                    key={idx}
                    position={{ lat: store.latitude, lng: store.longitude }}
                    title={store.storeName}
                />
            ))}
        </GoogleMap>
    );
}