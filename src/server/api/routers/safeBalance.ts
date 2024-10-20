import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import axios from "axios";
import { env } from "@/env.js";

export const safeBalanceRouter = createTRPCRouter({
  getBalance: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(async ({ input }) => {
      const baseUrl = "https://safe-client.safe.global/v1/chains/1/safes";
      const endpoint = `${baseUrl}/${input.address}/balances/usd?trusted=true`;
      try {
        const response = await axios.get(endpoint);
        const data = response.data;

        return processSafeBalance(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("here: ", endpoint);
          throw new Error(`Error fetching data from Safe API: ${error.message}`);
        }
        throw new Error("An unexpected error occurred");
      }
    }),
});

function processSafeBalance(data: any): any {
  const totalUsdBalance = parseFloat(data.fiatTotal);
  
  const processedBalances = data.items.map((item: any) => {
    const balanceUsd = parseFloat(item.fiatBalance);
    const percentage = (balanceUsd / totalUsdBalance) * 100;
    
    return {
      tokenAddress: item.tokenInfo.address,
      tokenSymbol: item.tokenInfo.symbol,
      tokenName: item.tokenInfo.name,
      balance: item.balance,
      balanceInTokens: (Number(item.balance) / Math.pow(10, item.tokenInfo.decimals)).toFixed(2),
      balanceUsd: balanceUsd.toFixed(2),
      percentage: percentage.toFixed(2),
      logoUri: item.tokenInfo.logoUri
    };
  });

  return {
    message: "Data received from Safe API",
    balances: processedBalances,
    totalBalanceUsd: totalUsdBalance.toFixed(2)
  };
}
