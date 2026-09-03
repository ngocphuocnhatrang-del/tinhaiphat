"use client";

import { useEffect, useMemo, useState } from "react";
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
  image: string;
};

export default function FeaturedProjects() {
  const { language, t } = useLanguage();

  const [dbProjects, setDbProjects] = useState<DbProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);

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
          image_url,
          featured,
          published,
          sort_order,
          created_at
        `)
        .eq("published", true)
        .eq("featured", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) {
        console.error("Load featured projects error:", error);
        setDbProjects([]);
        setLoading(false);
        return;
      }

      setDbProjects((data ?? []) as DbProject[]);
      setLoading(false);
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

      image:
        project.image_url || "/images/project-1.jpg",
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

  const filterKeys = [
    "all",
    "townhouse",
    "villa",
    "hotel",
  ];

  return (
    <section
      id="projects"
      className="bg-[#0b1118] px-5 py-20 text-white lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* TITLE */}

        <div className="text-center">
          <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.3em] text-[#d7a53a]">
            {t.projects.eyebrow}
          </p>

          <h2 className="text-3xl font-extrabold uppercase md:text-4xl">
            {t.projects.title}
          </h2>

          <div className="mx-auto mt-5 h-[3px] w-14 bg-[#d7a53a]" />
        </div>

        {/* FILTER */}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {t.projects.filters.map((filter, index) => {
            const filterKey =
              filterKeys[index] ?? "all";

            return (
              <button
                key={`${filterKey}-${index}`}
                type="button"
                onClick={() =>
                  setActiveFilter(filterKey)
                }
                className={`px-5 py-2.5 text-[11px] font-bold tracking-[0.06em] transition ${
                  activeFilter === filterKey
                    ? "bg-[#d7a53a] text-[#0b1118]"
                    : "border border-white/15 text-white/70 hover:border-[#d7a53a] hover:text-[#d7a53a]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* LOADING */}

        {loading && (
          <div className="mt-12 text-center">
            <p className="text-[13px] text-white/45">
              {language === "vi"
                ? "Đang tải dự án..."
                : "Loading projects..."}
            </p>
          </div>
        )}

        {/* EMPTY */}

        {!loading && projects.length === 0 && (
          <div className="mt-12 border border-white/10 bg-white/[0.02] px-6 py-12 text-center">
            <p className="text-[13px] text-white/45">
              {language === "vi"
                ? "Hiện chưa có dự án tiêu biểu trong danh mục này."
                : "There are currently no featured projects in this category."}
            </p>
          </div>
        )}

        {/* PROJECT GRID */}

        {!loading && projects.length > 0 && (
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group overflow-hidden border border-white/10 bg-[#111922]"
              >
                <a
                  href={`/du-an/${project.id}`}
                  className="block"
                >
                  <div className="relative h-[330px] overflow-hidden bg-[#1b2530]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                    {project.type && (
                      <span className="absolute left-4 top-4 bg-[#d7a53a] px-3 py-1.5 text-[10px] font-bold uppercase text-[#0b1118]">
                        {project.type}
                      </span>
                    )}
                  </div>
                </a>

                <div className="p-5">
                  <h3 className="text-[17px] font-extrabold">
                    {project.title}
                  </h3>

                  {project.location && (
                    <p className="mt-2 text-[13px] text-white/55">
                      {project.location}
                    </p>
                  )}

                  <a
                    href={`/du-an/${project.id}`}
                    className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#d7a53a] transition hover:text-[#e6b64d]"
                  >
                    {t.projects.viewProject} →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* VIEW ALL */}

        <div className="mt-10 text-center">
          <a
            href="/du-an"
            className="inline-flex items-center gap-3 border border-[#d7a53a] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.05em] text-[#d7a53a] transition hover:bg-[#d7a53a] hover:text-[#0b1118]"
          >
            {t.projects.viewAll} →
          </a>
        </div>
      </div>
    </section>
  );
}