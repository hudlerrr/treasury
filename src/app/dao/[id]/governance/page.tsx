import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { api } from "@/trpc/server";
import { daos } from "@/server/db/daos";
import { TokenHolders } from "@/components/charts/token-holders"
import { HoldersDonut } from "@/components/charts/holders-donut"
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

type Props = {
  params: {
    id: string;
  };
};

export default async function GovernancePage({ params: { id } }: Props) {
  const proposals = await api.proposals.getProposals({ space: id });

  const dao = daos.find((dao) => dao.id === id);
  if (!dao) {
    return <div>DAO not found</div>;
  }

  return (
    <div className="flex flex-col gap-2 px-4">
      <div className="mb-4 text-sm text-muted-foreground">
        This dashboard tracks the patterns of voting power within <strong>{dao.name}</strong>, giving a broad view of the entire DAO, also focusing in on the distribution of voting power of the top 50 delegates. It also examines the overall on-chain behaviour of <strong>{dao.name}</strong> delegators and assesses which areas of the chain they are active in.
      </div>
      <div className="flex flex-row">
        <div className="flex-1">
          {proposals?.map((proposal) => (
            <Card key={proposal.id}>
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <h2 className="mb-2 text-lg font-semibold">{proposal?.title}</h2>
                  <span>{proposal?.state}</span>
                </div>
                <p className="mb-2 text-sm text-muted-foreground">
                  {proposal?.body.slice(0, 100)}...
                </p>
                <div className="flex items-center justify-between"> 
                  <span className="text-sm font-medium">Votes: {proposal?.snapshot} {Math.floor(Math.random() * (400 - 200 + 1)) + 200}</span>
                  <Button variant="ghost" size="sm">
                    View: <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex-none w-1/3 ml-4">
          <HoldersDonut />
          <TokenHolders />
        </div>
      </div>
    </div>
  );
}