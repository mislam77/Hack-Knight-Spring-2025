import { getFirestore, doc, getDoc, setDoc, updateDoc, increment, query, collection, where, getDocs, addDoc } from "firebase/firestore";
import { FIREBASE_APP } from './clientApp';

// Firestore instance
const db = getFirestore(FIREBASE_APP);

// Create a new user document or initialize with default metrics
export const createUser = async (userId: string, firstName: string, lastName: string, email: string, phoneNumber: string) => {
    try {
        await setDoc(doc(db, "users", userId), {
            firstName,
            lastName,
            phoneNumber,
            email,
            faceUniqueId: "",
            linkedBankAccounts: [],
            linkedCards: [],
            transactionHistory: [],
            createdAt: new Date().toISOString(),
        });
        console.log("User document successfully written!");
    } catch (error) {
        console.error("Error writing user document:", error);
        throw error;
    }
};

// Get transactions for a user
export const getUserTransactions = async (userId: string) => {
    try {
        const q = query(collection(db, "transactions"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const transactions = querySnapshot.docs.map(doc => doc.data());
        return transactions;
    } catch (error) {
        console.error("Error getting transactions:", error);
        throw error;
    }
};