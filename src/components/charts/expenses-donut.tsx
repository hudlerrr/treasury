"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

export const description = "Breakdown of DAO expenses"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Grants",
  },
  chrome: {
    label: "Investments",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Donations",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Operations",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Development",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Marketing",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function ExpensesPie() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expenses</CardTitle>
        <CardDescription>Largest expense categories</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="visitors" />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
