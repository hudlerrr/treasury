"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AssetDonut } from "@/components/charts/asset-donut";
import { TreasuryChart } from "@/components/charts/treasury-chart";

const TabbedInterface = ({ balanceResponse, transactionsResponse }: any) => {
  const [activeTab, setActiveTab] = useState("assets");

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex space-x-4">
        <button
          className={`rounded px-4 py-2 ${activeTab === "assets" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("assets")}
        >
          Treasury Assets
        </button>
        <button
          className={`rounded px-4 py-2 ${activeTab === "transactions" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("transactions")}
        >
          Transactions
        </button>
      </div>

      {activeTab === "assets" ? (
        <div className="space-y-4">
          <h2 className="font-semibold">
            {" "}
            ${balanceResponse.totalBalanceUsd}{" "}
          </h2>
          <div className="grid gap-4">
            {balanceResponse.balances.map((asset: any) => (
              <Card key={asset.tokenSymbol} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <img src={asset.logoUri} alt="token logo" />
                    </div>
                    <div>
                      <div className="font-medium">{asset.tokenName}</div>
                      <div className="text-sm text-muted-foreground">
                        {asset.balanceInTokens} {asset.tokenSymbol}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${asset.balanceUsd}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="font-semibold">TRANSACTIONS</h2>
          <div className="grid gap-4">
            {transactionsResponse.map((transaction: any) => (
              <Card key={transaction.hash} className="p-4">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">{transaction.tokenSymbol}</div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.timeAgo}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${transaction.value}</div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.type}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TabbedInterface;
