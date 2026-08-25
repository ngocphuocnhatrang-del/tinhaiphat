"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { supabase } from "@/lib/supabase";

type NewsItem = {
  id: number;
  title_vi: string;
  title_en: string | null;
  slug: string;
  excerpt_vi: string | null;
  excerpt_en: string | null;
  image_url: string | null;
  published: boolean;
  published_at: string | null;
};

type DisplayArticle = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  image: string;
};

export default function News() {
  const { language, t } = useLanguage();

  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("news")
        .select(
          `
            id,
            title_vi,
            title_en,
            slug,
            excerpt_vi,
            excerpt_en,
            image_url,
            published,
            published_at
          `,
        )
        .eq("published", true)
        .order("published_at", {
          ascending: false,
        })
        .limit(4);

      if (error) {
        console.error("Load home news error:", error);
        setItems([]);
        setLoading(false);
        return;
      }

      setItems((data ?? []) as NewsItem[]);
      setLoading(false);
    };

    loadNews();
  }, []);

  const articles = useMemo<DisplayArticle[]>(() => {
    return items.map((article) => ({
      id: article.id,

      title:
        language === "en"
          ? article.title_en || article.title_vi
          : article.title_vi,

      excerpt:
        language === "en"
          ? article.excerpt_en ||
            article.excerpt_vi ||
            ""
          : article.excerpt_vi || "",

      slug: article.slug,

      image:
        article.image_url ||
        "/images/news-1.jpg",
    }));
  }, [items, language]);

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

        {/* LOADING */}
        {loading && (
          <div className="py-16 text-center">
            <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-black/35">
              {language === "vi"
                ? "Đang tải bài viết..."
                : "Loading articles..."}
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && articles.length === 0 && (
          <div className="mt-12 border border-black/10 bg-white px-6 py-12 text-center">
            <p className="text-[13px] text-black/45">
              {language === "vi"
                ? "Chưa có bài viết nào."
                : "No articles yet."}
            </p>
          </div>
        )}

        {/* ARTICLES */}
        {!loading && articles.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {articles.map((article) => (
              <article
                key={article.id}
                className="group overflow-hidden border border-black/[0.06] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]"
              >
                {/* IMAGE */}
                <div className="relative h-[240px] overflow-hidden bg-[#d9d9d9]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex min-h-[290px] flex-col p-6">
                  <h3 className="text-[16px] font-extrabold leading-7">
                    {article.title}
                  </h3>

                  {article.excerpt && (
                    <p className="mt-4 text-[13px] leading-7 text-black/55">
                      {article.excerpt}
                    </p>
                  )}

                  <a
                    href={`/tin-tuc/${article.slug}`}
                    className="mt-auto pt-6 text-[11px] font-extrabold uppercase tracking-[0.07em] text-[#c9932e]"
                  >
                    {t.news.readMore} →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* VIEW ALL */}
        <div className="mt-10 text-center">
          <a
            href="/tin-tuc"
            className="inline-flex items-center border border-[#111820] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.06em] transition hover:border-[#d7a53a] hover:bg-[#d7a53a]"
          >
            {t.news.viewAll} →
          </a>
        </div>
      </div>
    </section>
  );
}