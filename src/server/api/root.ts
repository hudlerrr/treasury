import { postRouter } from "./routers/post";
import { createCallerFactory, createTRPCRouter } from "./trpc";
import { walletBalanceRouter } from "./routers/walletBalance";
import { transactionsRouter } from "./routers/transactions";
import { transactionSummaryRouter } from "./routers/transactionSummary";
import { runwayRouter } from "./routers/runway";
import { proposalRouter } from "./routers/proposals";
import { daoRouter } from "./routers/dao/dao";
import { daoDetailsRouter } from "./routers/dao/daoDetails";

export const appRouter = createTRPCRouter({
  post: postRouter,
  walletBalance: walletBalanceRouter,
  transactions: transactionsRouter,
  transactionSummary: transactionSummaryRouter,
  runway: runwayRouter,
  proposals: proposalRouter,
  dao: daoRouter,
  daoDetails: daoDetailsRouter,
});

export type AppRouter = typeof appRouter;

//  * Create a server-side caller for the tRPC API.
//  * @example
//  const trpc = createCaller(createContext);
//  const res = await trpc.post.all();
// ^? Post[]

export const createCaller = createCallerFactory(appRouter);
