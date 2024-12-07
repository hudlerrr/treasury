import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import ky from "ky";
import { BASE_URLS } from '../../apiConstants';

/*
router for fetching wallet balance and tokens from the Safe API.
*/

const BalanceItemSchema = z.object({
  tokenInfo: z.object({
    address: z.string(),
    symbol: z.string(),
    name: z.string(),
    decimals: z.number(),
    logoUri: z.string(),
  }),
  balance: z.string(),
  fiatBalance: z.string(),
});

const SafeBalanceDataSchema = z.object({
  fiatTotal: z.string(),
  items: z.array(BalanceItemSchema),
});

const ProcessedBalanceSchema = z.object({
  tokenAddress: z.string(),
  tokenSymbol: z.string(),
  tokenName: z.string(),
  balance: z.string(),
  balanceInTokens: z.string(),
  balanceUsd: z.string(),
  percentage: z.string(),
  logoUri: z.string(),
});

const GetBalanceResponseSchema = z.object({
  message: z.string(),
  balances: z.array(ProcessedBalanceSchema),
  totalBalanceUsd: z.string(),
});

type GetBalanceResponse = z.infer<typeof GetBalanceResponseSchema>;

export const walletBalanceRouter = createTRPCRouter({
  getBalance: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(async ({ input }): Promise<GetBalanceResponse> => {
      const endpoint = `${BASE_URLS.SAFE}/${input.address}/balances/usd?trusted=true`;
      try {
        const data = await ky.get(endpoint).json();
        return processWalletBalance(data);
      } catch (error) {
        throw new Error("An unexpected error occurred", { cause: error });
      }
    }),
});

function processWalletBalance(data: unknown): GetBalanceResponse {
    
  const parsedData = SafeBalanceDataSchema.parse(data);

  const totalUsdBalance = parseFloat(parsedData.fiatTotal);

  const processedBalances = parsedData.items.map((item) => {
    const balanceUsd = parseFloat(item.fiatBalance);
    const percentage = (balanceUsd / totalUsdBalance) * 100;

    return {
      tokenAddress: item.tokenInfo.address,
      tokenSymbol: item.tokenInfo.symbol,
      tokenName: item.tokenInfo.name,
      balance: item.balance,
      balanceInTokens: (
        Number(item.balance) / Math.pow(10, item.tokenInfo.decimals)
      ).toFixed(2),
      balanceUsd: balanceUsd.toLocaleString(),
      percentage: percentage.toLocaleString(),
      logoUri: item.tokenInfo.logoUri,
    };
  });

  //todo: should gov tokens be included in total
  return GetBalanceResponseSchema.parse({
    message: "Wallet balances",
    balances: processedBalances,
    totalBalanceUsd: totalUsdBalance.toLocaleString(),
  });
}
