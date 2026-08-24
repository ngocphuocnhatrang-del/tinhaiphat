"use client";

import { useLanguage } from "@/components/LanguageProvider";

const articleImages = [
  "/images/news-1.jpg",
  "/images/news-2.jpg",
  "/images/news-3.jpg",
  "/images/news-4.jpg",
];

export default function News() {
  const { t } = useLanguage();

  return (
    <section
      id="news"
      className="bg-[#f5f5f3] px-5 py-20 text-[#111820] lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* HEADING */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#c9932e]">
              {t.news.eyebrow}
            </p>

            <h2 className="mt-3 text-3xl font-extrabold uppercase md:text-4xl">
              {t.news.title}
            </h2>

            <div className="mt-5 h-[3px] w-14 bg-[#d7a53a]" />
          </div>

          <p className="max-w-[560px] text-[14px] leading-7 text-black/55 md:text-right">
            {t.news.description}
          </p>
        </div>

        {/* ARTICLES */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {t.news.items.map((article, index) => (
            <article
              key={article.title}
              className="group overflow-hidden border border-black/[0.06] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]"
            >
              {/* IMAGE */}
              <div className="relative h-[240px] overflow-hidden bg-[#d9d9d9]">
                <img
                  src={articleImages[index]}
                  alt={article.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="flex min-h-[290px] flex-col p-6">
                <h3 className="text-[16px] font-extrabold leading-7">
                  {article.title}
                </h3>

                <p className="mt-4 text-[13px] leading-7 text-black/55">
                  {article.excerpt}
                </p>

                <a
                  href="#contact"
                  className="mt-auto pt-6 text-[11px] font-extrabold uppercase tracking-[0.07em] text-[#c9932e]"
                >
                  {t.news.readMore} →
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* VIEW ALL */}
        <div className="mt-10 text-center">
          <a
            href="#news"
            className="inline-flex items-center border border-[#111820] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.06em] transition hover:border-[#d7a53a] hover:bg-[#d7a53a]"
          >
            {t.news.viewAll} →
          </a>
        </div>
      </div>
    </section>
  );
}