import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ScenarioPlanningPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Simulation</h2>
      <div className="mb-4 text-sm text-muted-foreground"> 
        Experiment with treasury strategies and visualize potential outcomes to make data-driven decisions for your DAO’s future.
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation Simulator</CardTitle>
            <p className="text-sm text-muted-foreground">Optimize portfolio allocation and assess risk</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="eth-allocation">ETH Allocation</Label>
                <Slider id="eth-allocation" defaultValue={[40]} max={100} step={1} />
                <div className="text-sm text-muted-foreground">40%</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expected-return">Expected Return</Label>
                <Input id="expected-return" type="number" placeholder="10%" />
              </div>
              <Button className="w-full">Calculate Risk</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Treasury Runway Simulator</CardTitle>
            <p className="text-sm text-muted-foreground">Project treasury longevity based on spending and market conditions</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monthly-spending">Monthly Spending</Label>
                <Input id="monthly-spending" type="number" placeholder="$100,000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="token-price-fluctuation">Token Price Fluctuation (%)</Label>
                <Input id="token-price-fluctuation" type="number" placeholder="5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reserve-growth-rate">Reserve Growth Rate (%)</Label>
                <Input id="reserve-growth-rate" type="number" placeholder="2" />
              </div>
              <Button className="w-full">Calculate Runway</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Volatility Impact Simulator</CardTitle>
            <p className="text-sm text-muted-foreground">Assess effects of market volatility on treasury reserves</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token-volatility">Token Volatility Level (%)</Label>
                <Input id="token-volatility" type="number" placeholder="20" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eth-price-fluctuation">ETH Price Fluctuation (%)</Label>
                <Input id="eth-price-fluctuation" type="number" placeholder="15" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="btc-price-fluctuation">BTC Price Fluctuation (%)</Label>
                <Input id="btc-price-fluctuation" type="number" placeholder="10" />
              </div>
              <Button className="w-full">Simulate Volatility Impact</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Funding Scenarios Simulator</CardTitle>
            <p className="text-sm text-muted-foreground">Model impact of various funding strategies on treasury growth</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="funding-amount">Funding Amount</Label>
                <Input id="funding-amount" type="number" placeholder="$1,000,000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="funding-frequency">Frequency</Label>
                <Select>
                  <SelectTrigger id="funding-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="asset-allocation">Asset Allocation for Funds Received</Label>
                <Input id="asset-allocation" type="text" placeholder="ETH: 40%, USDC: 40%, Other: 20%" />
              </div>
              <Button className="w-full">Project Funding Impact</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Token Burn Rate Adjustment</CardTitle>
            <p className="text-sm text-muted-foreground">Analyze effects of token burn rates on treasury and token economics</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="burn-rate">Burn Rate (%)</Label>
                <Input id="burn-rate" type="number" placeholder="2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="token-price">Token Price</Label>
                <Input id="token-price" type="number" placeholder="$10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="token-supply">Token Supply</Label>
                <Input id="token-supply" type="number" placeholder="1,000,000" />
              </div>
              <Button className="w-full">Calculate Burn Rate Impact</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operating Expense Variability</CardTitle>
            <p className="text-sm text-muted-foreground">Test impact of expense changes on financial health</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expense-category">Expense Category</Label>
                <Select>
                  <SelectTrigger id="expense-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="development">Developer Salaries</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expense-adjustment">Adjustment Amount (%)</Label>
                <Input id="expense-adjustment" type="number" placeholder="10" />
              </div>
              <Button className="w-full">Simulate Expense Impact</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}