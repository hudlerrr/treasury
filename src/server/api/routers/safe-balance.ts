import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import axios from "axios";

export const safeBalanceRouter = createTRPCRouter({
  getBalance: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(async ({ input }) => {
      const baseUrl = "https://safe-transaction.mainnet.gnosis.io/api/v1";
      const endpoint = `${baseUrl}/safes/${input.address}/balances/`;

      try {
        const response = await axios.get(endpoint);
        const data = response.data;

        return processSafeBalance(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`Error fetching data from Gnosis Safe API: ${error.message}`);
        }
        throw new Error("An unexpected error occurred");
      }
    }),
});

function processSafeBalance(data: any): any {
  // Process the balance data
  const processedBalances = data.map((item: any) => ({
    token: item.token.symbol,
    balance: item.balance,
    balanceUsd: item.balanceUsd
  }));

  return {
    message: "Data received from Gnosis Safe API",
    balances: processedBalances,
    totalBalanceUsd: processedBalances.reduce((total: number, item: any) => total + parseFloat(item.balanceUsd), 0)
  };
}
