import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import axios from "axios";
import ky from "ky";
import { env } from "@/env.js";
import { BASE_URLS } from '../../apiConstants';

/*
router for fetching list of transactions from the Etherscan API.
*/
const EtherscanInputSchema = z.object({
  address: z.string(),
  page: z.number().default(1),
  offset: z.number().default(10),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

const TransactionSchema = z.object({
  timeStamp: z.string(),
  value: z.string(),
  tokenSymbol: z.string(),
  tokenDecimal: z.string(),
  to: z.string(),
  hash: z.string(),
});

const EtherscanResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  result: z.array(TransactionSchema),
});

type EtherscanInput = z.infer<typeof EtherscanInputSchema>;
type Transaction = z.infer<typeof TransactionSchema>;
type EtherscanResponse = z.infer<typeof EtherscanResponseSchema>;

export const transactionsRouter = createTRPCRouter({
  getTransactions: publicProcedure
    .input(EtherscanInputSchema)
    .query(async ({ input }) => {
      return getEtherscanTx(input);
    }),
});

async function getEtherscanTx({
  address,
  page,
  offset,
  startDate,
  endDate,
}: EtherscanInput) {
  const endpoint = `${BASE_URLS.ETHERSCAN}?module=account&action=tokentx&address=${address}&page=${page}&offset=${offset}&sort=desc&apikey=${env.ETHERSCAN_API_KEY}`;

  try {
    const response = await ky.get(endpoint).json<EtherscanResponse>();

    const parsedResponse = EtherscanResponseSchema.parse(response);

    if (parsedResponse.status !== "1") {
      throw new Error(`Etherscan API error: ${parsedResponse.message}`);
    }

    return processEtherscanTx(
      parsedResponse.result,
      address,
      startDate,
      endDate,
    );
  } catch (error) {
    console.error("Error fetching transactions from Etherscan:", error);
    throw new Error(
      "An error occurred while fetching transactions from Etherscan",
    );
  }
}

// Process transactions with proper type annotations
function processEtherscanTx(
  data: Transaction[],
  inputAddress: string,
  startDate?: Date,
  endDate?: Date,
): Array<{
  value: number;
  tokenSymbol: string;
  type: "Received" | "Sent";
  timeAgo: string;
  hash: string;
}> {
  const currentTime = Math.floor(Date.now() / 1000);

  return data
    .filter((tx: Transaction) => {
      const txDate = new Date(Number(tx.timeStamp) * 1000);
      return (
        (!startDate || txDate >= startDate) && (!endDate || txDate <= endDate)
      );
    })
    .map((tx: Transaction) => {
      const value = Number(tx.value) / Math.pow(10, Number(tx.tokenDecimal));
      const timeDiff = currentTime - Number(tx.timeStamp);
      let timeAgo;

      if (timeDiff < 7 * 24 * 60 * 60) {
        timeAgo = `${Math.floor(timeDiff / (24 * 60 * 60))} days ago`;
      } else {
        timeAgo = `${Math.floor(timeDiff / (7 * 24 * 60 * 60))} weeks ago`;
      }

      return {
        value: Math.round(value),
        tokenSymbol: tx.tokenSymbol, // todo: unknown tokens/airdrops could be flagged
        type:
          tx.to.toLowerCase() === inputAddress.toLowerCase()
            ? "Received"
            : "Sent",
        timeAgo,
        hash: tx.hash, // todo: could use etherscan api to get more info about the tx
      };
    });
}

export { getEtherscanTx };
