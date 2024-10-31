"use client";

import { useState } from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Hypothetical financial data (in thousands of USD)
const financialData = [
  { month: "Jan", revenue: 100, expenses: 80 },
  { month: "Feb", revenue: 120, expenses: 90 },
  { month: "Mar", revenue: 140, expenses: 95 },
  { month: "Apr", revenue: 160, expenses: 100 },
  { month: "May", revenue: 180, expenses: 110 },
  { month: "Jun", revenue: 200, expenses: 120 },
];

export function FinancialDashboard() {
  const [currentCash, setCurrentCash] = useState(500); // Initial cash reserve in thousands of USD

  // Calculate average monthly burn rate
  const averageBurnRate =
    financialData.reduce(
      (acc, month) => acc + (month.expenses - month.revenue),
      0,
    ) / financialData.length;

  // Calculate runway in months
  const runwayMonths = Math.max(
    0,
    Math.floor(currentCash / Math.abs(averageBurnRate)),
  );

  return (
    <div className="flex flex-col items-center space-y-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-lg">Financial Runway</CardTitle>
          <CardDescription className="text-sm">
            Based on current cash reserves and average burn rate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{runwayMonths} months</div>
          <p className="mt-1 text-sm text-muted-foreground">
            With a current cash reserve of ${currentCash.toLocaleString()}{" "}
            thousand and an average monthly burn rate of $
            {Math.abs(averageBurnRate).toFixed(2)} thousand.
          </p>
        </CardContent>
      </Card>
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-lg">Revenue and Expenses Chart</CardTitle>
          <CardDescription className="text-sm">
            Monthly financial overview (in thousands USD)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-1))",
              },
              expenses: {
                label: "Expenses",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={financialData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  name="Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="var(--color-expenses)"
                  name="Expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
