import { daos } from "@/server/db/daos";
import { Card } from "@/components/ui/card";
import { api } from "@/trpc/server";
import TabbedInterface from "@/components/overview-tab";
import { TreasuryChart } from "@/components/charts/treasury-chart";
import { AssetDonut } from "@/components/charts/asset-donut";
import { FinancialDashboard } from "@/components/financial-dashboard";
import { useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

export default async function OverviewPage({ params: { id } }: Props) {
  const response = await api.daoBase.getInfo({ id });
  const address = response[0].treasuries[0].address;

  const balanceResponse = await api.safe.getBalance({ address });
  const transactionsResponse = await api.etherscan.getTransactions({
    address,
    page: 1,
    limit: 10,
  });

  const dao = daos.find((dao) => dao.id === id);
  if (!dao) {
    return <div>DAO not found</div>;
  }

  const overview = dao.overview;

  // Fetch inflow/outflow data
  const cashFlowSummary = await api.transactionSummary.getSummary({
    address,
    dateRange: "month", // Default to month
  });

  const inflow = cashFlowSummary.summary.inflows.totalValue;
  const outflow = cashFlowSummary.summary.outflows.totalValue;

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

      <div className="flex space-x-4">
        <div className="space-y-4 flex-1">
          <TabbedInterface balanceResponse={balanceResponse} transactionsResponse={transactionsResponse} />
        </div>
        <div className="space-y-4 flex-1">
          <div className="flex flex-col items-center mb-4">
            <h2 className="font-semibold">Over the past month, your cash flow has been:</h2>
            <div className="flex flex-col items-center">
              <div className="text-sm text-muted-foreground">Inflow: ${inflow.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Outflow: ${outflow.toLocaleString()}</div>
            </div>
          </div>
          <FinancialDashboard/>
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <TreasuryChart />
            </div>
            <div className="space-y-2">
              <AssetDonut />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}