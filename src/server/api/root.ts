import { postRouter } from "./routers/post";
import { createCallerFactory, createTRPCRouter } from "./trpc";
import { walletBalanceRouter } from "./routers/treasury/walletBalance";
import { transactionsRouter } from "./routers/treasury/transactions";
import { transactionSummaryRouter } from "./routers/treasury/transactionSummary";
import { runwayRouter } from "./routers/treasury/runway";
import { proposalRouter } from "./routers/governance/proposals";
import { daoRouter } from "./routers/dao/dao";
import { daoDetailsRouter } from "./routers/dao/daoDetails";

export const appRouter = createTRPCRouter({
  post: postRouter,
  // treasury
  walletBalance: walletBalanceRouter,
  transactions: transactionsRouter,
  transactionSummary: transactionSummaryRouter,
  runway: runwayRouter,
  // governance
  proposals: proposalRouter,
  // dao details
  dao: daoRouter,
  daoDetails: daoDetailsRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
