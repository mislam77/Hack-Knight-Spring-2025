"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase/clientApp";
import { getUserTransactions } from "../../firebase/firestoreService";

type Transaction = {
  id: string;
  brand: string;
  date: string;
  purchasedDetail: string;
  totalAmount: string;
};

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        try {
          const userTransactions = await getUserTransactions(user.uid);
          const formattedTransactions = userTransactions.map(
            (transaction: any) => ({
              id: transaction.id,
              brand: transaction.storeName,
              date: transaction.createdAt.toDate().toLocaleDateString(),
              purchasedDetail: transaction.items
                .map((item: any) => item.itemName)
                .join(", "),
              totalAmount: `$${transaction.amount.toFixed(2)}`,
            })
          );

          // Sort transactions by date and get the most recent 10
          const recentTransactions = formattedTransactions
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice(0, 10);

          setTransactions(recentTransactions);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setTransactions([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading transactions...</div>;
  }

  return (
    <div className="shadow-lg bg-white px-3 rounded-lg w-full">
      <Table className="">
        <TableHeader>
          <TableRow className="text-[12px]">
            <TableHead className="">Brand</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Purchased Detail</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={transaction.id || index} className="text-[12px]">
              <TableCell className="font-medium truncate">
                {transaction.brand}
              </TableCell>
              <TableCell className="truncate">{transaction.date}</TableCell>
              <TableCell className="truncate">
                {transaction.purchasedDetail}
              </TableCell>
              <TableCell className="truncate">
                {transaction.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
