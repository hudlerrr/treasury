import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { etherscanTxRouter } from "./etherscanTx";

export const transactionSummaryRouter = createTRPCRouter({
  getSummary: publicProcedure
    .input(z.object({
      address: z.string(),
      dateRange: z.enum(['week', 'month', 'year', 'custom']),
      startDate: z.date().optional(),
      endDate: z.date().optional()
    }))
    .query(async ({ input, ctx }) => {
      const now = new Date();
      let startDate: Date;
      let endDate = now;

      switch (input.dateRange) {
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          break;
        case 'year':
          startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
          break;
        case 'custom':
          if (!input.startDate || !input.endDate) {
            throw new Error('Custom date range requires both start and end dates');
          }
          startDate = input.startDate;
          endDate = input.endDate;
          break;
      }

      const transactions = await etherscanTxRouter.createCaller(ctx).getTransactions({
        address: input.address,
        startDate,
        endDate,
        page: 1,
        offset: 10000 // Adjust as needed
      });

      const summary = transactions.reduce((acc, tx) => {
        const category = tx.type === 'Received' ? 'inflows' : 'outflows';
        if (!acc[category][tx.tokenSymbol]) {
          acc[category][tx.tokenSymbol] = 0;
        }
        acc[category][tx.tokenSymbol] += tx.value;
        return acc;
      }, { inflows: {}, outflows: {} });

      return {
        summary,
        dateRange: {
          start: startDate,
          end: endDate
        }
      };
    }),
});

