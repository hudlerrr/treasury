import { postRouter } from "./routers/post";
import { createCallerFactory, createTRPCRouter } from "./trpc";
import { safeBalanceRouter } from "./routers/safeBalance";
import { etherscanTxRouter } from "./routers/etherscanTx";
import { transactionSummaryRouter } from "./routers/transactionSummary";
import { runwayRouter } from "./routers/runway";
import { proposalRouter } from "./routers/proposals";
import { daoRouter } from "./routers/dao";

export const appRouter = createTRPCRouter({
  post: postRouter,
  safe: safeBalanceRouter,
  etherscan: etherscanTxRouter,
  transactionSummary: transactionSummaryRouter,
  runway: runwayRouter,
  proposals: proposalRouter,
  dao: daoRouter,
});

export type AppRouter = typeof appRouter;

//  * Create a server-side caller for the tRPC API.
//  * @example
//  const trpc = createCaller(createContext);
//  const res = await trpc.post.all();
// ^? Post[]

export const createCaller = createCallerFactory(appRouter);
