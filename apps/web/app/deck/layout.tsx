import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klink · Pitch Deck",
  description: "Klink hackathon sunumu — Türk F&B sektörü için Web3 POS, Monad üzerinde.",
};

export default function DeckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
