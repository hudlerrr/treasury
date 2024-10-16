import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { safe } from "@/ky";

export const contractRouter = createTRPCRouter({
  getContracts: publicProcedure.query(async ({ ctx }) => {
    const contracts = await safe("contracts").json();

    return contracts;
  }),

  getContract: publicProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const contract = await safe(`contracts/${input.address}`).json();

      return contract;
    }),
});
