"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

const ease = [0.4, 0, 0.2, 1] as const;

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 50%, rgba(110,84,255,0.45), transparent 50%), radial-gradient(circle at 80% 50%, rgba(131,110,249,0.25), transparent 50%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease }}
        >
          <Eyebrow className="text-monad-purple-pale">/ BAŞLA</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.04] tracking-tight text-white md:text-6xl">
            Mekanın için Klink istiyor musun?
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-balance text-lg text-white/70">
            10 dakikada kayıt. QR sticker'ı yazıcıdan al, masaya yapıştır.
            İlk ödemen bu akşam gelir.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/onboard">
              <Button size="lg" className="gap-2.5">
                Mekanım için Klink İste
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pay/demo">
              <Button
                variant="dark"
                size="lg"
                className="gap-2.5 border border-white/15 bg-white/[0.04] backdrop-blur hover:bg-white/[0.08]"
              >
                Müşteri Demo'su
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
