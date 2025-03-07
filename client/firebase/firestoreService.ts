import { getFirestore, doc, getDoc, setDoc, updateDoc, increment, collection, addDoc } from "firebase/firestore";
import { FIREBASE_APP } from './clientApp';

// Firestore instance
const db = getFirestore(FIREBASE_APP);

// Create a new user document or initialize with default metrics
export const createUser = async (userId: string, firstName: string, lastName: string, email: string) => {
    try {
        await setDoc(doc(db, "users", userId), {
            firstName,
            lastName,
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