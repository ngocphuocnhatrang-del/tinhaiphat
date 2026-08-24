"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#0b1016] pt-[72px] lg:pt-[76px]"
    >
      <div
        className="absolute inset-0 bg-cover bg-[58%_center] sm:bg-center"
        style={{
          backgroundImage:
            "url('/images/tin-hai-phat-headquarters.png')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#071018]/88 via-[#071018]/55 to-[#071018]/15 sm:from-[#071018]/78 sm:via-[#071018]/38 sm:to-[#071018]/5" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#071018]/60 via-transparent to-transparent sm:from-[#071018]/45" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] max-w-[1440px] items-start px-4 pb-[235px] pt-20 sm:px-5 sm:pb-[220px] sm:pt-24 lg:min-h-[calc(100vh-76px)] lg:items-center lg:px-8 lg:pb-0 lg:pt-0">
        <div className="max-w-[700px] lg:py-16">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d7a53a] sm:mb-5 sm:text-sm sm:tracking-[0.28em]">
            {t.hero.eyebrow}
          </p>

          <h1 className="max-w-[360px] text-[32px] font-bold uppercase leading-[1.08] tracking-[-0.015em] text-white sm:max-w-none sm:text-[46px] sm:leading-[1.12] lg:text-[54px]">
            {t.hero.line1}
            <br />
            {t.hero.line2}
            <br />

            <span className="text-[#d7a53a]">
              {t.hero.line3}
              <br />
              {t.hero.line4}
            </span>
          </h1>

          <p className="mt-5 max-w-[340px] text-[13px] font-medium leading-6 text-white/85 sm:mt-7 sm:max-w-[620px] sm:text-[16px] sm:leading-8">
            {t.hero.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3 sm:mt-9 sm:gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#d7a53a] px-5 py-3 text-[11px] font-bold uppercase text-[#071018] transition hover:bg-[#e8bb58] sm:gap-3 sm:px-7 sm:py-4 sm:text-sm"
            >
              {t.hero.quote}
              <span>→</span>
            </a>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 border border-white/60 px-5 py-3 text-[11px] font-bold uppercase text-white transition hover:border-[#d7a53a] hover:text-[#d7a53a] sm:gap-3 sm:px-7 sm:py-4 sm:text-sm"
            >
              {t.hero.projects}
              <span>→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="mx-auto max-w-[1440px] px-4 pb-4 sm:px-5 sm:pb-6 lg:px-8">
          <div className="grid grid-cols-2 border border-[#d7a53a]/40 bg-[#091019]/94 backdrop-blur-md md:grid-cols-4">
            <div className="min-h-[105px] border-b border-r border-white/10 px-4 py-4 sm:px-5 sm:py-5 md:border-b-0">
              <div className="text-[24px] font-extrabold leading-none text-[#d7a53a] sm:text-3xl">
                10+
              </div>

              <div className="mt-2 text-[9px] font-semibold uppercase leading-4 text-white/75 sm:text-xs">
                {t.hero.experience}
              </div>
            </div>

            <div className="min-h-[105px] border-b border-white/10 px-4 py-4 sm:px-5 sm:py-5 md:border-b-0 md:border-r">
              <div className="text-[24px] font-extrabold leading-none text-[#d7a53a] sm:text-3xl">
                250+
              </div>

              <div className="mt-2 text-[9px] font-semibold uppercase leading-4 text-white/75 sm:text-xs">
                {t.hero.completed}
              </div>
            </div>

            <div className="min-h-[105px] border-r border-white/10 px-4 py-4 sm:px-5 sm:py-5">
              <div className="text-[24px] font-extrabold leading-none text-[#d7a53a] sm:text-3xl">
                50+
              </div>

              <div className="mt-2 text-[9px] font-semibold uppercase leading-4 text-white/75 sm:text-xs">
                {t.hero.engineers}
              </div>
            </div>

            <div className="min-h-[105px] px-4 py-4 sm:px-5 sm:py-5">
              <div className="text-[24px] font-extrabold leading-none text-[#d7a53a] sm:text-3xl">
                500+
              </div>

              <div className="mt-2 text-[9px] font-semibold uppercase leading-4 text-white/75 sm:text-xs">
                {t.hero.customers}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}