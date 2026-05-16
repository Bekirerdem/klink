<div align="center">

# Klink

**Türk F&B ve hizmet ekonomisi için cüzdansız QR ödeme + on-chain bahşiş + sadakat NFT altyapısı.**

Monad üzerinde komisyonsuz, anlık settle, paralel EVM yürütmesi.

[![Monad Testnet](https://img.shields.io/badge/Monad-Testnet%2010143-6e54ff?style=for-the-badge)](https://testnet.monadexplorer.com/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.27-363636?style=for-the-badge&logo=solidity)](https://soliditylang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#-lisans)

**Monad Blitz Çanakkale 2026** · Solo · 6 saat

[Canlı Demo](#) · [Repo](https://github.com/Bekirerdem/klink) · [Spec](./docs/spec.md) · [Tasarım DNA](./design/dna.md)

</div>

---

## 🎯 Pitch

Türkiye'de **50.000+ kafe/bar/restoran** ve **5 milyon+ F&B çalışanı** için mevcut altyapı üç tarafı da yoruyor:

| Aktör | Bugünkü Pain | Klink Çözümü |
|---|---|---|
| **Mekan** | Iyzico/Param %2.5-3 komisyon, 24-72 saat settle, müşteri data bankada kilitli | Gas-only ücret (~$0.001), anlık settle, on-chain müşteri profili |
| **Müşteri** | Split hesap kabusu, sadakat kart-taşıma, cüzdan kurma korkusu | Email/SMS ile saniyede cüzdan, tek tap split + bahşiş, NFT sadakat |
| **Çalışan** | Bahşiş havuzunda patron manipülasyonu, ay sonu maaş, vergi belirsizliği | On-chain havuz (değiştirilemez), anlık cüzdan, BtcTurk off-ramp |

Klink tek altyapıyla aynı transaction'da üç tarafa değer üretir: **mekan ödenir + çalışan bahşişini alır + müşteri sadakat mührünü cüzdana koyar**.

---

## 🚀 Hızlı Bakış

- 🪙 **Cüzdansız onboarding** — Privy embedded wallet (email/SMS), seed phrase yok
- ⚡ **Anlık settle** — Monad'da ~0.4 saniye, $0.001 gas
- 💸 **Komisyonsuz** — Iyzico %3 yerine gas-only
- 🤝 **Adil bahşiş** — On-chain havuz, patron değiştiremiyor
- 🎁 **Koalisyon sadakat** — Şehir bazlı NFT pasaport (Çanakkale Kahve Pasaportu)
- 🇹🇷 **Türk F&B'sine özel** — yerel adisyon, vardiya kuralı, off-ramp

---

## 📸 Ekranlar

```
/                    → Editorial landing (Hero + En Aktif Mekanlar + Mekanı Güçlendir + Canlı Ağ)
/pay/[masaId]        → Müşteri ödeme akışı (Privy login + bahşiş + onchain pay)
/m/[mekanId]         → Mekan dashboard (canlı feed + bahşiş havuzu + sadık müşteri)
/staff               → Çalışan paneli (bugünkü bahşiş + BtcTurk off-ramp)
/onboard             → 4-adım mekan kayıt (cüzdan → bilgi → havuz → QR generator)
```

---

## 🧬 Mimari

### Smart Contracts (Solidity 0.8.27, Foundry, OpenZeppelin v5.1.0)

```
contracts/
├── src/
│   ├── PayBill.sol       Tek transaction'da: müşteri→mekan + müşteri→tip pool + LoyaltyNFT mint
│   ├── TipPool.sol       On-chain bahşiş havuzu (EQUAL/WEIGHTED dağıtım, patron değiştiremiyor)
│   ├── LoyaltyNFT.sol    ERC-1155 sadakat mührü (token id = merchant address derive)
│   └── MockUSDC.sol      Demo USDC (6 decimals, public mint)
├── test/PayBill.t.sol    6/6 test geçiyor (happy path, weighted dağıtım, revert paths)
└── script/Deploy.s.sol   Full stack deploy script
```

### Frontend (Next.js 16, TypeScript, Tailwind v4)

```
apps/web/
├── app/
│   ├── page.tsx                Landing
│   ├── pay/[masaId]/page.tsx   Müşteri akışı
│   ├── m/[mekanId]/page.tsx    Mekan dashboard
│   ├── staff/page.tsx          Çalışan paneli
│   └── onboard/page.tsx        Mekan kayıt sihirbazı
├── components/
│   ├── site/                   Landing sections (editorial layout, Monad DNA)
│   ├── pay/                    Müşteri akış component'leri
│   ├── merchant/               Dashboard widget'ları
│   ├── staff/                  Çalışan dashboard
│   ├── onboard/                4-step stepper
│   └── ui/                     Atomic primitives (button, eyebrow, count-up, pulse-dot)
└── lib/
    ├── chain.ts                Monad testnet config + publicClient
    ├── contracts.ts            Address registry + ABIs
    ├── env.ts                  zod-validated env (boot-time fail-fast)
    └── format.ts               TR locale numerik formatlayıcılar
```

### Kullanılan Teknolojiler

| Katman | Teknoloji |
|---|---|
| Smart Contract | Solidity 0.8.27, Foundry, OpenZeppelin v5.1.0 |
| Frontend | Next.js 16 (App Router, Turbopack), React 19, TypeScript ES2020 |
| Tasarım | Tailwind v4 (@theme), framer-motion, Inter + Roboto Mono |
| Cüzdan | Privy embedded wallet SDK (email/SMS) + @privy-io/wagmi |
| EVM | wagmi v2, viem, @tanstack/react-query |
| Chain | Monad Testnet (chainId 10143, RPC `https://testnet-rpc.monad.xyz`) |

---

## 📍 Deploy Edilmiş Adresler (Monad Testnet)

```
MockUSDC:    0x53c10844dD2A249eE488EeA66E7Df21365030ceB
LoyaltyNFT:  0x209630270DD1cAc59b3eB2839527658d8FC822D8
PayBill:     0x3262F974cB80F16D49c238E1bCB389Dc2c891247
```

[Monad Testnet Explorer](https://testnet.monadexplorer.com/)

---

## 🛠 Lokal Geliştirme

### Önkoşullar

- **Node.js** ≥ 18 (önerilen: 20+)
- **Bun** ≥ 1.3 ([yükle](https://bun.sh/))
- **Foundry** ([yükle](https://getfoundry.sh/))
- **Privy app ID** ([dashboard.privy.io](https://dashboard.privy.io))

### Kurulum

```bash
# Repo klonla
git clone https://github.com/Bekirerdem/klink.git
cd klink

# Frontend bağımlılıkları
cd apps/web
bun install

# Contract bağımlılıkları (forge-std + openzeppelin submodule)
cd ../../contracts
forge install

# Env dosyaları
cp ../.env.example ../.env                # root: DEPLOYER_PRIVATE_KEY + MONAD_RPC_URL
cp ../apps/web/.env.example ../apps/web/.env.local   # frontend: PRIVY_APP_ID + contract addresses

# .env ve .env.local'ı kendi değerlerinle doldur
```

### Smart Contract Deploy

```bash
cd contracts
forge build
forge test                                # 6/6 test geçmeli

# Monad testnet'e deploy
set -a; source ../.env; set +a
forge script script/Deploy.s.sol --rpc-url monad_testnet --broadcast --legacy

# Çıkan adresleri apps/web/.env.local'a yapıştır:
# NEXT_PUBLIC_MOCK_USDC_ADDRESS=0x...
# NEXT_PUBLIC_LOYALTY_NFT_ADDRESS=0x...
# NEXT_PUBLIC_PAY_BILL_ADDRESS=0x...
```

### Frontend Çalıştır

```bash
cd apps/web
bun run dev
```

→ http://localhost:3000

### Build & Tip Kontrolü

```bash
bun run build         # Production build
bunx tsc --noEmit     # TypeScript check
bun run lint          # ESLint
```

---

## ☁️ Vercel Deploy

### Tek tıkla deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Bekirerdem/klink&project-name=klink&repository-name=klink&root-directory=apps/web)

### Manuel deploy

1. **Vercel hesabına giriş yap** → "Add New Project"
2. **GitHub repo'sunu seç**: `Bekirerdem/klink`
3. **Root Directory** olarak `apps/web` belirt
4. **Framework Preset**: Next.js (otomatik algılanır)
5. **Environment Variables** ekle:

| Değişken | Değer |
|---|---|
| `NEXT_PUBLIC_PRIVY_APP_ID` | Dashboard.privy.io'dan alınan app ID |
| `NEXT_PUBLIC_MONAD_CHAIN_ID` | `10143` |
| `NEXT_PUBLIC_MONAD_RPC_URL` | `https://testnet-rpc.monad.xyz` |
| `NEXT_PUBLIC_MONAD_EXPLORER_URL` | `https://testnet.monadexplorer.com` |
| `NEXT_PUBLIC_MOCK_USDC_ADDRESS` | `0x53c10844dD2A249eE488EeA66E7Df21365030ceB` |
| `NEXT_PUBLIC_LOYALTY_NFT_ADDRESS` | `0x209630270DD1cAc59b3eB2839527658d8FC822D8` |
| `NEXT_PUBLIC_PAY_BILL_ADDRESS` | `0x3262F974cB80F16D49c238E1bCB389Dc2c891247` |

6. **Deploy** → ~2 dakikada canlı

> ⚠️ **NOT:** `.env` ve `.env.local` dosyaları `.gitignore`'da, asla commit edilmez. Privy app ID `NEXT_PUBLIC_` prefix'li olduğu için bundle'a girer; bu Privy'nin standart davranışıdır, secret değildir.

---

## 🧪 Test

### Smart Contract Test

```bash
cd contracts
forge test -vvv
```

Beklenen sonuç:
```
[PASS] test_loyalty_minterCannotBeReassigned (gas: 12,778)
[PASS] test_payBill_billOnlyNoTip (gas: 102,746)
[PASS] test_payBill_happyPath (gas: 177,885)
[PASS] test_payBill_revertsOnZeroAmounts (gas: 15,526)
[PASS] test_payBill_revertsOnZeroMerchant (gas: 13,337)
[PASS] test_tipPool_weightedDistribution (gas: 230,780)
Suite result: ok. 6 passed; 0 failed; 0 skipped
```

### Frontend Test Akışı (manuel)

1. `/` → Landing açılır, motion'lar tetiklenir
2. `/pay/demo` → Privy email login → 161₺ ödeme akışı
3. Cüzdan kuruldu, balance otomatik fund'lanır (mock USDC mint)
4. PayBill transaction'ı broadcast olur, ~0.4 sn'de settle
5. Success ekranı + sadakat NFT bildirimi + on-chain makbuz linki

---

## 🗺 Roadmap

### v0.1 (Şu an — Hackathon MVP) ✅
- [x] PayBill + TipPool + LoyaltyNFT + MockUSDC contractları
- [x] Müşteri akışı (Privy email + ödeme + bahşiş)
- [x] Mekan + çalışan + onboard dashboard'ları
- [x] Editorial landing (Monad app DNA referansı)
- [x] Monad testnet deploy + 6/6 contract test

### v0.2 (Hackathon sonrası)
- [ ] Fiat onramp (BtcTurk/Binance TR API entegrasyonu)
- [ ] Mekan onboarding'de gerçek TipPool deploy + staff add
- [ ] Sadakat NFT redeem akışı (10 mühür = bedava içecek)
- [ ] Mekanlar-arası koalisyon UI (Çanakkale Kahve Pasaportu)

### v0.3 (Production)
- [ ] HyperIndex (Envio) ile event indexing
- [ ] Mobile PWA polish + Solana Pay tarzı QR scanner
- [ ] Dispute / iade akışı
- [ ] Subscription / abonelik desteği

### v1.0 (Mainnet)
- [ ] Monad Mainnet'e geçiş
- [ ] Circle Native USDC entegrasyonu
- [ ] EU MiCA lisanslı offshore entity
- [ ] TR'de KVHS lisansı başvurusu (100K+ kullanıcıda)

---

## 📚 Dokümantasyon

- [`docs/spec.md`](./docs/spec.md) — 16-bölümlü ürün spec'i (problem, çözüm, vizyon, regülasyon yol haritası, rakip karşılaştırma)
- [`design/dna.md`](./design/dna.md) — Monad tasarım DNA'sı + Klink uyarlaması (renk, tipo, motion, layout)
- [`tasks/todo.md`](./tasks/todo.md) — Hackathon görev listesi + saat kilometre taşları

---

## 👤 Geliştirici

**Bekir Erdem**

- GitHub: [@Bekirerdem](https://github.com/Bekirerdem)
- Twitter: [@bekirerdem](https://x.com/bekirerdem)
- Web: [bekirerdem.dev](https://bekirerdem.dev)

---

## 🏆 Hackathon

**Monad Blitz Çanakkale 2026** · 16 Mayıs 2026 · 11:00-17:00

- Tema: Consumer apps on Monad
- Format: 6 saat solo IRL hackathon
- Lokasyon: Çanakkale, Türkiye
- Platform: [blitz.devnads.com](https://blitz.devnads.com)

---

## 📄 Lisans

[MIT](./LICENSE) © 2026 Bekir Erdem

---

<div align="center">

Built on [Monad](https://www.monad.xyz/) · [@monad_xyz](https://x.com/monad_xyz)

`10,000 TPS · 0.4s finality · 100% EVM compatible`

</div>
