"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function About() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="overflow-hidden bg-white text-[#101820]"
    >
      <div className="grid lg:grid-cols-2">
        {/* IMAGE */}
        <div className="relative min-h-[500px] lg:min-h-[720px]">
          <img
            src="/images/about-tin-hai-phat.jpg"
            alt="Tin Hai Phat Construction"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

          <div className="absolute bottom-8 left-8 border-l-[3px] border-[#d7a53a] pl-5 text-white md:bottom-12 md:left-12">
            <div className="text-[42px] font-extrabold leading-none text-[#e1ab3c]">
              10+
            </div>

            <div className="mt-2 text-[12px] font-bold uppercase tracking-[0.16em]">
              {t.about.years}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex items-center px-6 py-16 md:px-12 lg:px-16 lg:py-20 xl:px-20">
          <div className="max-w-[680px]">
            <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#c9932e]">
              {t.about.eyebrow}
            </p>

            <h2 className="mt-4 text-3xl font-extrabold uppercase leading-[1.15] md:text-4xl xl:text-[42px]">
              {t.about.title}
              <br />

              <span className="whitespace-nowrap text-[#c9932e]">
                {t.about.slogan}
              </span>
            </h2>

            <div className="mt-6 h-[3px] w-14 bg-[#d7a53a]" />

            <p className="mt-7 text-[15px] leading-8 text-black/65">
              {t.about.paragraph1}
            </p>

            <p className="mt-4 text-[15px] leading-8 text-black/65">
              {t.about.paragraph2}
            </p>

            <div className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {t.about.strengths.map((item, index) => (
                <div
                  key={item.title}
                  className="border-t border-black/10 pt-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-extrabold text-[#c9932e]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="text-[13px] font-extrabold">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-[13px] leading-6 text-black/55">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-10 inline-flex items-center bg-[#111820] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-[#d7a53a] hover:text-[#111820]"
            >
              {t.about.button} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}