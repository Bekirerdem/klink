import { defineChain } from "viem";
import { env } from "./env";

export const monadTestnet = defineChain({
  id: env.NEXT_PUBLIC_MONAD_CHAIN_ID,
  name: "Monad Testnet",
  nativeCurrency: {
    name: "Monad",
    symbol: "MON",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: [env.NEXT_PUBLIC_MONAD_RPC_URL] },
  },
  blockExplorers: {
    default: {
      name: "Monad Explorer",
      url: env.NEXT_PUBLIC_MONAD_EXPLORER_URL,
    },
  },
  testnet: true,
});
