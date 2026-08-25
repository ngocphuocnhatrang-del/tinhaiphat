"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { supabase } from "@/lib/supabase";

type DbProject = {
  id: number;
  title_vi: string;
  title_en: string | null;
  location_vi: string | null;
  location_en: string | null;
  type_vi: string | null;
  type_en: string | null;
  description_vi: string | null;
  description_en: string | null;
  area: string | null;
  scale: string | null;
  image_url: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
};

type DisplayProject = {
  id: number;
  title: string;
  location: string;
  type: string;
  description: string;
  area: string;
  scale: string;
  image: string;
  featured: boolean;
};

const pageContent = {
  vi: {
    heroLabel: "DỰ ÁN TÍN HẢI PHÁT",
    heroTitle1: "CÔNG TRÌNH",
    heroTitle2: "KIẾN TẠO GIÁ TRỊ",
    heroDescription:
      "Mỗi dự án là sự kết hợp giữa thiết kế, kỹ thuật thi công và cam kết về chất lượng lâu dài.",

    sectionLabel: "CÔNG TRÌNH THỰC TẾ",
    sectionTitle: "DỰ ÁN TIÊU BIỂU",
    sectionDescription:
      "Khám phá các công trình nhà phố, biệt thự, khách sạn và những dự án được Tín Hải Phát thiết kế và thi công.",

    filters: [
      { key: "all", label: "TẤT CẢ" },
      { key: "townhouse", label: "NHÀ PHỐ" },
      { key: "villa", label: "BIỆT THỰ" },
      { key: "hotel", label: "KHÁCH SẠN" },
    ],

    area: "DIỆN TÍCH",
    scale: "QUY MÔ",
    scope: "HẠNG MỤC",
    scopeDefault: "Thiết kế & thi công",
    viewDetail: "XEM CHI TIẾT",

    loading: "Đang tải dự án...",
    empty: "Hiện chưa có dự án trong danh mục này.",

    capabilityLabel: "NĂNG LỰC TRIỂN KHAI",
    capabilityTitle: "TỪ NHÀ Ở ĐẾN CÔNG TRÌNH THƯƠNG MẠI",
    capabilityDescription:
      "Tín Hải Phát triển khai nhiều loại hình công trình với quy trình kiểm soát thống nhất từ thiết kế đến thi công hoàn thiện.",

    capabilities: [
      "Nhà phố",
      "Biệt thự",
      "Khách sạn",
      "Nhà hàng",
      "Công trình thương mại",
      "Cải tạo & nội thất",
    ],

    ctaLabel: "DỰ ÁN CỦA BẠN",
    ctaTitle: "BẠN ĐANG CHUẨN BỊ XÂY DỰNG?",
    ctaDescription:
      "Liên hệ Tín Hải Phát để được tư vấn phương án thiết kế, thi công và ngân sách phù hợp.",
    ctaButton: "NHẬN TƯ VẤN",
  },

  en: {
    heroLabel: "TIN HAI PHAT PROJECTS",
    heroTitle1: "PROJECTS THAT",
    heroTitle2: "CREATE LASTING VALUE",
    heroDescription:
      "Every project combines thoughtful design, construction expertise and a long-term commitment to quality.",

    sectionLabel: "BUILT PROJECTS",
    sectionTitle: "FEATURED PROJECTS",
    sectionDescription:
      "Explore townhouses, villas, hotels and selected projects designed and built by Tin Hai Phat.",

    filters: [
      { key: "all", label: "ALL" },
      { key: "townhouse", label: "TOWNHOUSES" },
      { key: "villa", label: "VILLAS" },
      { key: "hotel", label: "HOTELS" },
    ],

    area: "AREA",
    scale: "SCALE",
    scope: "SCOPE",
    scopeDefault: "Design & construction",
    viewDetail: "VIEW DETAILS",

    loading: "Loading projects...",
    empty: "There are currently no projects in this category.",

    capabilityLabel: "PROJECT CAPABILITIES",
    capabilityTitle: "FROM RESIDENTIAL TO COMMERCIAL PROJECTS",
    capabilityDescription:
      "Tin Hai Phat delivers multiple project types through a consistent quality-control process from design to completion.",

    capabilities: [
      "Townhouses",
      "Villas",
      "Hotels",
      "Restaurants",
      "Commercial buildings",
      "Renovation & interiors",
    ],

    ctaLabel: "YOUR PROJECT",
    ctaTitle: "PLANNING TO BUILD?",
    ctaDescription:
      "Contact Tin Hai Phat for professional advice on design, construction and a suitable project budget.",
    ctaButton: "GET A CONSULTATION",
  },
};

export default function ProjectsPage() {
  const { language } = useLanguage();
  const content = pageContent[language];

  const [activeFilter, setActiveFilter] = useState("all");
  const [dbProjects, setDbProjects] = useState<DbProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setLoadingProjects(true);

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Load projects error:", error);
        setDbProjects([]);
        setLoadingProjects(false);
        return;
      }

      setDbProjects((data ?? []) as DbProject[]);
      setLoadingProjects(false);
    };

    loadProjects();
  }, []);

  const displayProjects = useMemo<DisplayProject[]>(() => {
    return dbProjects.map((project) => ({
      id: project.id,

      title:
        language === "vi"
          ? project.title_vi
          : project.title_en || project.title_vi,

      location:
        language === "vi"
          ? project.location_vi || ""
          : project.location_en || project.location_vi || "",

      type:
        language === "vi"
          ? project.type_vi || ""
          : project.type_en || project.type_vi || "",

      description:
        language === "vi"
          ? project.description_vi || ""
          : project.description_en ||
            project.description_vi ||
            "",

      area: project.area || "—",
      scale: project.scale || "—",

      image:
        project.image_url || "/images/project-1.jpg",

      featured: project.featured,
    }));
  }, [dbProjects, language]);

  const projects = useMemo(() => {
    if (activeFilter === "all") {
      return displayProjects;
    }

    return displayProjects.filter((project) => {
      const type = project.type.toLowerCase();

      if (activeFilter === "townhouse") {
        return (
          type.includes("nhà phố") ||
          type.includes("townhouse")
        );
      }

      if (activeFilter === "villa") {
        return (
          type.includes("biệt thự") ||
          type.includes("villa")
        );
      }

      if (activeFilter === "hotel") {
        return (
          type.includes("khách sạn") ||
          type.includes("hotel")
        );
      }

      return true;
    });
  }, [displayProjects, activeFilter]);

  return (
    <main className="bg-white">
      <Header />

      {/* HERO */}
      <section className="relative min-h-[560px] overflow-hidden bg-[#0b1118] pt-[72px] text-white lg:min-h-[650px] lg:pt-[76px]">
        <img
          src="/images/project-3.jpg"
          alt="Tin Hai Phat Projects"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071018]/95 via-[#071018]/65 to-[#071018]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071018]/75 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[488px] max-w-[1440px] items-center px-5 lg:min-h-[574px] lg:px-8">
          <div className="max-w-[820px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7a53a]">
              {content.heroLabel}
            </p>

            <h1 className="mt-5 text-[38px] font-extrabold uppercase leading-[1.05] sm:text-[52px] lg:text-[64px]">
              {content.heroTitle1}
              <br />

              <span className="text-[#d7a53a]">
                {content.heroTitle2}
              </span>
            </h1>

            <p className="mt-7 max-w-[650px] text-[14px] leading-7 text-white/75 sm:text-[16px] sm:leading-8">
              {content.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="bg-[#f5f5f3] px-5 py-16 text-[#111820] lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9932e]">
              {content.sectionLabel}
            </p>

            <h2 className="mt-4 text-[30px] font-extrabold uppercase sm:text-4xl">
              {content.sectionTitle}
            </h2>

            <div className="mx-auto mt-5 h-[3px] w-14 bg-[#d7a53a]" />

            <p className="mx-auto mt-6 max-w-[720px] text-[14px] leading-7 text-black/55">
              {content.sectionDescription}
            </p>
          </div>

          {/* FILTER */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {content.filters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.06em] transition ${
                  activeFilter === filter.key
                    ? "bg-[#d7a53a] text-[#0b1118]"
                    : "border border-black/10 bg-white text-black/55 hover:border-[#d7a53a] hover:text-[#c9932e]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* LOADING */}
          {loadingProjects && (
            <div className="mt-12 text-center">
              <p className="text-[13px] text-black/45">
                {content.loading}
              </p>
            </div>
          )}

          {/* EMPTY */}
          {!loadingProjects && projects.length === 0 && (
            <div className="mt-12 border border-black/10 bg-white px-6 py-12 text-center">
              <p className="text-[13px] text-black/45">
                {content.empty}
              </p>
            </div>
          )}

          {/* GRID */}
          {!loadingProjects && projects.length > 0 && (
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="group overflow-hidden bg-white shadow-[0_10px_35px_rgba(0,0,0,0.05)]"
                >
                  <div className="relative h-[320px] overflow-hidden sm:h-[380px]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {project.type && (
                      <span className="absolute left-5 top-5 bg-[#d7a53a] px-3 py-2 text-[10px] font-extrabold uppercase text-[#0b1118]">
                        {project.type}
                      </span>
                    )}

                    {project.featured && (
                      <span className="absolute right-5 top-5 bg-[#0b1118]/90 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.05em] text-white">
                        {language === "vi"
                          ? "Tiêu biểu"
                          : "Featured"}
                      </span>
                    )}
                  </div>

                  <div className="p-6 lg:p-7">
                    <h3 className="text-[19px] font-extrabold uppercase">
                      {project.title}
                    </h3>

                    {project.location && (
                      <p className="mt-2 text-[13px] text-black/45">
                        {project.location}
                      </p>
                    )}

                    {project.description && (
                      <p className="mt-5 text-[13px] leading-7 text-black/55">
                        {project.description}
                      </p>
                    )}

                    <div className="mt-6 grid gap-3 border-t border-black/10 pt-5 sm:grid-cols-3">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-black/35">
                          {content.area}
                        </p>

                        <p className="mt-1 text-[12px] font-bold">
                          {project.area}
                        </p>
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-black/35">
                          {content.scale}
                        </p>

                        <p className="mt-1 text-[12px] font-bold">
                          {project.scale}
                        </p>
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-black/35">
                          {content.scope}
                        </p>

                        <p className="mt-1 text-[12px] font-bold">
                          {content.scopeDefault}
                        </p>
                      </div>
                    </div>

                    <a
                      href="/lien-he"
                      className="mt-6 inline-flex items-center text-[11px] font-extrabold uppercase tracking-[0.07em] text-[#c9932e]"
                    >
                      {content.viewDetail} →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CAPABILITY */}
      <section className="bg-[#0b1118] px-5 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7a53a]">
              {content.capabilityLabel}
            </p>

            <h2 className="mt-4 text-[30px] font-extrabold uppercase leading-[1.15] sm:text-4xl">
              {content.capabilityTitle}
            </h2>

            <div className="mt-6 h-[3px] w-14 bg-[#d7a53a]" />

            <p className="mt-6 max-w-[520px] text-[14px] leading-7 text-white/55">
              {content.capabilityDescription}
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {content.capabilities.map((item, index) => (
              <div
                key={item}
                className="flex min-h-[90px] items-center gap-4 bg-[#101923] px-6 py-5"
              >
                <span className="text-[11px] font-extrabold text-[#d7a53a]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-[13px] font-extrabold uppercase">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#d7a53a] px-5 py-14 text-[#0b1118] lg:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] opacity-60">
              {content.ctaLabel}
            </p>

            <h2 className="mt-3 text-[27px] font-extrabold uppercase leading-[1.15] sm:text-[34px]">
              {content.ctaTitle}
            </h2>

            <p className="mt-4 max-w-[700px] text-[14px] leading-7 opacity-70">
              {content.ctaDescription}
            </p>
          </div>

          <a
            href="/lien-he"
            className="inline-flex shrink-0 items-center justify-center bg-[#0b1118] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-white hover:text-[#0b1118]"
          >
            {content.ctaButton} →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}