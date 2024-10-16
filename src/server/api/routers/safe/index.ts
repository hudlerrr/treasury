import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { safe } from "@/ky";

export const contractRouter = createTRPCRouter({
  getContracts: publicProcedure.query(async ({}) => {
    const contracts = await safe("contracts").json();

    return contracts;
  }),

  getContract: publicProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const contract = await safe(`contracts/${input.address}`).json();

      return contract;
    }),
});
