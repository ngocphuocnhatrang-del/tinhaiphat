"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { supabase } from "@/lib/supabase";

type NewsItem = {
  id: number;
  title_vi: string;
  title_en: string | null;
  slug: string;
  excerpt_vi: string | null;
  excerpt_en: string | null;
  content_vi: string | null;
  content_en: string | null;
  category_vi: string | null;
  category_en: string | null;
  image_url: string | null;
  published_at: string | null;
};

export default function NewsDetailPage() {
  const params = useParams();
  const { language } = useLanguage();

  const [article, setArticle] =
    useState<NewsItem | null>(null);

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug;

  useEffect(() => {
    if (!slug) return;

    const loadArticle = async () => {
      setLoading(true);
      setNotFound(false);

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
            content_vi,
            content_en,
            category_vi,
            category_en,
            image_url,
            published_at
          `,
        )
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (error) {
        console.error("Load article error:", error);
        setNotFound(true);
        setLoading(false);
        return;
      }

      if (!data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setArticle(data as NewsItem);
      setLoading(false);
    };

    loadArticle();
  }, [slug]);

  const title =
    language === "en"
      ? article?.title_en || article?.title_vi
      : article?.title_vi;

  const excerpt =
    language === "en"
      ? article?.excerpt_en ||
        article?.excerpt_vi ||
        ""
      : article?.excerpt_vi || "";

  const articleContent =
    language === "en"
      ? article?.content_en ||
        article?.content_vi ||
        ""
      : article?.content_vi || "";

  const category =
    language === "en"
      ? article?.category_en ||
        article?.category_vi ||
        ""
      : article?.category_vi || "";

  const formatDate = (date: string | null) => {
    if (!date) return "";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "";
    }

    return new Intl.DateTimeFormat(
      language === "vi" ? "vi-VN" : "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      },
    ).format(parsed);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />

        <div className="flex min-h-[600px] items-center justify-center pt-[90px]">
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-black/40">
            {language === "vi"
              ? "Đang tải bài viết..."
              : "Loading article..."}
          </p>
        </div>

        <Footer />
      </main>
    );
  }

  if (notFound || !article) {
    return (
      <main className="min-h-screen bg-white">
        <Header />

        <div className="flex min-h-[600px] flex-col items-center justify-center px-5 pt-[90px] text-center">
          <h1 className="text-3xl font-extrabold uppercase text-[#111820]">
            {language === "vi"
              ? "Không tìm thấy bài viết"
              : "Article not found"}
          </h1>

          <a
            href="/tin-tuc"
            className="mt-7 bg-[#d7a53a] px-6 py-3 text-[11px] font-extrabold uppercase text-[#111820]"
          >
            ←{" "}
            {language === "vi"
              ? "Quay lại tin tức"
              : "Back to news"}
          </a>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-white">
      <Header />

      {/* HERO */}
      <section className="relative min-h-[480px] overflow-hidden bg-[#0b1118] pt-[72px] text-white lg:min-h-[570px] lg:pt-[76px]">
        <img
          src={
            article.image_url ||
            "/images/news-1.jpg"
          }
          alt={title || ""}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071018]/95 via-[#071018]/75 to-[#071018]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071018]/85 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[408px] max-w-[1200px] items-center px-5 lg:min-h-[494px] lg:px-8">
          <div className="max-w-[850px]">
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-[0.12em]">
              <span className="text-[#d7a53a]">
                {category}
              </span>

              <span className="text-white/45">
                {formatDate(
                  article.published_at,
                )}
              </span>
            </div>

            <h1 className="mt-5 text-[34px] font-extrabold uppercase leading-[1.15] sm:text-[44px] lg:text-[52px]">
              {title}
            </h1>

            {excerpt && (
              <p className="mt-6 max-w-[760px] text-[14px] leading-7 text-white/70 sm:text-[16px]">
                {excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ARTICLE */}
      <section className="px-5 py-14 text-[#111820] lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[900px]">
          <a
            href="/tin-tuc"
            className="inline-flex items-center text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#c9932e]"
          >
            ←{" "}
            {language === "vi"
              ? "Tin tức"
              : "News"}
          </a>

          <article className="mt-8">
            <div className="h-[3px] w-14 bg-[#d7a53a]" />

            <div className="mt-8 whitespace-pre-line text-[15px] leading-[2] text-black/70 sm:text-[16px]">
              {articleContent}
            </div>
          </article>

          {/* CONTACT CTA */}
          <div className="mt-14 border border-black/10 bg-[#f5f5f3] p-7 sm:p-9">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9932e]">
              {language === "vi"
                ? "TÍN HẢI PHÁT"
                : "TIN HAI PHAT"}
            </p>

            <h2 className="mt-3 text-[22px] font-extrabold uppercase">
              {language === "vi"
                ? "Bạn đang chuẩn bị xây dựng?"
                : "Planning a construction project?"}
            </h2>

            <p className="mt-4 max-w-[650px] text-[14px] leading-7 text-black/55">
              {language === "vi"
                ? "Trao đổi trực tiếp với Tín Hải Phát để được tư vấn phương án thiết kế, thi công và dự toán phù hợp."
                : "Talk directly with Tin Hai Phat for advice on design, construction and suitable cost estimates."}
            </p>

            <a
              href="/lien-he"
              className="mt-6 inline-flex bg-[#d7a53a] px-6 py-3.5 text-[11px] font-extrabold uppercase text-[#111820]"
            >
              {language === "vi"
                ? "NHẬN TƯ VẤN"
                : "GET A CONSULTATION"}{" "}
              →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}