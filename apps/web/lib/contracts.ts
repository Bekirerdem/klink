import type { Address } from "viem";
import { env } from "./env";

/**
 * Klink contract address registry.
 *
 * Production'da deploy script'i çıktısını `.env.local`'a koyduğun an
 * her şey otomatik bağlanır. Address'leri env'den okuyoruz, çünkü
 * hardcoded string'ler test/staging/prod karışıklığı yaratır.
 */
export const contracts = {
  payBill: env.NEXT_PUBLIC_PAY_BILL_ADDRESS as Address | undefined,
  tipPool: env.NEXT_PUBLIC_TIP_POOL_ADDRESS as Address | undefined,
  loyaltyNFT: env.NEXT_PUBLIC_LOYALTY_NFT_ADDRESS as Address | undefined,
  mockUSDC: env.NEXT_PUBLIC_MOCK_USDC_ADDRESS as Address | undefined,
} as const;

export const isContractsDeployed =
  !!contracts.payBill &&
  !!contracts.tipPool &&
  !!contracts.loyaltyNFT &&
  !!contracts.mockUSDC;

/* ABIs — sadece ihtiyaç duyulan fonksiyonlar, full ABI bloat etmesin. */

export const mockUsdcAbi = [
  {
    type: "function",
    name: "mint",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
] as const;

export const payBillAbi = [
  {
    type: "function",
    name: "payBill",
    stateMutability: "nonpayable",
    inputs: [
      { name: "merchant", type: "address" },
      { name: "tipPool", type: "address" },
      { name: "billAmount", type: "uint256" },
      { name: "tipAmount", type: "uint256" },
      { name: "receiptHash", type: "bytes32" },
    ],
    outputs: [],
  },
  {
    type: "event",
    name: "BillPaid",
    inputs: [
      { name: "customer", type: "address", indexed: true },
      { name: "merchant", type: "address", indexed: true },
      { name: "tipPool", type: "address", indexed: true },
      { name: "billAmount", type: "uint256", indexed: false },
      { name: "tipAmount", type: "uint256", indexed: false },
      { name: "receiptHash", type: "bytes32", indexed: false },
    ],
    anonymous: false,
  },
] as const;

export const loyaltyNftAbi = [
  {
    type: "function",
    name: "tokenIdFor",
    stateMutability: "pure",
    inputs: [{ name: "merchant", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [
      { name: "account", type: "address" },
      { name: "id", type: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;
