"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { supabase } from "@/lib/supabase";

type Director = {
  id: number;
  name_vi: string;
  name_en: string | null;
  position_vi: string | null;
  position_en: string | null;
  description_vi: string | null;
  description_en: string | null;
  image_url: string | null;
  phone: string | null;
  display_order: number;
};

export default function BoardOfDirectors() {
  const { language, t } = useLanguage();

  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDirectors = async () => {
      const { data, error } = await supabase
        .from("management_team")
        .select(
          `
            id,
            name_vi,
            name_en,
            position_vi,
            position_en,
            description_vi,
            description_en,
            image_url,
            phone,
            display_order
          `,
        )
        .eq("published", true)
        .order("display_order", {
          ascending: true,
        })
        .order("id", {
          ascending: true,
        });

      if (error) {
        console.error(
          "Load management team error:",
          error,
        );

        setDirectors([]);
        setLoading(false);
        return;
      }

      const sortedDirectors = ((data ?? []) as Director[]).sort(
  (a, b) =>
    Number(a.display_order ?? 999) -
    Number(b.display_order ?? 999)
);

setDirectors(sortedDirectors);
      setLoading(false);
    };

    loadDirectors();
  }, []);

  const formatPhone = (phone: string) => {
    const clean = phone.replace(/\D/g, "");

    if (clean.length === 10) {
      return `${clean.slice(0, 4)} ${clean.slice(
        4,
        7,
      )} ${clean.slice(7)}`;
    }

    return phone;
  };

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

        {loading && (
          <div className="py-14 text-center text-[12px] text-black/35">
            {language === "vi"
              ? "Đang tải Ban giám đốc..."
              : "Loading Board of Directors..."}
          </div>
        )}

        {!loading && directors.length === 0 && (
          <div className="py-14 text-center text-[12px] text-black/35">
            {language === "vi"
              ? "Chưa có thông tin Ban giám đốc."
              : "No management information yet."}
          </div>
        )}

        {!loading && directors.length > 0 && (
          <div
  className={`mx-auto mt-7 grid gap-5 ${
    directors.length === 1
      ? "max-w-[360px] grid-cols-1"
      : directors.length === 2
        ? "max-w-[720px] grid-cols-1 md:grid-cols-2"
        : directors.length === 3
          ? "max-w-[1080px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "max-w-[1080px] grid-cols-1 md:grid-cols-2"
  }`}
>
            {directors.map((director) => {
              const name =
                language === "en"
                  ? director.name_en ||
                    director.name_vi
                  : director.name_vi;

              const position =
                language === "en"
                  ? director.position_en ||
                    director.position_vi ||
                    ""
                  : director.position_vi || "";

              const description =
                language === "en"
                  ? director.description_en ||
                    director.description_vi ||
                    ""
                  : director.description_vi || "";

              return (
                <article
                  key={director.id}
                  className="group overflow-hidden bg-white shadow-[0_8px_25px_rgba(0,0,0,0.06)]"
                >
                  <div className="relative h-[240px] overflow-hidden bg-[#d8d8d8] sm:h-[250px] lg:h-[260px]">
                    {director.image_url ? (
                      <img
                        src={director.image_url}
                        alt={name}
                        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[50px] text-black/15">
                        ♟
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  <div className="border-t-[3px] border-[#d7a53a] px-4 py-4 text-center">
                    <h3 className="text-[15px] font-extrabold uppercase tracking-[0.02em]">
                      {name}
                    </h3>

                    {position && (
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.13em] text-[#c9932e]">
                        {position}
                      </p>
                    )}

                    {description && (
                      <p className="mx-auto mt-3 max-w-[300px] text-[11px] leading-5 text-black/50">
                        {description}
                      </p>
                    )}

                    {director.phone && (
                      <a
                        href={`tel:${director.phone.replace(
                          /\D/g,
                          "",
                        )}`}
                        className="mt-3 inline-flex items-center justify-center gap-2 border border-black/10 px-4 py-2 text-[12px] font-bold transition hover:border-[#d7a53a] hover:bg-[#d7a53a]"
                      >
                        <span>☎</span>

                        <span>
                          {formatPhone(
                            director.phone,
                          )}
                        </span>
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}