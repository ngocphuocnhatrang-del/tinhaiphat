"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function Commitments() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#0b1118] px-5 py-20 text-white lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-stretch">
          {/* LEFT */}
          <div className="flex flex-col justify-center">
            <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#d7a53a]">
              {t.commitments.eyebrow}
            </p>

            <h2 className="mt-4 text-3xl font-extrabold uppercase leading-[1.12] md:text-4xl xl:text-[44px]">
              {t.commitments.title}
              <br />
              <span className="text-[#d7a53a]">
                {t.commitments.brand}
              </span>
            </h2>

            <div className="mt-6 h-[3px] w-14 bg-[#d7a53a]" />

            <p className="mt-7 max-w-[480px] text-[15px] leading-8 text-white/60">
              {t.commitments.description}
            </p>
          </div>

          {/* RIGHT */}
          <div className="overflow-hidden border border-white/10">
            {t.commitments.items.map((item, index) => (
              <article
                key={item.title}
                className="group grid border-b border-white/10 bg-[#101923] p-6 transition duration-300 last:border-b-0 hover:bg-[#152331] md:grid-cols-[70px_210px_1fr_30px] md:items-center md:gap-5 lg:p-7"
              >
                <div className="text-[12px] font-extrabold tracking-[0.15em] text-[#d7a53a]">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="mt-3 text-[14px] font-extrabold uppercase md:mt-0">
                  {item.title}
                </h3>

                <p className="mt-3 text-[13px] leading-7 text-white/55 md:mt-0">
                  {item.description}
                </p>

                <div className="mt-4 text-[25px] font-light text-[#d7a53a]/35 transition duration-300 group-hover:text-[#d7a53a] md:mt-0 md:text-right">
                  +
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[760px] text-[14px] leading-7 text-white/55">
            {t.commitments.ctaText}
          </p>

          <a
            href="#contact"
            className="inline-flex shrink-0 items-center justify-center bg-[#d7a53a] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.05em] text-[#0b1118] transition hover:bg-[#e6b64d]"
          >
            {t.commitments.ctaButton} →
          </a>
        </div>
      </div>
    </section>
  );
}