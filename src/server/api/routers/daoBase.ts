import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import axios from "axios";

export const daoBaseRouter = createTRPCRouter({
  getInfo: publicProcedure
    .input(z.object({
      first: z.number().default(20),
      skip: z.number().default(0),
      orderBy: z.string(),
      id: z.string(),
    }))
    .query(async ({ input }) => {
      const { first, skip, orderBy, orderDirection, id } = input;

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
      // console.log("hudz: " + query);

      try {
        const response = await axios.post('https://hub.snapshot.org/graphql', { query }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("yey2! " + JSON.stringify(response.data.data.spaces));
        return response.data.data.spaces;
      } catch (error) {
        console.error('Error fetching spaces:', error);
        // throw new Error('An error occurred while fetching spaces');
      }
    }),
});

