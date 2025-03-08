"use client"

import { FaPiggyBank, FaShoppingBag, FaUtensils } from "react-icons/fa"
import { DataCard } from "./data-card"

import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../../firebase/clientApp";
import { getUserTransactions } from "../../firebase/firestoreService";

interface AuthUser {
    uid: string | null;
}

interface Transaction {
    amount: number;
    currency: string;
    category: string;
    storeName: string;
    items: Array<{ itemName: string; quantity: number; price: number }>;
    createdAt: Date;
}

export const DataGrid = () => {
    const [authUser, setAuthUser] = useState<AuthUser>({ uid: null });
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
            if (user) {
                setAuthUser({ uid: user.uid });
                try {
                    const userTransactions = await getUserTransactions(user.uid);
                    // Convert Firestore timestamps to Date objects
                    const formattedTransactions = userTransactions.map((transaction: any) => ({
                        ...transaction,
                        createdAt: transaction.createdAt instanceof Date 
                            ? transaction.createdAt 
                            : transaction.createdAt?.toDate?.() || new Date(transaction.createdAt)
                    }));
                    setTransactions(formattedTransactions);
                } catch (error) {
                    console.error("Error fetching transactions:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setAuthUser({ uid: null });
                setTransactions([]);
                setLoading(false);
            }
        });
        
        return () => unsubscribe();
    }, []);

    // Calculate total spending
    const totalSpending = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    
    // Calculate spending by category
    const categories = transactions.reduce<Record<string, number>>((acc, transaction) => {
        const category = transaction.category || 'Uncategorized';
        acc[category] = (acc[category] || 0) + transaction.amount;
        return acc;
    }, {});
    
    // Find top category
    let topCategory = { name: 'None', amount: 0 };
    Object.entries(categories).forEach(([name, amount]) => {
        if (amount > topCategory.amount) {
            topCategory = { name, amount };
        }
    });
    
    // Get date range
    const dates = transactions.map(item => item.createdAt);
    
    // Handle case when there are no transactions
    const dateRangeText = dates.length > 0
        ? `${new Date(Math.min(...dates.map(date => date.getTime()))).toLocaleDateString()} - ${new Date(Math.max(...dates.map(date => date.getTime()))).toLocaleDateString()}`
        : "No transactions yet";

    if (loading) {
        return <div className="text-center py-10">Loading transactions...</div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
            <DataCard 
                title="Total Spending"
                value={totalSpending}
                icon={FaPiggyBank}
                variant="default"
                date={dateRangeText}
            />
            
            {transactions.length > 0 && (
                <DataCard 
                    title={`Top Category: ${topCategory.name}`}
                    value={topCategory.amount}
                    icon={topCategory.name === 'Food' ? FaUtensils : FaShoppingBag}
                    variant="success"
                    date={dateRangeText}
                />
            )}
        
            
            {!authUser.uid && (
                <div className="col-span-full text-center text-gray-500">
                    Please sign in to view your transactions
                </div>
            )}
            {authUser.uid && transactions.length === 0 && (
                <div className="col-span-full text-center text-gray-500">
                    No transactions found
                </div>
            )}
        </div>
    );
}


