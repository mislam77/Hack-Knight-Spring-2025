import { getFirestore, collection, addDoc, GeoPoint } from "firebase/firestore";
import { FIREBASE_APP } from './clientApp';

const db = getFirestore(FIREBASE_APP);

const generateRandomLocation = (lat: number, lng: number, radius: number) => {
    const getRandomOffset = () => (Math.random() - 0.5) * 2 * radius / 69; // 1 degree latitude ~ 69 miles
    return {
        lat: lat + getRandomOffset(),
        lng: lng + getRandomOffset()
    };
};

const rosenthalLibraryLocation = { lat: 40.7365, lng: -73.8205 };
const radiusInMiles = 5;

const storeLocations = [
    { ...generateRandomLocation(rosenthalLibraryLocation.lat, rosenthalLibraryLocation.lng, radiusInMiles), storeName: "McDonald's", category: "Food", items: [
        { itemName: 'Big Mac', quantity: 1, price: 5.99 },
        { itemName: 'Large Fries', quantity: 1, price: 3.49 },
        { itemName: 'Medium Coke', quantity: 1, price: 1.99 }
    ]},
    { ...generateRandomLocation(rosenthalLibraryLocation.lat, rosenthalLibraryLocation.lng, radiusInMiles), storeName: "Target", category: "Clothing", items: [
        { itemName: 'Red T-shirt', quantity: 1, price: 14.99 },
        { itemName: 'Jeans', quantity: 1, price: 39.99 }
    ]},
    { ...generateRandomLocation(rosenthalLibraryLocation.lat, rosenthalLibraryLocation.lng, radiusInMiles), storeName: "Best Buy", category: "Electronics", items: [
        { itemName: 'Laptop', quantity: 1, price: 499.99 },
        { itemName: 'Headphones', quantity: 1, price: 29.99 }
    ]},
    { ...generateRandomLocation(rosenthalLibraryLocation.lat, rosenthalLibraryLocation.lng, radiusInMiles), storeName: "AMC Theatres", category: "Entertainment", items: [
        { itemName: 'Movie Ticket', quantity: 2, price: 12.99 },
        { itemName: 'Popcorn', quantity: 1, price: 5.99 }
    ]},
    { ...generateRandomLocation(rosenthalLibraryLocation.lat, rosenthalLibraryLocation.lng, radiusInMiles), storeName: "Walmart", category: "Household", items: [
        { itemName: 'Toilet Paper', quantity: 1, price: 15.39 },
        { itemName: 'Laundry Detergent', quantity: 1, price: 10.99 }
    ]},
    { ...generateRandomLocation(rosenthalLibraryLocation.lat, rosenthalLibraryLocation.lng, radiusInMiles), storeName: "Dollar Tree", category: "Misc", items: [
        { itemName: 'Notebook', quantity: 1, price: 1.99 },
        { itemName: 'Pen', quantity: 1, price: 0.99 }
    ]},
    { ...generateRandomLocation(rosenthalLibraryLocation.lat, rosenthalLibraryLocation.lng, radiusInMiles), storeName: "Chipotle", category: "Food", items: [
        { itemName: 'Steak Bowl', quantity: 1, price: 13.75 },
        { itemName: 'Chips', quantity: 1, price: 1.99 }
    ]},
    { ...generateRandomLocation(rosenthalLibraryLocation.lat, rosenthalLibraryLocation.lng, radiusInMiles), storeName: "Starbucks", category: "Food", items: [
        { itemName: 'Small Iced Coffee', quantity: 1, price: 10.00 },
        { itemName: 'Muffin', quantity: 1, price: 3.49 }
    ]},
    { ...generateRandomLocation(rosenthalLibraryLocation.lat, rosenthalLibraryLocation.lng, radiusInMiles), storeName: "Barnes & Noble", category: "Entertainment", items: [
        { itemName: 'Book', quantity: 1, price: 20.00 },
        { itemName: 'Magazine', quantity: 1, price: 5.99 }
    ]},
    { ...generateRandomLocation(rosenthalLibraryLocation.lat, rosenthalLibraryLocation.lng, radiusInMiles), storeName: "Verizon", category: "Electronics", items: [
        { itemName: 'Phone Case', quantity: 1, price: 19.99 },
        { itemName: 'Charger', quantity: 1, price: 14.99 }
    ]},
    { ...generateRandomLocation(rosenthalLibraryLocation.lat, rosenthalLibraryLocation.lng, radiusInMiles), storeName: "Jio", category: "Misc", items: [
        { itemName: 'Prepaid Recharge', quantity: 1, price: 34.99 }
    ]},
    { ...generateRandomLocation(rosenthalLibraryLocation.lat, rosenthalLibraryLocation.lng, radiusInMiles), storeName: "Chicken Italiano", category: "Food", items: [
        { itemName: 'Tandoor Paneer Pizza', quantity: 1, price: 50.00 }
    ]}
];

const userLocation = { lat: 40.7365, lng: -73.8205 };

const getRandomDate = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const createMockTransaction = async (userId: string) => {
    const startDate = new Date('2025-02-06');
    const endDate = new Date('2025-03-08');

    for (const store of storeLocations) {
        await addDoc(collection(db, 'transactions'), {
            userId,
            amount: store.items.reduce((total: number, item) => total + item.price, 0),
            currency: 'USD',
            storeName: store.storeName,
            storeLocation: new GeoPoint(store.lat, store.lng),
            userLocation: new GeoPoint(userLocation.lat, userLocation.lng),
            items: store.items,
            category: store.category,
            createdAt: getRandomDate(startDate, endDate),
        });
    }
    console.log("Mock transactions created successfully!");
};