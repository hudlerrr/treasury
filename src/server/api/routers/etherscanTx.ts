import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import axios from "axios";
import { env } from "@/env.js";

export const etherscanTxRouter = createTRPCRouter({
  getTransactions: publicProcedure
    .input(z.object({ 
      address: z.string(),
      page: z.number().default(1),
      offset: z.number().default(10),
      startDate: z.date().optional(),
      endDate: z.date().optional()
    }))
    .query(async ({ input }) => {
      const baseUrl = "https://api.etherscan.io/api";
      const endpoint = `${baseUrl}?module=account&action=tokentx&address=${input.address}&page=${input.page}&offset=${input.offset}&sort=desc&apikey=${env.ETHERSCAN_API_KEY}`;
      
      try {
        const response = await axios.get(endpoint);
        const data = response.data;

        return processEtherscanTx(data.result, input.address, input.startDate, input.endDate);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`Error fetching data from Etherscan API: ${error.message}`);
        }
        throw new Error("An unexpected error occurred");
      }
    }),
});

function processEtherscanTx(data: any[], inputAddress: string, startDate?: Date, endDate?: Date): any {
  const currentTime = Math.floor(Date.now() / 1000);
  
  return data
    .filter(tx => {
      const txDate = new Date(Number(tx.timeStamp) * 1000);
      return (!startDate || txDate >= startDate) && (!endDate || txDate <= endDate);
    })
    .map(tx => {
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
        type: tx.to.toLowerCase() === inputAddress.toLowerCase() ? 'Received' : 'Sent',
        timeAgo,
        hash: tx.hash // todo: could use etherscan api to get more info about the tx
      };
    });
}
