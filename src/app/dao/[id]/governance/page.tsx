import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type Props = {
  params: {
    id: string;
  };
};

export default function GovernancePage({ params: { id } }: Props) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Active Proposals</h2>
      <p>ID: {id}</p>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Treasury Rebalancing Proposal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Proposal to rebalance treasury assets to maintain 40% ETH, 40% stablecoins, and 20% governance tokens.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Votes For</span>
                  <span>65%</span>
                </div>
                <Progress value={65} />
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Additional proposal cards... */}
      </div>
    </div>
  )
}