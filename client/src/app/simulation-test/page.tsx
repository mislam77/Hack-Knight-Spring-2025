"use client";

import React, { useState } from 'react';
import { FIREBASE_DB } from '../../../firebase/clientApp';
import { collection, addDoc, GeoPoint } from 'firebase/firestore';

const storeLocation = { lat: 40.710741, lng: -73.793364 };

const CheckoutPage: React.FC = () => {
    const [message, setMessage] = useState('');

    const handlePayment = async () => {
        try {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                const distance = getDistance(userLocation, storeLocation);
                const maxDistance = 0.1; // 100 meters

                if (distance <= maxDistance) {
                    await addDoc(collection(FIREBASE_DB, 'transactions'), {
                        userId: 'exampleUserId',
                        storeId: 'exampleStoreId',
                        amount: 11.47,
                        currency: 'USD',
                        storeName: "McDonald's Times Square, NY",
                        storeLocation: new GeoPoint(storeLocation.lat, storeLocation.lng),
                        userLocation: new GeoPoint(userLocation.lat, userLocation.lng),
                        items: [
                            { itemName: 'Big Mac', quantity: 1, price: 5.99 },
                            { itemName: 'Large Fries', quantity: 1, price: 3.49 },
                            { itemName: 'Medium Coke', quantity: 1, price: 1.99 },
                        ],
                        createdAt: new Date(),
                        status: 'success',
                    });
                    setMessage('Transaction successful!');
                } else {
                    setMessage('Transaction failed: You are not within the store premises.');
                }
            });
        } catch (error) {
            console.error('Error during payment:', error);
            setMessage('Transaction failed.');
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
            Math.cos(toRad(loc1.lat)) * Math.cos(toRad(loc2.lat)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">McDonald's Checkout</h1>
                <p className="text-gray-600 mb-4">Store: McDonald's Times Square, NY</p>

                <div className="border-b pb-4 mb-4">
                    <p className="font-semibold">Your Order:</p>
                    <ul className="text-gray-700">
                        <li>🍔 Big Mac - $5.99</li>
                        <li>🍟 Large Fries - $3.49</li>
                        <li>🥤 Medium Coke - $1.99</li>
                    </ul>
                    <p className="font-bold mt-2">Total: $11.47</p>
                </div>

                <div className="mb-4 text-center">
                    <p className="font-semibold">Payment Options</p>
                    <div className="flex justify-center space-x-4 mt-2">
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">💳 Card</button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">💲 PayPal</button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg">🔄 Klarna</button>
                    </div>
                </div>

                <div className="flex items-center my-4">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-3 text-sm text-gray-500">or</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>
                
                <div className="mt-4 flex justify-center">
                    <button 
                        onClick={handlePayment} 
                        className="w-1/2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                        Pay with Invis.io
                    </button>
                </div>
                
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default CheckoutPage;