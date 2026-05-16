import { http } from "wagmi";
import { createConfig } from "@privy-io/wagmi";
import { monadTestnet } from "./chain";
import { env } from "./env";

/**
 * Privy-aware wagmi config.
 *
 * Privy embedded wallets (müşteri tarafı, email/SMS) ve external wallets
 * (mekan/staff/dev tarafı, MetaMask/WC) tek wagmi state altında birleşir.
 * `useAccount`, `useReadContract`, `useWriteContract` her iki taraf için
 * aynı şekilde çalışır.
 */
export const wagmiConfig = createConfig({
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http(env.NEXT_PUBLIC_MONAD_RPC_URL),
  },
});
