import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import ky from "ky";
import { env } from "@/env.js";

const ProposalInputSchema = z.object({
  space: z.string(),
  first: z.number().default(10),
  skip: z.number().default(0),
});

const ProposalSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  choices: z.array(z.string()),
  start: z.number(),
  end: z.number(),
  snapshot: z.string(),
  state: z.string(),
  author: z.string(),
  space: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

const ProposalsResponseSchema = z.object({
  data: z.object({
    proposals: z.array(ProposalSchema),
  }),
});

type ProposalInput = z.infer<typeof ProposalInputSchema>;
type Proposal = z.infer<typeof ProposalSchema>;
type ProposalsResponse = z.infer<typeof ProposalsResponseSchema>;

export const proposalRouter = createTRPCRouter({
  getProposals: publicProcedure
    .input(ProposalInputSchema)
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
        const response = await ky
          .post("https://hub.snapshot.org/graphql", {
            json: { query },
            headers: {
              "Content-Type": "application/json",
            },
          })
          .json<ProposalsResponse>();

        const parsedResponse = ProposalsResponseSchema.parse(response);

        return parsedResponse.data.proposals;
      } catch (error) {
        console.error("Error fetching proposals:", error);
        throw new Error("An error occurred while fetching proposals");
      }
    }),
});
