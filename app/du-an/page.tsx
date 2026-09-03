"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { supabase } from "@/lib/supabase";

type ProjectStatus = "REFERENCE" | "IN_PROGRESS" | "COMPLETED";

type DbProject = {
  id: number;
  title_vi: string;
  title_en: string | null;
  location_vi: string | null;
  location_en: string | null;
  type_vi: string | null;
  type_en: string | null;
  area: string | null;
  scale: string | null;
  image_url: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  project_code: string | null;
  project_status: ProjectStatus | null;
};

type DisplayProject = {
  id: number;
  title: string;
  location: string;
  type: string;
  area: string;
  scale: string;
  image: string;
  featured: boolean;
  projectCode: string;
  projectStatus: ProjectStatus;
};

const pageContent = {
  vi: {
    heroLabel: "DỰ ÁN TÍN HẢI PHÁT",
    heroTitle1: "CÔNG TRÌNH",
    heroTitle2: "KIẾN TẠO GIÁ TRỊ",
    heroDescription:
      "Mỗi dự án là sự kết hợp giữa thiết kế, kỹ thuật thi công và cam kết về chất lượng lâu dài.",
    sectionLabel: "HỒ SƠ CÔNG TRÌNH",
    sectionTitle: "DỰ ÁN TIÊU BIỂU",
    sectionDescription:
      "Khám phá các dự án của Tín Hải Phát theo loại hình và trạng thái triển khai.",
    filters: [
      { key: "all", label: "TẤT CẢ" },
      { key: "townhouse", label: "NHÀ PHỐ" },
      { key: "villa", label: "BIỆT THỰ" },
      { key: "hotel", label: "KHÁCH SẠN" },
      { key: "restaurant", label: "NHÀ HÀNG" },
      { key: "interior", label: "NỘI THẤT" },
    ],
    loading: "Đang tải dự án...",
    empty: "Hiện chưa có dự án trong danh mục này.",
    inProgress: "ĐANG THỰC HIỆN",
    completed: "ĐÃ HOÀN THÀNH",
    reference: "DỰ ÁN THAM KHẢO",
    emptyInProgress: "Hiện chưa có dự án đang thực hiện.",
    emptyCompleted: "Hiện chưa có dự án đã hoàn thành.",
    emptyReference: "Hiện chưa có dự án tham khảo.",
    viewDetail: "XEM DỰ ÁN",
    area: "DIỆN TÍCH",
    scale: "QUY MÔ",
    featured: "TIÊU BIỂU",
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
    sectionLabel: "PROJECT PORTFOLIO",
    sectionTitle: "FEATURED PROJECTS",
    sectionDescription:
      "Explore Tin Hai Phat projects by project type and implementation status.",
    filters: [
      { key: "all", label: "ALL" },
      { key: "townhouse", label: "TOWNHOUSES" },
      { key: "villa", label: "VILLAS" },
      { key: "hotel", label: "HOTELS" },
      { key: "restaurant", label: "RESTAURANTS" },
      { key: "interior", label: "INTERIORS" },
    ],
    loading: "Loading projects...",
    empty: "There are currently no projects in this category.",
    inProgress: "IN PROGRESS",
    completed: "COMPLETED",
    reference: "REFERENCE PROJECTS",
    emptyInProgress: "There are currently no projects in progress.",
    emptyCompleted: "There are currently no completed projects.",
    emptyReference: "There are currently no reference projects.",
    viewDetail: "VIEW PROJECT",
    area: "AREA",
    scale: "SCALE",
    featured: "FEATURED",
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
        .select(`
          id,
          title_vi,
          title_en,
          location_vi,
          location_en,
          type_vi,
          type_en,
          area,
          scale,
          image_url,
          featured,
          published,
          sort_order,
          created_at,
          project_code,
          project_status
        `)
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
      area: project.area || "—",
      scale: project.scale || "—",
      image: project.image_url || "/images/project-1.jpg",
      featured: project.featured,
      projectCode: project.project_code || "",
      projectStatus:
        project.project_status === "IN_PROGRESS" ||
        project.project_status === "COMPLETED"
          ? project.project_status
          : "REFERENCE",
    }));
  }, [dbProjects, language]);

  const projects = useMemo(() => {
    if (activeFilter === "all") return displayProjects;

    return displayProjects.filter((project) => {
      const type = project.type.toLowerCase();

      if (activeFilter === "townhouse") {
        return type.includes("nhà phố") || type.includes("townhouse");
      }
      if (activeFilter === "villa") {
        return type.includes("biệt thự") || type.includes("villa");
      }
      if (activeFilter === "hotel") {
        return type.includes("khách sạn") || type.includes("hotel");
      }
      if (activeFilter === "restaurant") {
        return type.includes("nhà hàng") || type.includes("restaurant");
      }
      if (activeFilter === "interior") {
        return (
          type.includes("nội thất") ||
          type.includes("interior") ||
          type.includes("renovation")
        );
      }

      return true;
    });
  }, [displayProjects, activeFilter]);

  const groups = [
    {
      status: "IN_PROGRESS" as ProjectStatus,
      title: content.inProgress,
      emptyText: content.emptyInProgress,
    },
    {
      status: "COMPLETED" as ProjectStatus,
      title: content.completed,
      emptyText: content.emptyCompleted,
    },
    {
      status: "REFERENCE" as ProjectStatus,
      title: content.reference,
      emptyText: content.emptyReference,
    },
  ];

  return (
    <main className="bg-white">
      <Header />

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
              <span className="text-[#d7a53a]">{content.heroTitle2}</span>
            </h1>
            <p className="mt-7 max-w-[650px] text-[14px] leading-7 text-white/75 sm:text-[16px] sm:leading-8">
              {content.heroDescription}
            </p>
          </div>
        </div>
      </section>

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

          {loadingProjects && (
            <div className="mt-12 text-center">
              <p className="text-[13px] text-black/45">{content.loading}</p>
            </div>
          )}

          {!loadingProjects && projects.length === 0 && (
            <div className="mt-12 border border-black/10 bg-white px-6 py-12 text-center">
              <p className="text-[13px] text-black/45">{content.empty}</p>
            </div>
          )}

          {!loadingProjects &&
            groups.map((group) => {
              const groupProjects = projects.filter(
                (project) => project.projectStatus === group.status,
              );

              return (
                <div key={group.status} className="mt-14">
                  <div className="mb-7 flex items-center gap-4">
                    <div className="h-px flex-1 bg-black/10" />
                    <h3 className="shrink-0 text-center text-[18px] font-extrabold uppercase tracking-[0.05em] sm:text-[22px]">
                      {group.title}
                    </h3>
                    <div className="h-px flex-1 bg-black/10" />
                  </div>

                  {groupProjects.length === 0 ? (
                    <div className="border border-black/10 bg-white px-6 py-9 text-center">
                      <p className="text-[12px] text-black/40">
                        {group.emptyText}
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {groupProjects.map((project) => (
                        <article
                          key={project.id}
                          className="group overflow-hidden border border-black/10 bg-white shadow-[0_8px_25px_rgba(0,0,0,0.05)]"
                        >
                          <a href={`/du-an/${project.id}`} className="block">
                            <div className="relative h-[260px] overflow-hidden bg-[#dfe2e4] sm:h-[290px]">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                              />

                              {project.type && (
                                <span className="absolute left-4 top-4 bg-[#d7a53a] px-3 py-2 text-[9px] font-extrabold uppercase text-[#0b1118]">
                                  {project.type}
                                </span>
                              )}

                              {project.featured && (
                                <span className="absolute right-4 top-4 bg-[#0b1118]/90 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.05em] text-white">
                                  {content.featured}
                                </span>
                              )}
                            </div>
                          </a>

                          <div className="p-5">
                            {project.projectCode && (
                              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#c9932e]">
                                {project.projectCode}
                              </p>
                            )}

                            <h4 className="mt-2 text-[17px] font-extrabold uppercase leading-6">
                              {project.title}
                            </h4>

                            {project.location && (
                              <p className="mt-2 min-h-[20px] text-[12px] text-black/45">
                                {project.location}
                              </p>
                            )}

                            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-black/10 pt-4">
                              <div>
                                <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-black/35">
                                  {content.area}
                                </p>
                                <p className="mt-1 text-[11px] font-bold">
                                  {project.area}
                                </p>
                              </div>

                              <div>
                                <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-black/35">
                                  {content.scale}
                                </p>
                                <p className="mt-1 text-[11px] font-bold">
                                  {project.scale}
                                </p>
                              </div>
                            </div>

                            <a
                              href={`/du-an/${project.id}`}
                              className="mt-5 inline-flex items-center text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#c9932e] transition hover:text-[#d7a53a]"
                            >
                              {content.viewDetail} →
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </section>

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
