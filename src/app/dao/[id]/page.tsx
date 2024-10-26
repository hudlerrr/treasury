import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

type Props = {
  params: {
    id: string;
  };
};

export default async function Overview({ params: { id } }: Props) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-6 lg:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <h2 className="mb-2 text-lg font-semibold">Latest Proposal</h2>
            <p className="mb-2 text-sm text-muted-foreground">
              Increase funding for developer grants
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Votes: 352</span>
              <Button variant="ghost" size="sm">
                View <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="mb-2 text-lg font-semibold">Treasury Balance</h2>
            <p className="text-2xl font-bold">8,500 ETH</p>
            <p className="text-sm text-muted-foreground">≈ $15,300,000 USD</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="mb-2 text-lg font-semibold">Recent Transaction</h2>
            <p className="mb-2 text-sm text-muted-foreground">
              Sent 50 ETH to Development Fund
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">10 minutes ago</span>
              <Button variant="ghost" size="sm">
                Details <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
