import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getEtherscanTx } from "./etherscanTx";
import axios from "axios";
import { env } from "@/env.js";

const txSummaryInputSchema = z.object({
  address: z.string(),
  dateRange: z.enum(["week", "month", "year", "custom"]),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

type TxSummaryInput = z.infer<typeof txSummaryInputSchema>;

export const transactionSummaryRouter = createTRPCRouter({
  getSummary: publicProcedure
    .input(txSummaryInputSchema)
    .query(async ({ input }) => {
      return getTxSummary(input);
    }),
});

async function getTxSummary(input: TxSummaryInput) {
  const now = new Date();
  let startDate: Date;
  let endDate = now;

  switch (input.dateRange) {
    case "week":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "month":
      startDate = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate(),
      );
      break;
    case "year":
      startDate = new Date(
        now.getFullYear() - 1,
        now.getMonth(),
        now.getDate(),
      );
      break;
    case "custom":
      if (!input.startDate || !input.endDate) {
        throw new Error("Custom date range requires both start and end dates");
      }
      startDate = input.startDate;
      endDate = input.endDate;
      break;
  }

  const transactions = await getEtherscanTx({
    address: input.address,
    startDate,
    endDate,
    page: 1,
    offset: 10000, // number of records returned (adjust to how far back you want tx to go)
  });

  const summary = transactions.reduce(
    (acc, tx) => {
      const category = tx.type === "Received" ? "inflows" : "outflows";
      const tokenSymbol = tx.tokenSymbol;
      const tokenValue = Math.round(tx.value); // Keep the token value

      if (!acc[category][tokenSymbol]) {
        acc[category][tokenSymbol] = { tokenValue: 0 };
      }

      acc[category][tokenSymbol].tokenValue += tokenValue; // Sum token values

      return acc;
    },
    { inflows: {}, outflows: {} },
  );

  // Calculate total values in USD
  let totalInflowsUSD = 0;
  let totalOutflowsUSD = 0;

  for (const category of ["inflows", "outflows"]) {
    for (const tokenSymbol in summary[category]) {
      const tokenPrice = await fetchTokenPrice(tokenSymbol);
      const totalValueInUSD = Math.round(
        summary[category][tokenSymbol].tokenValue * tokenPrice,
      );
      summary[category][tokenSymbol].totalValue = totalValueInUSD; // Update total value in USD

      if (category === "inflows") {
        totalInflowsUSD += totalValueInUSD;
      } else {
        totalOutflowsUSD += totalValueInUSD;
      }
    }
  }

  // Add total values to the summary
  summary.inflows.totalValue = totalInflowsUSD;
  summary.outflows.totalValue = totalOutflowsUSD;

  return {
    summary,
    dateRange: {
      start: startDate,
      end: endDate,
    },
  };
}

async function fetchTokenPrice(tokenSymbol: string) {
  // todo: see if api can take a list of token symbols (429)
  // todo: filter out random tokens
  try {
    if (tokenSymbol.includes("USD")) tokenSymbol = "usd"; // todo: is there a specific price for stablecoins

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokenSymbol}&vs_currencies=usd&x_cg_demo_api_key=${env.COINGECKO_API_KEY}`,
    );
    const price = response.data[tokenSymbol.toLowerCase()]?.usd || 0; // Return price or 0 if not found

    if (price === 0) {
      console.log(
        `Price not found for token: ${tokenSymbol}. Setting price to 0.`,
      );
    } else {
      console.log(`Price found for token: ${tokenSymbol}. Price: ${price}`);
    }
    return price;
  } catch (error) {
    console.error(
      `Error fetching price for token: ${tokenSymbol}. Error: ${error.message}`,
    );
    return 0;
  }
}

export { getTxSummary };
