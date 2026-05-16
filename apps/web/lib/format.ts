/**
 * TL formatlama — Türk yerel ayarı, mono numerik gösterim için.
 */
export function formatLira(amount: number, opts: { decimals?: number } = {}): string {
  const { decimals = 0 } = opts;
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function formatUSDC(rawAmount: bigint): string {
  const lira = Number(rawAmount) / 1e6;
  return formatLira(lira, { decimals: 2 });
}

export function shortAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}
