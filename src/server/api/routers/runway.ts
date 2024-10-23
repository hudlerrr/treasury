import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { createCaller } from "@/server/api/root";

export const runwayRouter = createTRPCRouter({
  getRunway: publicProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const runwayCalculation = await calculateRunway(input.address, ctx);
      return runwayCalculation;
    }),
});

async function calculateRunway(address: string, ctx: any) {
  const caller = createCaller(ctx);

  // Fetch total balance from SafeBalance endpoint
  const balanceResult = await caller.safe.getBalance({ address });
  const totalBalance = parseFloat(balanceResult.totalBalanceUsd);

  // Fetch transaction summary to calculate average monthly spending
  const summaryResult = await caller.transactionSummary.getSummary({
    address,
    dateRange: "month", // Get the last month's transactions
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    endDate: new Date(),
  });

  const totalSpent = Object.values(summaryResult.summary.outflows).reduce(
    (acc, token) => {
      return acc + (token.totalValue || 0);
    },
    0,
  );

  const averageMonthlySpend = totalSpent; // todo: enhance to get average spend instead of just last month

  // Calculate runway
  const runwayMonths =
    averageMonthlySpend > 0 ? totalBalance / averageMonthlySpend : Infinity; // Avoid division by zero
  const runwayYears = Math.floor(runwayMonths / 12);
  const remainingMonths = Math.round(runwayMonths % 12);
  const runway = `${runwayYears} years and ${remainingMonths} months`;

  return {
    runway,
    totalBalance,
    averageMonthlySpend,
  };
}
