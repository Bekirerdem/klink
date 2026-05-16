# Klink Tasarım DNA'sı

> Monad'ın ana site (`monad.xyz`) ve uygulama dashboard'ı (`app.monad.xyz`) DNA'sından çıkartılmış tasarım sistemi. Klink bu DNA'yı **F&B / hizmet ekonomisi** vertikali için adapte ediyor. **Layout dili Klink'in en güçlü farklılaştırıcısı** — sadece renk/font değil, kompozisyon felsefesi.

---

## 1. Renk paleti

### Primary (Monad Purple)
| Token | Hex | Kullanım |
|---|---|---|
| `monad-purple` | `#6E54FF` | Ana brand rengi. CTA butonları, link vurgu. |
| `monad-purple-soft` | `#836EF9` | Logo mark rengi. Alternative emphasis. |
| `monad-purple-hover` | `#4F47EB` | Hover/pressed state, button outline. |
| `monad-purple-light` | `#EEE8FF` | Light surface, soft hover, badge background. |
| `monad-purple-pale` | `#D7D5FF` | Disabled state, pasif link. |

### Nötr (text & background)
| Token | Hex | Kullanım |
|---|---|---|
| `bg-base` | `#FFFFFF` | Ana arka plan (light mode). |
| `bg-mute` | `#FBFAF9` | Secondary buttons, kartlar, hover surfaces. |
| `ink` | `#0A0A0A` | Ana text (light mode). |
| `ink-soft` | `#18181B` | App page text primary. |
| `ink-link` | `#364153` | Link rengi (subdued). |

### Status (Klink eklemeleri)
| Token | Hex | Kullanım |
|---|---|---|
| `success` | `#10B981` | Ödeme tamam, bahşiş gönderildi. |
| `error` | `#EF4444` | Yetersiz bakiye, transaction failed. |
| `warning` | `#F59E0B` | Bakiye düşük, dikkat. |

---

## 2. Tipografi

| Rol | Font | Notlar |
|---|---|---|
| Display / Heading | Inter (Monad'ın brittiSans fallback'i) | Bold headline'lar |
| Body | Inter | UI metni, paragraf |
| Monospace | Roboto Mono | Para tutarları, metrikler, blockchain adres/hash |

### Boyutlar

| Token | Mobile | Desktop | Kullanım |
|---|---|---|---|
| `display` | 48px | 72-96px | Hero başlık (Monad imzası: `Built different. Built on Monad.`) |
| `h1` | 36px | 52-60px | Sayfa başlık |
| `h2` | 28px | 36-44px | Bölüm başlık |
| `h3` | 22px | 28px | Kart başlık |
| `body-lg` | 18px | 20px | Önemli body, subtitle |
| `body` | 16px | 16px | Standart UI metni |
| `caption` | 14px | 14px | Yardımcı metin |
| `micro` | 12px | 12px | Etiket, küçük not |
| `eyebrow` | 11px | 11px | Uppercase section label (Monad: `STAKING`, `DEFI`) |

### Weights
- Regular: 400 (body default)
- Medium: 500 (vurgu)
- Semibold: 600 (heading, button)
- Bold: 700 (display, metric)

---

## 3. Spacing & Layout

- **Base unit:** 4px
- **Skala:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
- **Section padding (desktop):** 96-128px (Monad'da bölümler arası bol nefes)
- **Section padding (mobile):** 48-64px
- **Card padding:** 24-32px
- **Container max-width:** 1280px (Monad ile aynı)
- **Reading width:** 720px (text-heavy bölümler için max)

---

## 4. Şekil / Radius

| Token | Değer | Kullanım |
|---|---|---|
| `pill` | `9999px` | Butonlar — Monad imzası |
| `xl` | `24px` | Kartlar, modal'lar |
| `lg` | `16px` | Içerik blokları |
| `md` | `12px` | Input, küçük kart |
| `sm` | `8px` | Badge, chip |

---

## 5. Components (atomic)

### Primary Button (Monad signature)
```css
.btn-primary {
  background: #6E54FF;
  color: #FFFFFF;
  border-radius: 9999px;
  padding: 14px 32px;
  font-weight: 600;
  font-size: 16px;
  box-shadow:
    rgba(0,0,0,0.2) 0px 1px 2px 0px,
    rgba(255,255,255,0.25) 0px 1px 0.5px 0px inset,
    rgba(255,255,255,0.25) 0px -1px 0.5px 0px inset,
    rgba(79,71,235,0.9) 0px 0px 0px 1px;
  transition: transform 150ms ease, box-shadow 150ms ease;
}
.btn-primary:hover {
  transform: scale(1.02);
  box-shadow: ..., 0 8px 24px rgba(110,84,255,0.25);
}
```

### Secondary Button (light)
```css
.btn-secondary {
  background: #FBFAF9;
  color: #000000;
  border-radius: 9999px;
  padding: 14px 32px;
  border: 1px solid rgba(0,0,0,0.07);
  font-weight: 600;
}
```

### Secondary Button (dark — app.monad.xyz tarzı)
```css
.btn-dark {
  background: #0A0A0A;
  color: #FFFFFF;
  border-radius: 9999px;
  padding: 14px 32px;
}
```

### Eyebrow label (Monad signature — uppercase tiny)
```css
.eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6E54FF;  /* veya muted */
}
```

### Stat (büyük mono sayı — Monad core pattern)
```jsx
<div className="space-y-2">
  <p className="eyebrow">BUGÜNKÜ CİRO</p>
  <p className="font-mono text-6xl font-bold tracking-tight tabular-nums">
    4.350<span className="text-2xl text-monad-purple ml-1">₺</span>
  </p>
  <p className="text-sm text-ink-soft">24 işlem · son 1 saatte +12</p>
</div>
```

### Card (Monad signature)
```css
.card {
  background: #FFFFFF;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.04);
}
```

---

# 🎯 6. LAYOUT DNA — Monad'ın kompozisyon dili

> **Bekir'in vurguladığı asıl güç burası.** Renk/font basit; Monad'ı Monad yapan **kompozisyon felsefesi**:
> - Büyük tipografik anlar + büyük negatif boşluk
> - Watermark/logo behind text (asimetrik katmanlama)
> - Live data + mono numerik vurgu (her zaman somut sayı göster)
> - Sticky section ribbon (NETWORK / PERFORMANCE / DEFI gibi etiketli ilerleme)
> - Floating app logo carousel'ı (ekosistem hissi)
> - Soft purple radial glow + dot-grid pattern arka plan

---

## 6.1 Hero composition (Built different. Built on Monad.)

### Anatomi
```
┌────────────────────────────────────────────────────────────────┐
│  [Eyebrow] FÜZE GİBİ                                            │
│                                                                  │
│       Built different.            ← display 96px Bold           │
│       Built on Monad.             ← italic emphasis word        │
│                                                                  │
│       Türkiye'nin F&B sektörü için ilk            ← subtitle    │
│       cüzdansız ödeme + sadakat + bahşiş katmanı.  20px muted   │
│                                                                  │
│       [ Mekanım için Klink İste ]  [ Müşteri Demo'su ]          │
│            primary pill                secondary pill            │
│                                                                  │
│                                                                  │
│  Arka plan: 1) Watermark Klink logosu (büyük, %4 opacity)       │
│             2) Top-center radial purple glow                     │
│             3) Subtle dot-grid pattern (alt yarıda fade out)     │
└────────────────────────────────────────────────────────────────┘
```

### CSS örnek
```css
.hero {
  position: relative;
  min-height: 90vh;
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at 50% 0%, rgba(110,84,255,0.12), transparent 60%),
    url('/dot-grid.svg') center / 32px;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('/klink-watermark.svg') center / 60vw no-repeat;
  opacity: 0.04;
  pointer-events: none;
}
```

### Yazım tonalitesi
- **İlk satır kalın, ikinci satır italic vurgu** (Monad'da `Built different. / Built on Monad.`)
- Klink'te: **`Türk F&B'sinin / yeni POS'u.`** veya **`Komisyonsuz öde. / Anlık bahşiş.`**

---

## 6.2 Stats strip (Monad'ın imzası — 4 büyük mono sayı)

Monad bunu `10,000 TPS / 200+ Validators / 100% EVM / 0.8s Finality` ile yapıyor. Bizim Klink karşılığı:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│   50K+           5M+            ~0₺            <1sn             │
│   MEKAN          ÇALIŞAN         KOMİSYON       SETTLE          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Uygulama
```jsx
<section className="border-y border-black/5 py-12 md:py-20">
  <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
    {stats.map(s => (
      <div key={s.label} className="space-y-2">
        <p className="font-mono text-5xl md:text-7xl font-bold tracking-tight tabular-nums">
          {s.value}
        </p>
        <p className="eyebrow">{s.label}</p>
      </div>
    ))}
  </div>
</section>
```

### Hover & motion
- Number scroll-into-view → `count-up` animasyon (0 → değer, 800ms)
- Hover: hafif scale + purple glow

---

## 6.3 App carousel (floating logo lozenges)

Monad ana sayfasında ekosistemdeki app logoları **floating capsule** olarak yatayda akıyor: `Uniswap · OpenSea · Phantom · Circle · PancakeSwap · ...` — sürekli scroll, çift sıra, paralax.

Klink karşılığı: **Mekan logoları akıyor** — "Klink'te ödeyebileceğin yerler"

```
┌──────────────────────────────────────────────────────────────────┐
│  ←  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐         │
│     │ Kafe │  │ Bar  │  │ Bistro│  │ Pub  │  │ Cafe │          │
│     │ Boğaz│  │ Asit │  │ Mart  │  │ Salt │  │ 18.5 │          │
│     └──────┘  └──────┘  └──────┘  └──────┘  └──────┘         │
│           ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐               │
│           │ ...  │  │ ...  │  │ ...  │  │ ...  │               │
│           └──────┘  └──────┘  └──────┘  └──────┘               │
└──────────────────────────────────────────────────────────────────┘
```

### Teknik
- 2 sıra, alt sıra yarım offset, ters yönde akış
- CSS `@keyframes marquee` ile infinite scroll
- Her capsule: pill-shape, 1px border, küçük logo + ad
- Hover: capsule duruyor + parlıyor

---

## 6.4 Section ribbon (sticky scroll-section nav)

Monad sayfasında scroll esnasında üstte küçük etiketler beliriyor: `NETWORK / PERFORMANCE / TRILEMMA / EXPLORE MONAD / EVENTS`. Bu **sticky scroll indicator** — kullanıcı nerede olduğunu görüyor.

Klink karşılığı:
```
┌─────────────────────────────────────────────────────────────┐
│  HİKAYE   ÇÖZÜM   NASIL ÇALIŞIR   MEKANLAR   SSS           │
│  ────                                                       │ ← active underline
└─────────────────────────────────────────────────────────────┘
```

- Position: sticky, top: 0
- Backdrop blur + 80% white opacity
- Border-bottom 1px black/5
- Active item: purple underline + bold

---

## 6.5 Section eyebrow + payoff line (Monad imzası)

Her büyük bölüm üç katmanlı başlıyor:
```
1) [eyebrow uppercase tiny]   "/ Unparalleled Performance"
2) [H2 big serif/sans bold]    "Build beyond limits. Scale without compromise."
3) [body muted paragraf]       "Monad unlocks a new era..."
```

Klink karşılığı:
```
1) [eyebrow]   "/ Komisyonsuz Ekonomi"
2) [H2]        "Mekan kazansın. Garson kazansın. Sen kazan."
3) [paragraf]  "Iyzico/Param %2.5-3 komisyon. Settlement 24-72 saat. Klink'te gas-only ve anlık."
```

---

## 6.6 Watermark backgrounds (asimetrik logo behind text)

Monad'ın `app.monad.xyz` hero'sunda **büyük transparent logo arka plana yatırılmış** — text ona bindirilmiş. Sayfaya **derinlik ve marka enerjisi** veriyor.

```css
.section-with-watermark {
  position: relative;
  overflow: hidden;
}
.section-with-watermark::before {
  content: '';
  position: absolute;
  right: -8vw;
  top: 50%;
  transform: translateY(-50%);
  width: 60vw;
  height: 60vw;
  background: url('/klink-mark.svg') center / contain no-repeat;
  opacity: 0.06;
  pointer-events: none;
}
```

---

## 6.7 Live data panel (real-time pulse)

Monad `node.monad.xyz` referansı — **block execution time, TPS, validators** canlı sayaçlarla gösteriliyor. Yan tarafta küçük pulse light "LIVE" gösteriyor.

Klink karşılığı: mekan dashboard'da **canlı ciro/işlem akışı**:

```
┌────────────────────────────────────────┐
│  ● CANLI   Kafe Boğaz                  │ ← pulse animation
│                                        │
│  Son 5 dakika                          │
│  ┌────────────────────────────────┐   │
│  │ 14:32  Masa 4   +161₺  ✓      │   │
│  │ 14:30  Masa 7   +85₺   ✓      │   │
│  │ 14:28  Masa 2   +210₺  ✓      │   │
│  │ 14:25  Masa 1   +95₺   ✓      │   │
│  └────────────────────────────────┘   │
│                                        │
│  Bu saatte: 12 işlem · 1.450₺          │
└────────────────────────────────────────┘
```

- `●` pulse dot: green + 1.5s pulse
- Yeni satır: slide-in from top, 300ms
- Liste max 5 satır, eski oluyor fade out

---

## 6.8 Trilemma badge cluster (3-pointed visual)

Monad ana sayfada **Trilemma** bölümü: `Security · Decentralization · Scalability` üçlüsü iç içe geçmiş üç dairede. Klink karşılığı **3 kazanan** anlatımı:

```
        Mekan
       (komisyonsuz)
            │
            │
   Müşteri ─┼─ Çalışan
   (tek tap)  (anlık bahşiş)
```

3 daire üst üste, ortada Klink logosu. Her dairenin label'ı dışarıda, hover'da o dairenin pain'i ve çözümü açılıyor.

---

## 6.9 Footer pattern (dense link grid)

Monad footer: **5-6 sütun**, her sütunun üstünde küçük başlık, altında 4-6 link. Bu **enterprise/serious** hissi verir.

```
┌────────────────────────────────────────────────────────────────┐
│  Klink                                                          │
│                                                                 │
│  ÜRÜN          MEKAN          ÇALIŞAN       GELİŞTİRİCİ       │
│  Özellikler     Onboarding    Bahşiş         Docs              │
│  Demo           Komisyon       Off-ramp       GitHub           │
│  Fiyat          QR Sticker    SSS             API              │
│                                                                 │
│  ŞİRKET        SOSYAL                                          │
│  Hakkımızda    X (Twitter)                                     │
│  Blog          Discord                                          │
│  İletişim      Instagram                                       │
└────────────────────────────────────────────────────────────────┘
```

---

## 7. Motion / Animation

- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out)
- **Durations:**
  - `micro` 150ms — hover, focus, button press
  - `default` 300ms — modal, accordion
  - `slow` 500ms — hero entrance
  - `epic` 800ms — count-up, scroll reveal
- **Hover:** Subtle scale (1.02) + shadow intensify
- **Press:** Scale (0.98) + shadow soften
- **Loading:** Purple pulse (background: `rgba(110,84,255, 0.1 → 0.3)`)
- **Transaction confirm:** 1-2 saniye purple glow + checkmark fade-in
- **Number count-up:** scroll into view → animate from 0 to target (800ms cubic-bezier)
- **Live ping:** dot, 1.5s pulse infinite

---

## 8. Iconography

- **Set:** Lucide Icons (shadcn default)
- **Sizes:** 16-24px standart, 32-48px display
- **Stroke:** 2px
- **Color:** Inherit text color

---

## 9. Tailwind v4 theme (CSS)

`apps/web/app/globals.css`'te `@theme` directive ile tanımlanır (Next.js 16 + Tailwind v4 standardı):

```css
@import "tailwindcss";

@theme {
  /* Renkler */
  --color-monad-purple: #6E54FF;
  --color-monad-purple-soft: #836EF9;
  --color-monad-purple-hover: #4F47EB;
  --color-monad-purple-light: #EEE8FF;
  --color-monad-purple-pale: #D7D5FF;
  --color-bg-base: #FFFFFF;
  --color-bg-mute: #FBFAF9;
  --color-ink: #0A0A0A;
  --color-ink-soft: #18181B;
  --color-ink-link: #364153;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;

  /* Fontlar (next/font değişkenlerine bağlanır) */
  --font-sans: var(--font-inter);
  --font-mono: var(--font-roboto-mono);

  /* Border radius */
  --radius-pill: 9999px;
  --radius-xl: 24px;

  /* Shadow */
  --shadow-monad-button: rgba(0,0,0,0.2) 0px 1px 2px 0px, rgba(255,255,255,0.25) 0px 1px 0.5px 0px inset, rgba(255,255,255,0.25) 0px -1px 0.5px 0px inset, rgba(79,71,235,0.9) 0px 0px 0px 1px;
  --shadow-monad-card: 0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04);
  --shadow-monad-glow: 0 0 64px rgba(110,84,255,0.18);
}
```

---

## 10. Klink tone & voice

- **Türkçe net, jargonsuz** — direkt eylem dili
- **Doğrudan ve özlü** — "Hesabı Öde" → "Öde"; "Bahşiş Bırak" → "Bahşiş"
- **Türk F&B atmosferi** — yerel ama amatör değil
- **Performans vurgusu** — "1 saniyede ödeme", "anlık settlement"
- **Trust language** — "Komisyonsuz", "Adil bahşiş havuzu", "On-chain şeffaf"
- **Cesur ama mütevazı** — "Türkiye F&B'sinin yeni POS'u"; "POS'u yıkıyoruz" değil

### Mikro-copy örnekleri

| Bağlam | Kötü | İyi |
|---|---|---|
| Ödeme butonu | "Ödemeyi Onayla" | "Öde" |
| Bahşiş seçimi | "Bahşiş Bırakmak İster Misiniz?" | "Bahşiş" + presetler |
| Wallet kuruluyor | "Lütfen Bekleyiniz" | "Cüzdan kuruluyor… 3 sn" |
| Yetersiz bakiye | "İşlem Gerçekleşemedi" | "Bakiyen yetmiyor. Yükle." |
| Loyalty mint | "NFT Kazandınız" | "Sadakat mührün eklendi (3/10)" |

---

## 11. Klink layout breakdown (rota-bazlı)

### `/` (Landing)
Yukarıdan aşağı:
1. **Sticky nav** (Klink logo + 5 section link + "Demo" CTA)
2. **Hero** — display headline + dual CTA + watermark logo arka
3. **Stats strip** — 50K mekan / 5M çalışan / ~0₺ komisyon / <1sn settle
4. **Section: Çözüm** — eyebrow + H2 + paragraf + üç kart (mekan/müşteri/çalışan)
5. **Section: Nasıl çalışır?** — 4 adım numaralandırılmış (QR tara → email gir → öde → cüzdana akıyor)
6. **Section: Live demo** — mekan dashboard mock-up + live pulse
7. **App carousel** — "Klink'te ödeyebileceğin yerler" floating logo akışı
8. **Section: Trilemma** — 3 kazanan visual cluster
9. **CTA section** — "Mekanın için Klink iste" giant CTA bar
10. **Footer** — dense 5 sütun

### `/pay/[masaId]` (Müşteri)
```
┌──────────────────────────────┐
│  Klink logo  •  Mekan adı   │
│                              │
│   Mekan logosu (yuvarlak)    │
│   Masa No 4 — Adisyon        │
│   ┌────────────────────┐    │
│   │  2 espresso  60₺   │    │
│   │  1 cheesecake 80₺  │    │
│   │  ─────────────     │    │
│   │  Toplam     140₺   │    │
│   └────────────────────┘    │
│                              │
│   Bahşiş                     │
│   [%10] [%15] [%20] [Özel]   │
│                              │
│   ╔═════════════════════╗   │
│   ║  Öde (161₺)        ║   │
│   ╚═════════════════════╝   │
│                              │
│   Bakiyem: 320 ₺ (USDC)      │
│   [Bakiye Yükle]             │
└──────────────────────────────┘
```

### `/m/[mekanId]` (Mekan Dashboard)
- Üst: Klink logo + mekan adı + cüzdan adres badge + çıkış
- Stats strip (Bugün ciro / İşlem sayısı / Yeni müşteri / Bahşiş havuzu)
- Sol panel: Bahşiş havuzu (çalışan listesi + canlı dağılım)
- Orta panel: Live transaction feed (pulse animation)
- Sağ panel: Sadık müşteriler top 5
- Alt: Masa bazlı analytics (heatmap)

### `/staff` (Çalışan)
- Büyük metric: bugünkü bahşiş (mono 6xl)
- Sub-metric: hafta/ay
- Son işlemler listesi (live feed)
- "BtcTurk'e Çek" pill button

### `/onboard` (Mekan kayıt)
- Step indicator (1/4 progress bar)
- 1: Wallet bağla (Privy embedded veya MetaMask)
- 2: İşletme bilgisi (isim, vergi no, adres)
- 3: Bahşiş havuzu kuralı (Equal / Shift / Role weight) + çalışan cüzdanları
- 4: Masa sayısı + QR PDF download

---

## 12. Asset checklist

- [ ] Klink logo (geometrik, F&B'ye özel — kadeh/içecek motifi veya soyut mark)
- [ ] Klink logomark (sadece sembol, watermark için)
- [ ] Favicon (32x32, 16x16)
- [ ] OG image (1200x630) — landing için
- [ ] Hero gradient PNG/WEBP (subtle purple glow)
- [ ] Dot-grid pattern SVG (arkaplan)
- [ ] 6-8 fake mekan logosu (carousel için)
- [ ] Demo video (1080x1920 mobile)
- [ ] X paylaşım GIF (10-15 sn loop)

---

## 13. Yapma / yapma listesi

### ✅ YAP
- Büyük tipografik anlar (display 72-96px Hero)
- Büyük negatif boşluk (section'lar arası 96-128px)
- Mono numerik vurgu (her ihtimalde somut sayı göster)
- Watermark logo behind text (asimetrik derinlik)
- Eyebrow uppercase tiny labels
- Purple radial gradient + dot-grid background
- Live data pulse dotları
- Stats strip Hero'dan sonra (mono 4 sütun)
- Floating app/mekan carousel
- Sticky scroll-section nav (backdrop blur)

### ❌ YAPMA
- Generic stock illustration (Web3 abstract blobs)
- Glassmorphism overdose (Monad çok az kullanıyor)
- Neon gradient her yerde (purple disiplinli kalsın)
- Centered-card-on-empty-background "SaaS template" hissi
- Hover'da renk değiştiren her şey (transform-based motion tercih et)
- Tüm caps headline (Monad lowercase italic kullanıyor display'de)
- Drop shadows everywhere (sadece btn-primary ve card)
- Çoklu accent renk (purple TEK accent, diğer her şey nötr)
