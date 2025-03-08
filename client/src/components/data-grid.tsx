"use client"

import { FaPiggyBank } from "react-icons/fa"
import { DataCard } from "./data-card"


export const DataGrid = () => {
    const data = [
        {
            userId: 'ehdka271319hd', // Replace with actual user ID
            totalAmount: 69.98,
            currency: 'USD',
            storeName: 'Test Store 1',
            // storeLocation: new GeoPoint(40.7128, -74.0060), // Example coordinates (NYC)
            // deviceLocation: new GeoPoint(40.7129, -74.0059), // Slight variation for realism
            items: [
                { itemName: 'Product A', quantity: 2, price: 19.99 },
                { itemName: 'Product B', quantity: 1, price: 49.99 },
            ],
            timestamp: new Date('2025-03-07'),
        },
        {
            userId: 'ehdka271319hd', // Replace with actual user ID
            totalAmount: 100.97,
            currency: 'USD',
            storeName: 'Test Store 2',
            // storeLocation: new GeoPoint(40.7128, -74.0060), // Example coordinates (NYC)
            // deviceLocation: new GeoPoint(40.7129, -74.0059), // Slight variation for realism
            items: [
                { itemName: 'Product A', quantity: 2, price: 19.99 },
                { itemName: 'Product B', quantity: 1, price: 49.99 },
                { itemName: 'Product C', quantity: 1, price: 30.99 },
            ],
            timestamp: new Date('2025-03-06'),
        },
        {
            userId: 'ehdka271319hd', // Replace with actual user ID
            totalAmount: 50.98,
            currency: 'USD',
            storeName: 'Test Store 3',
            // storeLocation: new GeoPoint(40.7128, -74.0060), // Example coordinates (NYC)
            // deviceLocation: new GeoPoint(40.7129, -74.0059), // Slight variation for realism
            items: [
                { itemName: 'Product A', quantity: 1, price: 19.99 },
                { itemName: 'Product B', quantity: 1, price: 30.99 },
            ],
            timestamp: new Date('2025-03-04'),
        }
    ];

    // Calculate total spending
    const totalSpending = data.reduce((sum, transaction) => sum + transaction.totalAmount, 0);
    
    // Get date range
    const dates = data.map(item => item.timestamp);
    const oldestDate = new Date(Math.min(...dates.map(date => date.getTime())));
    const newestDate = new Date(Math.max(...dates.map(date => date.getTime())));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
            <DataCard 
                title="Total Spending"
                value={totalSpending}
                icon={FaPiggyBank}
                variant="default"
                date={`${oldestDate.toLocaleDateString()} - ${newestDate.toLocaleDateString()}`}
            />
        </div>
    )
}


