import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import axios from "axios";
import { env } from "@/env.js";
import { BASE_URLS } from '../../apiConstants';

/*
router for fetching proposals from the Snapshot API.
*/
export const proposalRouter = createTRPCRouter({
  getProposals: publicProcedure
    .input(z.object({
      space: z.string(),
      first: z.number().default(10),
      skip: z.number().default(0),
    }))
    .query(async ({ input }) => {
      const { space, first, skip } = input;

      const query = `
        query {
          proposals(
            first: ${first},
            skip: ${skip},
            where: { space_in: ["${space}"] }
          ) {
            id
            title
            body
            choices
            start
            end
            snapshot
            state
            author
            space {
              id
              name
            }
          }
        }
      `;

      try {
        const response = await axios.post(BASE_URLS.SNAPSHOT, { query }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        return response.data.data.proposals;
      } catch (error) {
        console.error('Error fetching proposals:', error);
        throw new Error('An error occurred while fetching proposals');
      }
    }),
});

