import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function ScenarioPlanningPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Scenario Planning</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation Simulator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>ETH Allocation</Label>
                <Slider defaultValue={[40]} max={100} step={1} />
                <div className="text-sm text-muted-foreground">40%</div>
              </div>
              <div className="space-y-2">
                <Label>Expected Return</Label>
                <Input type="number" placeholder="10%" />
              </div>
              <Button className="w-full">Calculate Risk</Button>
            </div>
          </CardContent>
        </Card>
        {/* Additional simulation tools... */}
      </div>
    </div>
  )
}