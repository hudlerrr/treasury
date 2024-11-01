import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TreasuryChart } from "@/components/charts/treasury-chart";
import { CashFlowChart } from "@/components/charts/cashflow";
import { ExpensesPie } from "@/components/charts/expenses-donut";
import { AssetDonut } from "@/components/charts/asset-donut";
import { VolatilityChart } from "@/components/charts/token-volatility";

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-2">Analytics</h2>
      <div className="mb-4 text-sm text-muted-foreground">Gain insights into your DAO’s financial health with our comprehensive analytics. Track performance, monitor asset allocation, and evaluate risk metrics—all in one place</div>
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
          <TabsTrigger value="risk">Risk Metrics</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <TreasuryChart />
            <CashFlowChart />
            <ExpensesPie />
            <VolatilityChart />
          </div>
        </TabsContent>
        <TabsContent value="allocation" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <AssetDonut />
            <Card>
              <CardHeader>
                <CardTitle>Diversification Over Time</CardTitle>
                <CardDescription>Historical changes in asset type distribution</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <DiversificationChart /> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Risk Exposure by Asset</CardTitle>
                <CardDescription>Risk level of each asset based on volatility or liquidity</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <RiskExposureChart /> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Allocation vs. Target Distribution</CardTitle>
                <CardDescription>Current allocation compared to predefined target allocation</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <AllocationTargetChart /> */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="risk" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Risk-Adjusted Return (Sharpe Ratio)</CardTitle>
                <CardDescription>Risk-adjusted returns for each asset in the treasury</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <SharpeRatioChart /> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Liquidity Analysis</CardTitle>
                <CardDescription>Proportion of liquid vs. locked assets in the treasury</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <LiquidityChart /> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Value-at-Risk (VaR)</CardTitle>
                <CardDescription>Estimated potential loss in treasury value</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <VaRMetric /> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Correlation with Major Cryptos</CardTitle>
                <CardDescription>Correlation between treasury assets and major market indicators</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <CorrelationHeatmap /> */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}