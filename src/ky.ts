import ky from "ky";

export const safe = ky.extend({
  prefixUrl: "https://safe-transaction-sepolia.safe.global/api/v1/",
});
