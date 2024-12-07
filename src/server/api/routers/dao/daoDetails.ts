import { z } from "zod";
import ky from "ky";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { BASE_URLS } from '../../../apiConstants';

const TreasurySchema = z.object({
  name: z.string(),
  address: z.string(),
  network: z.string(),
});

const FiltersSchema = z.object({
  minScore: z.number(),
  onlyMembers: z.boolean(),
});

const SpaceItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  about: z.string(),
  network: z.string(),
  followersCount: z.number(),
  symbol: z.string(),
  avatar: z.string().nullable(),
  coingecko: z.string().nullable(),
  categories: z.array(z.string()).nullable(),
  guidelines: z.string().nullable(),
  treasuries: z.array(TreasurySchema),
  filters: FiltersSchema,
});

const SpacesResponseSchema = z.object({
  data: z.object({
    spaces: z.array(SpaceItemSchema),
  }),
});

export const daoDetailsRouter = createTRPCRouter({
  getInfo: publicProcedure
    .input(
      z.object({
        first: z.number().default(20),
        skip: z.number().default(0),
        orderBy: z.string().default("created"),
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { first, skip, orderBy, id } = input;

      const query = `
        query {
          spaces(
            first: ${first},
            skip: ${skip},
            orderBy: "${orderBy}",
            where: { id_in: ["${id}"] }
          ) {
            id
            name
            about
            network
            followersCount
            symbol
            avatar
            coingecko
            categories
            guidelines
            treasuries {
              name
              address
              network
            }
            filters {
              minScore
              onlyMembers
            }
          }
        }
      `;

      try {
        const response = await ky
          .post(BASE_URLS.SNAPSHOT, {
            json: { query },
          })
          .json();

        const parsedResponse = SpacesResponseSchema.parse(response);

        return parsedResponse.data.spaces;
      } catch (error) {
        console.error("Error fetching spaces:", error);
        throw new Error("An error occurred while fetching spaces");
      }
    }),
});
