import { Card } from "@/components/ui/card"

type Props = {
  params: {
    id: string;
  };
};

export default function OverviewPage({ params: { id } }: Props) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Overview</h2>
        <p className="text-muted-foreground">
          TreasuryDAO manages a diverse portfolio of digital assets with a focus on maintaining 
          stable reserves while pursuing strategic investments in DeFi protocols. Our treasury 
          operations are governed by community proposals and managed by elected stewards.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold">TREASURY ASSETS</h2>
        <div className="grid gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  ETH
                </div>
                <div>
                  <div className="font-medium">Ethereum</div>
                  <div className="text-sm text-muted-foreground">458.24 ETH</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">$825,832</div>
                <div className="text-sm text-green-500">+2.4%</div>
              </div>
            </div>
          </Card>
          {/* Additional asset cards... */}
        </div>
      </div>
      <p>ID: {id}</p>
    </div>
  )
}