# Klink — Ürün Spec'i

**Tarih:** 2026-05-16
**Yarışma:** Monad Blitz Çanakkale (11:00–17:00, 6 saat)
**Geliştirici:** Bekir Erdem (solo)
**Hedef:** Audience vote ile 1. olmak

---

## 1. Tek-cümle pitch

Türk F&B ve hizmet ekonomisi için cüzdansız ödeme + sadakat + bahşiş altyapısı, Monad üzerinde komisyonsuz.

## 2. Problem

Türkiye'de 50K+ kafe/bar/restoran ve 5M+ hizmet çalışanı için mevcut altyapıda üç pain noktası:

| Aktör | Pain | Mevcut çözüm | Sürtünme |
|---|---|---|---|
| **Mekan sahibi** | POS komisyonu %2.5-3 | Iyzico/Param/Garanti POS | Settlement 24-72h, müşteri data banka'da kilitli |
| **Müşteri** | Split hesap kabusu, sadakat kart taşıma, bahşiş kart üzerinden alınamıyor | Nakit / banka uygulaması | Kart numarası girme, fiziksel kart taşıma, ayrı app yükleme |
| **Çalışan** | Bahşiş havuzu manipulasyonu, anlık likidite yok, vergi belirsiz | Nakit / patron havuzu | Patron hakem, ay sonu maaş, beyan riski |

## 3. Çözüm

Tek altyapı, üç tarafa değer. Beş ana modül:

1. **Cüzdansız Onboarding** — Privy embedded wallet, email/SMS ile ~10 saniyede cüzdan.
2. **Top-Up Tab modeli** — Müşteri bir kez fund eder, sonraki tüm ödemeler tek tap (Starbucks app benzeri).
3. **PayBill contract** — Tek transaction'da fatura + bahşiş + sadakat NFT mint.
4. **TipPool contract** — On-chain bahşiş havuzu, vardiyaya göre dağılım. Patron manipule edemiyor.
5. **Coalition NFT** — Mekanlar-arası ortak sadakat ("Çanakkale Kahve Pasaportu" — V2).

## 4. Vizyon (uzun vadeli)

Klink'in uzun vadeli vizyonu Türkiye'deki Iyzico/Param/Garanti POS altyapısının **Web3 yerine geçeni** olmak. Hackathon MVP'sinde "POS'u yıkıyoruz" iddialı dili kullanmıyoruz; "müşteriye Web3 ödeme seçeneği veriyoruz" diyoruz. Vizyon arka planda, MVP önde.

### Pazara giriş (5 aşama)

1. **Beachhead:** Crypto-aware mekanlar (üniversite kafeleri, tech-friendly barlar). 10-50 mekan.
2. **Koalisyon viralliği:** Şehir-bazlı sadakat ağları ("Çanakkale Kahve Pasaportu").
3. **Zincir mekanlar:** Espresso Lab tipi yerel zincirlere B2B satış.
4. **Regülasyon kapısı:** 100K+ aktif kullanıcıda SPK / offshore protocol modeli.
5. **Mass adoption:** Iyzico/Param ile rekabet.

### Regülasyon yol haritası

- **Hackathon:** Open source protokol, testnet, sıfır endişe.
- **MVP launch:** Non-custodial Privy embedded (key kullanıcıda) + smart contract P2P → Uniswap modeli gri alan.
- **Production:** Estonya / Litvanya offshore entity (EU MiCA lisanslı bölge) + TR partneri (BtcTurk/Binance TR) fiat çıkış için.
- **Mass:** TR'de KVHS lisansı.

## 5. Kullanıcı yolculuğu

### 5a. Müşteri (ilk kullanım)
1. Masada QR tara → `/pay/[masaId]` açılır
2. Adisyon görünür → "Hesabı Öde" tıkla
3. Email gir → Privy embedded wallet kurulur (~10 sn)
4. "Bakiye Yükle — 500 TL" → mock USDC mint (production'da: kart/CEX bridge)
5. "%10 / %15 / %20 bahşiş" seç → tek tap confirm
6. Cüzdanda: -16 USDC, +1 sadakat NFT, on-chain makbuz event

### 5b. Müşteri (geri dönüş, başka mekan)
1. Başka mekanda QR tara
2. Wallet zaten kurulu, bakiye yeterli
3. Bahşiş seç → confirm → 5 saniye

### 5c. Mekan onboarding
1. `mekan.klink.app` → cüzdan bağla (MetaMask veya Privy)
2. İşletme bilgisi + bahşiş havuzu kuralı (% eşit / vardiya / pozisyon)
3. Çalışan cüzdanlarını ekle
4. Masa sayısı seç → QR'lar üretilir → PDF indir

### 5d. Çalışan
1. Mekan davetli linki → Privy ile cüzdan
2. Adres mekan TipPool sözleşmesine eklenir
3. Her bahşişte cüzdanına otomatik akar
4. BtcTurk/Binance TR'ye gönder → TL'ye çek (off-ramp)

## 6. Smart contract yüzeyi

### `PayBill.sol`
```solidity
function payBill(
    address merchant,
    address tipPool,
    uint256 billAmount,
    uint256 tipAmount,
    bytes32 receiptHash
) external;

event BillPaid(
    address indexed customer,
    address indexed merchant,
    uint256 billAmount,
    uint256 tipAmount,
    bytes32 receiptHash
);
```
Tek transaction → iki transfer (merchant + tipPool) + LoyaltyNFT mint çağrısı.

### `TipPool.sol`
```solidity
enum DistributionRule { EQUAL, BY_SHIFT_HOURS, BY_ROLE_WEIGHT }

function addStaff(address staff, uint256 weight) external onlyMerchant;
function removeStaff(address staff) external onlyMerchant;
function setDistributionRule(DistributionRule rule) external onlyMerchant;
function distributeTip(uint256 amount) external; // called by PayBill
```
Distribution rules on-chain set'lenir, merchant değiştiremez çekildikten sonra.

### `LoyaltyNFT.sol` (ERC-1155)
- Her ödemede 1 stamp mint edilir (token ID = mekan adresi'nden derive)
- Mekanlar koalisyona girince ortak collection ID kullanılır
- 10 stamp = 1 free coffee event (V2)

### `MockUSDC.sol` (testnet için)
- Basit ERC-20, 6 decimals
- `mint(address, uint256)` halka açık (top-up simülasyonu)

## 7. Frontend ekranları

| Route | Aktör | İçerik |
|---|---|---|
| `/` | Ziyaretçi | Landing — pitch + demo gif + waitlist |
| `/pay/[masaId]` | Müşteri | QR'dan açılan adisyon + bahşiş + Privy login + ödeme |
| `/m/[mekanId]` | Mekan | Anlık ciro + sadık müşteri listesi + bahşiş havuzu paneli |
| `/staff` | Çalışan | Günlük/haftalık bahşiş + off-ramp linki |
| `/onboard` | Mekan kayıt | Cüzdan bağla + işletme + masa QR generator |

## 8. Tech stack

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui
- **Cüzdan:** Privy embedded wallet SDK (`@privy-io/react-auth`)
- **Chain:** Monad testnet (chain ID 10143, RPC `https://testnet-rpc.monad.xyz`)
- **Contract:** Solidity 0.8.x + Foundry + viem
- **Deploy:** Vercel (frontend) + Monad testnet (contract)
- **Token:** Mock USDC (Klink-USDC) — production'da Circle Native USDC
- **State:** React Server Components + zustand (client store)
- **Form:** react-hook-form + zod
- **QR:** `qrcode.react`

## 9. Kapsam İÇİ (6 saatte teslim)

- 4 smart contract (PayBill, TipPool, LoyaltyNFT, MockUSDC) — basic implementation + Foundry happy-path test + Monad testnet deploy
- 5 frontend route (`/`, `/pay`, `/m`, `/staff`, `/onboard`)
- Privy embedded wallet entegrasyonu
- Mock USDC mint (top-up tab simülasyonu)
- 1 mekan + 1 masa + 2 çalışan + 1 müşteri demo akışı
- 90 saniye demo video
- X paylaşımı + repo

## 10. Kapsam DIŞI (V2)

- Production fiat onramp (Moonpay/Onramper entegrasyonu)
- Çoklu mekan koalisyon UI (contract destekli, dashboard yok)
- BtcTurk/Binance TR off-ramp entegrasyonu
- Mobile native app (PWA yeterli)
- KYC / regülasyon katmanı
- Multi-token desteği (sadece USDC)
- Dispute / iade akışı
- Subscription / abonelik
- Sadakat NFT redeem akışı (mint event'i var, redeem yok)

## 11. Demo video kurgu (90 saniye)

| Süre | Sahne | İçerik |
|---|---|---|
| 0-10s | Mood | Bar tezgâhı, masa QR — "Türkiye'de 50K+ F&B mekanı, 5M çalışan. Bahşiş hâlâ nakit-only." |
| 10-25s | Müşteri akışı | Telefonla QR tara → adisyon görünür → email gir → Privy wallet 5 saniyede kurulur |
| 25-40s | Top-Up & ödeme | Bakiye yükle (500 TL) → %15 bahşiş → tek tap → ekran "Ödendi" |
| 40-60s | Split screen — 3 ekran paralel | Barmen telefonu: "+50 TL bahşiş" bildirimi // Mekan dashboard: ciro güncelleniyor // Müşteri: sadakat NFT alındı |
| 60-80s | Mekan tarafı | Dashboard'da günün bahşiş havuzu otomatik dağılımı, sadakat müşteri tablosu |
| 80-90s | Kapanış | "Türk F&B'nin Web3 POS'u. Komisyonsuz. Anlık. Adil." + Klink logo + Monad logo |

## 12. X paylaşım taslağı

```
6 saat. Solo. @monad_xyz Blitz Çanakkale 🟪

Türkiye'de 50K+ kafe/bar/restoran. 5M F&B çalışanı.
Bahşiş nakit-only. Sadakat kart-taşıma. Komisyon Iyzico'da kalıyor.

Klink — cüzdansız QR ödeme + on-chain bahşiş + sadakat NFT.
Mekan komisyonsuz, garson anlık, müşteri tek tap.

[Demo video]
Repo 👇
```

## 13. Risk noktaları + azaltma

| Risk | Etki | Azaltma |
|---|---|---|
| Privy SDK kurulumu uzar | Frontend gecikir | Fallback: basic wagmi + signer-only akış |
| Monad testnet RPC down | Demo'da contract çağrısı patlar | Hardhat local fork backup hazır |
| Solidity bug, deploy edemezsin | Contract bağımsız çalışmaz | OpenZeppelin pattern'larını kullan, custom logic minimal |
| Video kaydı kötü | Submission zayıf | Loom / OBS hazır, retake için 30 dk buffer |
| Scope yetişmiyor | Kötü demo | 17:00 deadline'a göre 15:30'ta code freeze, 15:30-17:00 video + paylaşım |
| Privy + Monad testnet uyumsuzluğu | Wallet açılmıyor | Wagmi fallback + Foundry script ile direct sign |

## 14. Saat planı (11:00 - 17:00)

| Saat | Görev |
|---|---|
| 11:00-11:45 | ✅ Fikir lock + spec + DNA çıkartma (tamamlandı) |
| 11:45-12:30 | Repo iskelet (Next.js init, Foundry init, Privy SDK config, Tailwind+Monad token kurulumu) |
| 12:30-14:00 | Smart contractlar (PayBill, TipPool, LoyaltyNFT, MockUSDC) + Foundry test + Monad testnet deploy |
| 14:00-15:30 | Frontend (/pay, /m, /staff, /onboard routes) + Privy + viem entegrasyonu |
| 15:30-16:30 | Video kaydı + edit |
| 16:30-17:00 | X paylaşımı + repo finalize + submission |

## 15. Tasarım DNA referansı

Detay: `design/dna.md`

Monad tasarım sisteminden devralınanlar:

- **Ana renk:** Monad Purple `#6E54FF` — birincil CTA, vurgular
- **İkincil mor:** `#836EF9` — logo, brand accent
- **Soft tonlar:** `#EEE8FF`, `#D7D5FF` — surface backgrounds
- **Tipografi:** Inter (body + heading fallback) + Roboto Mono (metrik/tutar/adres)
- **Buton stili:** Tam yuvarlatılmış pill (`border-radius: 9999px`)
- **Spacing:** 4px base unit
- **Tone:** Modern, tech-forward, minimal, "performance-first"
- **Şekil dili:** Soft white cards, subtle purple glow, mono metrik gösterimi

---

## 16. Diferansiyasyon (rakip karşılaştırma)

| Boyut | Iyzico/Param POS | Papara | Klink |
|---|---|---|---|
| Komisyon (mekan) | %2.5-3 | %1.5-2 | Gas-only (~$0.001) |
| Settlement | 24-72 saat | T+1 | Anlık (saniyeler) |
| Müşteri data | Bankada kilitli | Papara'da | Mekan cüzdanında (kim, ne sıklıkta, ne harcadı) |
| Bahşiş | Genelde kart slotunda yok | Yok | On-chain ayrı transfer, garson cüzdanına direkt |
| Sadakat | Kart taşıma / ayrı app | Yok | Otomatik NFT, cüzdanda |
| Mekanlar-arası ağ | İmkansız | İmkansız | Koalisyon NFT'leriyle doğal |
| Kurulum | POS cihazı + kontrat | Banka hesabı | QR sticker + 10 dk |
| Müşteri kayıt | Kart numarası | Telefon doğrulaması | Email yeterli |
