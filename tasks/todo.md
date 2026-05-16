# Klink Hackathon Todo — Monad Blitz Çanakkale

**Tarih:** 2026-05-16
**Süre:** 11:00–17:00 (6 saat)
**Hedef:** Audience vote 1.

---

## ✅ Yapıldı

- [x] Fikir keşfi (3 raund brainstorm)
- [x] Pozisyon kilitlendi: F&B + cüzdansız QR + sadakat + bahşiş
- [x] Vizyon: Türkiye POS replacement uzun vadeli
- [x] Regülasyon yol haritası (non-custodial offshore protocol)
- [x] İsim: **Klink**
- [x] Monad tasarım DNA'sı çıkartıldı (renk, font, spacing, motion)
- [x] Spec yazıldı (`docs/spec.md`)
- [x] Tasarım DNA dokümante edildi (`design/dna.md`)
- [x] Klasör yapısı kuruldu

## 🔄 Şimdi: Repo iskeleti

- [ ] `apps/web` → Next.js 14 + TypeScript + Tailwind + shadcn init
- [ ] `tailwind.config.ts` → Monad DNA token'larını uygula
- [ ] `app/globals.css` → font import (Inter + Roboto Mono) + CSS variables
- [ ] `contracts/` → Foundry init (`forge init`)
- [ ] `contracts/foundry.toml` → Monad testnet RPC config
- [ ] Privy SDK kurulumu + Monad chain config
- [ ] `.env.example` → Privy app ID, Monad RPC, contract address slot'ları
- [ ] `package.json` scripts: `dev`, `build`, `deploy:contracts`, `verify`

## ⏳ Sonraki: Smart contracts (12:30-14:00)

- [ ] `MockUSDC.sol` — ERC-20, 6 decimals, public mint
- [ ] `LoyaltyNFT.sol` — ERC-1155, per-merchant stamp ID
- [ ] `TipPool.sol` — havuz + DistributionRule enum + addStaff/removeStaff
- [ ] `PayBill.sol` — tek transaction, iki transfer, NFT mint trigger
- [ ] Foundry test (happy path en az: payBill flow)
- [ ] Monad testnet deploy (forge script)
- [ ] Contract adreslerini `.env`'e yaz

## ⏳ Sonraki: Frontend (14:00-15:30)

- [ ] Privy provider setup + Monad chain
- [ ] `/` — Landing (hero + pitch + demo gif placeholder)
- [ ] `/pay/[masaId]` — Müşteri ödeme sayfası
  - [ ] Adisyon mock data
  - [ ] Privy login modal
  - [ ] Top-up modal (mock USDC mint)
  - [ ] Bahşiş preset'ler (%10/%15/%20)
  - [ ] payBill transaction call
  - [ ] Başarı ekranı (sadakat NFT bildirimi)
- [ ] `/m/[mekanId]` — Mekan dashboard
  - [ ] Stats kartları (ciro, işlem, müşteri)
  - [ ] Bahşiş havuzu tablosu
  - [ ] Sadık müşteri listesi
- [ ] `/staff` — Çalışan dashboard
  - [ ] Bugünkü bahşiş (büyük metric)
  - [ ] Haftalık/aylık özet
  - [ ] Son işlemler listesi
  - [ ] BtcTurk linki (mock)
- [ ] `/onboard` — Mekan kayıt
  - [ ] Wallet bağla
  - [ ] İşletme bilgisi formu
  - [ ] Masa sayısı + QR generator

## ⏳ Demo (15:30-16:30)

- [ ] Senaryo provası (1 müşteri + 1 mekan + 1 garson akışı)
- [ ] Mock data hazırla (mekan, masa, çalışan, adisyon)
- [ ] OBS / Loom kurulum
- [ ] Kayıt 1: müşteri akışı (mobil ekran)
- [ ] Kayıt 2: mekan dashboard (canlı update)
- [ ] Kayıt 3: çalışan ekranı (bildirim)
- [ ] Video edit (3 sahneyi split-screen birleştir)
- [ ] Capcut/DaVinci export → 90 saniye mp4

## ⏳ Submission (16:30-17:00)

- [ ] GitHub repo public
- [ ] README final (screenshot, demo link, contract address'ler)
- [ ] X tweet paylaşım (taslak `docs/spec.md` §12)
- [ ] Lu.ma submission form / hackathon platform
- [ ] Submission konfirmasyonu screenshot

---

## ⚠️ Saat kilometre taşları (KESIN)

| Saat | Hedef | Eğer geriden geliyorsam |
|---|---|---|
| **12:30** | Repo + Privy + Tailwind ayağa | Contract scope'u tek `PayBill.sol`a indir |
| **14:00** | Contract'lar deploy edilmiş, ABI export | TipPool'u kaldır, PayBill'a inline yaz |
| **15:30** | Frontend MVP donmuş (CODE FREEZE) | `/m` ve `/staff` mock'la kal, `/pay` çalışsın |
| **16:30** | Video kayıt + edit bitmiş | Loom raw kayıt yeter, edit atla |
| **17:00** | Submission tamam | — |

## 🚨 Acil durum planı

Eğer 14:00'da contract'lar deploy edilmediyse:
- Tek `PayBill.sol`'a düş, TipPool ve LoyaltyNFT'yi event-only yap
- Frontend'i öne al, contract'ı mock'la (UI çalışır, blockchain backend ikinci video round)

Eğer 15:30'da frontend bitmediyse:
- Sadece `/pay/[masaId]`'ı bitir → tek-akışlı demo
- `/m` ve `/staff`'ı statik mockup (Figma/HTML) ile videoda göster

Eğer 16:30'da video bitmediyse:
- Loom raw screen recording yeterli → edit yapma
- X tweet'i video yerine GIF + screenshot ile paylaş

---

## 💡 Notlar

- **Privy embedded wallet** — Monad testnet henüz Privy'de native değil olabilir. Custom chain config yazmak gerekebilir.
- **Monad testnet RPC** — `https://testnet-rpc.monad.xyz` — rate limit'e dikkat
- **Mock USDC** — public mint olduğu için demo'da kolayca fund edilir
- **QR generator** — `qrcode.react` veya `qrcode` paketleri yeterli
- **Font** — Monad'ın `brittiSans`'i custom; biz Inter ile yetin (fallback'i zaten Inter)
