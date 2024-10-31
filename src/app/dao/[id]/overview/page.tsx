import { daos } from "@/server/db/daos";
import { Card } from "@/components/ui/card";
import { api } from "@/trpc/server";
import TabbedInterface from "@/components/overview-tab";
import { TreasuryChart } from "@/components/charts/treasury-chart";
import { AssetDonut } from "@/components/charts/asset-donut";

type Props = {
  params: {
    id: string;
  };
};

export default async function OverviewPage({ params: { id } }: Props) {
  const response = await api.daoBase.getInfo({ id });
  const address = response?.[0]?.treasuries?.[0]?.address ?? null;

  if (!address) {
    return <div>DAO not found</div>;
  }

  const balanceResponse = await api.safe.getBalance({ address });
  const transactionsResponse = await api.etherscan.getTransactions({
    address,
    page: 1,
    // limit: 10,
  });

  const dao = daos.find((dao) => dao.id === id);
  if (!dao) {
    return <div>DAO not found</div>;
  }

  const overview = dao.overview;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="mb-3 text-xl font-semibold">Overview</h2>
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

      <div className="flex space-x-4">
        <div className="flex-1 space-y-4">
          <TabbedInterface
            balanceResponse={balanceResponse}
            transactionsResponse={transactionsResponse}
          />
        </div>
        <div className="flex-1 space-y-4">
          <div className="mb-4 flex justify-between">
            <div>
              <h2 className="font-semibold">INFLOW / OUTFLOW</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">Inflow:</div>
              <div className="font-medium">$0</div>
              <div className="text-sm text-muted-foreground">Outflow:</div>
              <div className="font-medium">$0</div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="chart-container h-40">
              <TreasuryChart />
            </div>
            <div className="chart-container h-40">
              <AssetDonut />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
