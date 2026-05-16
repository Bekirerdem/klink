import { z } from "zod";

/**
 * Boş string'i undefined'a çevir, sonra opsiyonel 0x-address regex'i.
 * `.env.local`'da contract adresleri henüz set'lenmemişken
 * `NEXT_PUBLIC_..._ADDRESS=` boş kalıyor — zod normalde boş string'i
 * geçersiz adres sayardı. Preprocess fix-up bu sürtünmeyi keser.
 */
const optionalAddress = z.preprocess(
  (v) => (typeof v === "string" && v.length === 0 ? undefined : v),
  z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/)
    .optional(),
);

const ClientEnvSchema = z.object({
  NEXT_PUBLIC_PRIVY_APP_ID: z.string().optional().default(""),
  NEXT_PUBLIC_WC_PROJECT_ID: z.string().optional().default(""),
  NEXT_PUBLIC_MONAD_CHAIN_ID: z.coerce.number().default(10143),
  NEXT_PUBLIC_MONAD_RPC_URL: z.string().url().default("https://testnet-rpc.monad.xyz"),
  NEXT_PUBLIC_MONAD_EXPLORER_URL: z
    .string()
    .url()
    .default("https://testnet.monadexplorer.com"),
  NEXT_PUBLIC_PAY_BILL_ADDRESS: optionalAddress,
  NEXT_PUBLIC_TIP_POOL_ADDRESS: optionalAddress,
  NEXT_PUBLIC_LOYALTY_NFT_ADDRESS: optionalAddress,
  NEXT_PUBLIC_MOCK_USDC_ADDRESS: optionalAddress,
});

const parsed = ClientEnvSchema.safeParse({
  NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
  NEXT_PUBLIC_WC_PROJECT_ID: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
  NEXT_PUBLIC_MONAD_CHAIN_ID: process.env.NEXT_PUBLIC_MONAD_CHAIN_ID,
  NEXT_PUBLIC_MONAD_RPC_URL: process.env.NEXT_PUBLIC_MONAD_RPC_URL,
  NEXT_PUBLIC_MONAD_EXPLORER_URL: process.env.NEXT_PUBLIC_MONAD_EXPLORER_URL,
  NEXT_PUBLIC_PAY_BILL_ADDRESS: process.env.NEXT_PUBLIC_PAY_BILL_ADDRESS,
  NEXT_PUBLIC_TIP_POOL_ADDRESS: process.env.NEXT_PUBLIC_TIP_POOL_ADDRESS,
  NEXT_PUBLIC_LOYALTY_NFT_ADDRESS: process.env.NEXT_PUBLIC_LOYALTY_NFT_ADDRESS,
  NEXT_PUBLIC_MOCK_USDC_ADDRESS: process.env.NEXT_PUBLIC_MOCK_USDC_ADDRESS,
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  throw new Error(`Invalid Klink env vars:\n${issues}`);
}

export const env = parsed.data;
