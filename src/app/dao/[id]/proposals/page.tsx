import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/server";
import { ArrowUpRight } from "lucide-react";

type Props = {
  params: {
    id: string;
  };
};

export default async function Proposals({ params: { id } }: Props) {
  const proposals = await api.proposals.getProposals({ space: id });
  return (
    <div className="flex flex-col gap-2 px-4">
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
              <span className="text-sm font-medium">Votes: 352</span>
              <Button variant="ghost" size="sm">
                View <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
