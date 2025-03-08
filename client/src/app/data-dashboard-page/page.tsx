import { DataCharts } from '@/components/data-charts';
import { DataGrid } from '@/components/data-grid';
import { Filters } from '@/components/filters';
import React from 'react';

export default function DashboardPage() {
    return(
      <div className="max-w-screen-2xl mx-auto w-full p-6 pb-10">
        <h1 className="text-2xl font-bold mb-6">Spending Dashboard</h1>
        <Filters />
        <DataGrid />
        <DataCharts />
      </div>
    )
}
