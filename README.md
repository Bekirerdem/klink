# Klink

> Türk F&B ve hizmet ekonomisi için cüzdansız ödeme + sadakat + bahşiş altyapısı, Monad üzerinde komisyonsuz.

**Monad Blitz Çanakkale 2026** — 6 saat solo hackathon.

---

## Pitch

Müşteri masada QR'ı tarıyor, cüzdan kurmadan (email ile) hesabı + bahşişi ödüyor. Mekan komisyonsuz çalışıyor, garson bahşişi anlık cüzdanına alıyor, müşteri otomatik sadakat NFT'si topluyor.

## Üç tarafa değer

| Aktör | Pain | Klink çözümü |
|---|---|---|
| Mekan | Iyzico %2.5-3 + 24-72h settle + müşteri data yok | Gas-only, anlık settle, on-chain müşteri profili |
| Müşteri | Split hesap zor + sadakat kart-taşıma + bahşiş kart üzerinden yok | Tek tap split, NFT sadakat, email ile cüzdan |
| Çalışan | Bahşiş havuzunda patron manipulasyonu + ay sonu maaş | On-chain havuz, anlık cüzdan, BtcTurk off-ramp |

## Stack

- Next.js 14 + Tailwind + shadcn/ui
- Privy embedded wallet SDK (cüzdansız onboarding)
- Foundry + Solidity 0.8.x
- Monad testnet
- viem

## Yapı

```
klink/
├── apps/web/         # Next.js — frontend (sonra kurulacak)
├── contracts/        # Foundry — smart contracts (sonra kurulacak)
├── docs/spec.md      # ürün spec'i — okumadan kod yazma
├── design/dna.md     # Monad tasarım DNA + Klink tasarım tokenları
└── tasks/todo.md     # hackathon görev listesi + saat planı
```

## Status

- [x] Fikir kilitlendi
- [x] Monad tasarım DNA'sı çıkartıldı
- [x] Spec yazıldı
- [ ] Repo iskelet (Next.js + Foundry)
- [ ] Smart contracts
- [ ] Frontend
- [ ] Demo video + X post

## Lisans

MIT — hackathon submission.
