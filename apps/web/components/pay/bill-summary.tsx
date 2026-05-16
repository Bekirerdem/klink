import { type DemoBill, billTotal } from "@/lib/demo-data";
import { Eyebrow } from "@/components/ui/eyebrow";

export function BillSummary({ bill }: { bill: DemoBill }) {
  const total = billTotal(bill);

  return (
    <div className="space-y-4">
      <Eyebrow tone="muted">{bill.masa.toUpperCase()} · ADİSYON</Eyebrow>

      <ul className="space-y-2.5">
        {bill.lines.map((line) => (
          <li
            key={line.name}
            className="grid grid-cols-[1fr_auto_auto] items-baseline gap-3 text-[15px]"
          >
            <span className="text-ink">
              <span className="text-ink-link">{line.qty}×</span> {line.name}
            </span>
            <span className="font-mono text-[13px] text-ink-link tabular-nums">
              {line.qty * line.price}₺
            </span>
            <span className="font-mono text-[13px] text-ink-link tabular-nums">
              {line.price}₺/ad
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-baseline justify-between border-t border-black/[0.06] pt-3">
        <span className="text-[13px] uppercase tracking-wider text-ink-link">
          Adisyon toplamı
        </span>
        <span className="font-mono text-2xl font-bold tabular-nums text-ink">
          {total}₺
        </span>
      </div>
    </div>
  );
}
