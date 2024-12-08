import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { daos } from "@/server/db/daos";

export const daoRouter = createTRPCRouter({ //todo: replace with db
  list: publicProcedure.query(({ ctx }) => {
    return daos;
  }),
});
