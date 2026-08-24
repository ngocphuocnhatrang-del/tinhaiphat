"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function WorkProcess() {
  const { t } = useLanguage();

  return (
    <section
      id="process"
      className="bg-[#f5f5f3] px-4 py-14 text-[#111820] sm:px-5 sm:py-16 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#c9932e] sm:text-[12px] sm:tracking-[0.3em]">
            {t.process.eyebrow}
          </p>

          <h2 className="text-[28px] font-extrabold uppercase leading-[1.1] md:text-4xl">
            {t.process.title}
          </h2>

          <div className="mx-auto mt-4 h-[3px] w-12 bg-[#d7a53a] sm:mt-5 sm:w-14" />

          <p className="mx-auto mt-5 max-w-[720px] text-[13px] leading-6 text-black/60 sm:mt-6 sm:text-[15px] sm:leading-7">
            {t.process.description}
          </p>
        </div>

        {/* MOBILE TIMELINE */}
        <div className="relative mt-10 lg:hidden">
          <div className="absolute bottom-8 left-[27px] top-8 w-px bg-[#d7a53a]/35" />

          <div className="space-y-7">
            {t.process.items.map((step, index) => (
              <div
                key={step.title}
                className="relative grid grid-cols-[56px_1fr] gap-4"
              >
                <div className="relative z-10 flex h-[56px] w-[56px] items-center justify-center rounded-full border border-[#d7a53a] bg-[#f5f5f3]">
                  <span className="text-[13px] font-extrabold text-[#c9932e]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="pt-1">
                  <h3 className="text-[13px] font-extrabold leading-5">
                    {step.title}
                  </h3>

                  <p className="mt-2 max-w-[260px] text-[12px] leading-5 text-black/55">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP */}
        <div className="relative mt-14 hidden lg:block">
          <div className="absolute left-0 right-0 top-[42px] h-px bg-[#d7a53a]/35" />

          <div className="grid grid-cols-7 gap-6">
            {t.process.items.map((step, index) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-[84px] w-[84px] items-center justify-center rounded-full border border-[#d7a53a] bg-[#f5f5f3]">
                  <span className="text-[18px] font-extrabold text-[#c9932e]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 min-h-[48px] text-[13px] font-extrabold leading-6">
                  {step.title}
                </h3>

                <p className="mt-2 max-w-[180px] text-[12px] leading-6 text-black/55">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}