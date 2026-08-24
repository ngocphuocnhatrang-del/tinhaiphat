"use client";

import { useLanguage } from "@/components/LanguageProvider";

const directors = [
  {
    name: "NGÔ TƯỜNG THỌ",
    positionKey: "executiveDirector" as const,
    phone: "0943666866",
    displayPhone: "0943 666 866",
    image: "/images/director-1.jpg",
  },
  {
    name: "NGUYỄN MINH ANH",
    positionKey: "generalDirector" as const,
    phone: "0900000002",
    displayPhone: "0900 000 002",
    image: "/images/director-2.jpg",
  },
];

export default function BoardOfDirectors() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#f5f5f3] px-4 py-10 text-[#111820] sm:px-5 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c9932e] sm:text-[11px]">
            {t.board.eyebrow}
          </p>

          <h2 className="mt-2 text-[26px] font-extrabold uppercase leading-[1.1] md:text-[32px]">
            {t.board.title}
          </h2>

          <div className="mx-auto mt-3 h-[3px] w-12 bg-[#d7a53a]" />

          <p className="mx-auto mt-4 max-w-[620px] text-[12px] leading-5 text-black/55 sm:text-[13px]">
            {t.board.description}
          </p>
        </div>

        <div className="mx-auto mt-7 grid max-w-[720px] gap-5 md:grid-cols-2">
          {directors.map((director) => (
            <article
              key={director.name}
              className="group overflow-hidden bg-white shadow-[0_8px_25px_rgba(0,0,0,0.06)]"
            >
              <div className="relative h-[240px] overflow-hidden bg-[#d8d8d8] sm:h-[260px] lg:h-[280px]">
                <img
                  src={director.image}
                  alt={director.name}
                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                />

                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <div className="border-t-[3px] border-[#d7a53a] px-4 py-4 text-center">
                <h3 className="text-[15px] font-extrabold uppercase tracking-[0.02em]">
                  {director.name}
                </h3>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.13em] text-[#c9932e]">
                  {t.board.positions[director.positionKey]}
                </p>

                <a
                  href={`tel:${director.phone}`}
                  className="mt-3 inline-flex items-center justify-center gap-2 border border-black/10 px-4 py-2 text-[12px] font-bold transition hover:border-[#d7a53a] hover:bg-[#d7a53a]"
                >
                  <span>☎</span>
                  <span>{director.displayPhone}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}