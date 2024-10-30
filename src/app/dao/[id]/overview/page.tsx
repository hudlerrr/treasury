import { daos } from "@/server/db/daos";
import { Card } from "@/components/ui/card";

type Props = {
  params: {
    id: string;
  };
};

export default function OverviewPage({ params: { id } }: Props) {
  // Find the DAO by ID
  const dao = daos.find((dao) => dao.id === id);

  if (!dao) {
    return <div>DAO not found</div>;
  }

  const overview = dao.overview;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Overview</h2>
        <ul className="text-muted-foreground">
          {overview && (
            <>
              <li className="text-sm">{overview.mission}</li>
              <li className="text-sm">{overview.community}</li>
              <li className="text-sm">{overview.achievements}</li>
              <li className="text-sm">{overview.funding}</li>
            </>
          )}
        </ul>
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
  );
}