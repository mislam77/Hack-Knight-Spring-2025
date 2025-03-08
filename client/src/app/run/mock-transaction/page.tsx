"use client";

import { useEffect } from 'react';
import { createMockTransaction } from '../../../../firebase/mockTransactionsScript';

const RunMockTransactions = () => {
  useEffect(() => {
    const runScript = async () => {
      try {
        await createMockTransaction('user id');
        console.log('Mock transactions created successfully!');
      } catch (error) {
        console.error('Error creating mock transactions:', error);
      }
    };

    runScript();
  }, []);

  return (
    <div>
      <h1>Running Mock Transactions Script</h1>
      <p>Check the console for the script output.</p>
    </div>
  );
};

export default RunMockTransactions;