"use client";

import { useEffect, useState } from "react";
import { Chart } from "./chart";
import { SpendingPie } from "./spending-pie";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase/clientApp";
import { getUserTransactions } from "../../firebase/firestoreService";
import TransactionsTable from "../components/transactions-table";
import MapComponent from "../components/map";

export const DataCharts = () => {
    const [loading, setLoading] = useState(true);
    const [authUser, setAuthUser] = useState<{ uid: string | null }>({ uid: null });
    const [transactions, setTransactions] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
            if (user) {
                setAuthUser({ uid: user.uid });
                try {
                    // Fetch user transactions from Firestore
                    const userTransactions = await getUserTransactions(user.uid);
                    
                    // Format transactions with proper date objects
                    const formattedTransactions = userTransactions.map(transaction => {
                        // Create a safe copy
                        const processedTransaction = { ...transaction };
                        
                        // Handle timestamp conversion properly with fallbacks
                        try {
                            if (transaction.createdAt) {
                                // Handle Firestore Timestamp object (has toDate method)
                                if (transaction.createdAt.toDate && typeof transaction.createdAt.toDate === 'function') {
                                    processedTransaction.createdAt = transaction.createdAt.toDate();
                                }
                                // Handle if it's already a Date
                                else if (transaction.createdAt instanceof Date) {
                                    processedTransaction.createdAt = transaction.createdAt;
                                }
                                // Handle numeric timestamp (milliseconds since epoch)
                                else if (typeof transaction.createdAt === 'number') {
                                    processedTransaction.createdAt = new Date(transaction.createdAt);
                                }
                                // Try to parse string formats
                                else if (typeof transaction.createdAt === 'string') {
                                    processedTransaction.createdAt = new Date(transaction.createdAt);
                                    // Check if valid date was created
                                    if (isNaN(processedTransaction.createdAt.getTime())) {
                                        throw new Error('Invalid date string');
                                    }
                                } 
                                // If none of the above worked, throw error
                                else {
                                    throw new Error('Unrecognized timestamp format');
                                }
                            } else {
                                // If no timestamp, use current date as fallback
                                processedTransaction.createdAt = new Date();
                                console.warn('Transaction missing createdAt date, using current date:', transaction);
                            }
                        } catch (error) {
                            console.error('Error processing transaction timestamp:', error, transaction);
                            // Fallback to current date if conversion fails
                            processedTransaction.createdAt = new Date();
                        }
                        
                        return processedTransaction;
                    });
                    
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

        // Clean up subscription
        return () => unsubscribe();
    }, []);
    
    // Format data for charts if we have transactions
    const data = {
        // For Chart component - spending by day, aggregated by date
        days: Object.entries(
            transactions.reduce<Record<string, number>>((acc, transaction) => {
                const dateKey = transaction.createdAt?.toLocaleDateString() || new Date().toLocaleDateString();
                acc[dateKey] = (acc[dateKey] || 0) + (transaction.amount || 0);
                return acc;
            }, {})
        ).map(([date, amount]) => ({ date, amount })),
        
        // For SpendingPie component - using both categories and items
        categories: transactions.length > 0 
            ? [
                // Group by category if available
                ...transactions
                  .filter(t => t.category)
                  .reduce<Array<{ name: string; value: number }>>((acc, curr) => {
                    const existing = acc.find(item => item.name === curr.category);
                    if (existing) {
                        existing.value += curr.amount;
                    } else {
                        acc.push({ name: curr.category, value: curr.amount });
                    }
                    return acc;
                }, []),
                
                // Group by items if no categories are available
                ...(transactions.some(t => !t.category) 
                    ? transactions.flatMap(transaction => 
                        (transaction.items || []).map(item => ({
                            name: item.itemName || 'Unknown Item',
                            value: (item.price * item.quantity) || 0
                        }))
                    ).reduce<Array<{ name: string; value: number }>>((acc, curr) => {
                        const existing = acc.find(item => item.name === curr.name);
                        if (existing) {
                            existing.value += curr.value;
                        } else {
                            acc.push(curr);
                        }
                        return acc;
                    }, [])
                    : [])
            ]
            : []
    };

    // Show loading state
    if (loading) {
        return <div className="py-10 text-center">Loading transaction data...</div>;
    }

    // Show message if not authenticated
    if (!authUser.uid) {
        return <div className="py-10 text-center">Please sign in to view your transaction data</div>;
    }

    // Show message if no transactions
    if (transactions.length === 0) {
        return <div className="py-10 text-center">No transactions found</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-7xl mx-auto h-full">
            <div className="flex flex-col space-y-6 h-full">
                <div className="flex-1 flex items-stretch">
                    <div className="w-full h-full"><Chart data={data.days} /></div>
                </div>
                <div className="flex-1 flex items-stretch">
                    <div className="w-full h-full"><SpendingPie data={data.categories} /></div>
                </div>
            </div>
            <div className="flex flex-col space-y-6 h-full">
                <div className="flex-1 flex items-stretch">
                    <div className="w-full h-full"><TransactionsTable transactions={transactions} /></div>
                </div>
                <div className="flex-1 flex items-stretch">
                    <div className="w-full h-full"><MapComponent transactions={transactions} /></div>
                </div>
            </div>
        </div>
    );        
}