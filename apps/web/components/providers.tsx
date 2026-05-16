"use client";

import { useState } from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { env } from "@/lib/env";
import { monadTestnet } from "@/lib/chain";
import { wagmiConfig } from "@/lib/wagmi";

/**
 * Birleşik auth + chain provider.
 *
 * - PrivyProvider: müşteri için email/SMS embedded wallet + mekan/staff/dev
 *   için "Connect Wallet" (MetaMask, WalletConnect) tek modal altında.
 * - WagmiProvider (@privy-io/wagmi): Privy embedded ve external cüzdanları
 *   wagmi connector olarak normalize eder → tek `useAccount/useReadContract`.
 * - QueryClientProvider: tüm onchain read'leri cache'ler.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <PrivyProvider
      appId={env.NEXT_PUBLIC_PRIVY_APP_ID || "klink-dev-placeholder"}
      config={{
        appearance: {
          theme: "light",
          accentColor: "#6e54ff",
          showWalletLoginFirst: false,
        },
        loginMethods: ["email", "sms", "wallet"],
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
        defaultChain: monadTestnet,
        supportedChains: [monadTestnet],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
