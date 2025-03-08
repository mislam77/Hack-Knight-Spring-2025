import { Chart } from "./chart"
import { SpendingPie } from "./spending-pie"

export const DataCharts = () => {
    const transactions = [
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
    
    // Format data for charts
    const data = {
        // For Chart component - spending by day
        days: transactions.map(transaction => ({
            date: transaction.timestamp.toLocaleDateString(),
            amount: transaction.totalAmount
        })),
        
        // For SpendingPie component - spending by category
        categories: transactions.flatMap(transaction => 
            transaction.items.map(item => ({
                name: item.itemName,
                value: item.price * item.quantity
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
    };

    return ( 
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                <Chart data={data.days} />
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                <SpendingPie data={data.categories} />
            </div>
        </div>
    );
}