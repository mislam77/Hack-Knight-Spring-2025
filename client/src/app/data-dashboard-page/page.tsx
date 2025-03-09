import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";

import React from "react";

export default function DashboardPage() {
  return (
    <div className="max-w-[1200px] mx-auto w-full pb-10 -mt-24">
      <h1 className="text-2xl font-bold mb-6 text-white">Spending Dashboard</h1>
      <DataGrid />
      <DataCharts />
    </div>
  );
}
