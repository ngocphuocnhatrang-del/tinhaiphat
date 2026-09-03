"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type ProjectStatus = "REFERENCE" | "IN_PROGRESS" | "COMPLETED";

type Project = {
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
  style_vi: string | null;
  style_en: string | null;
  scope_vi: string | null;
  scope_en: string | null;
  project_code: string | null;
  project_status: ProjectStatus | null;
  image_url: string | null;
  featured: boolean;
  published: boolean;
};

type ProjectImage = {
  id: number;
  project_id: number;
  image_url: string;
  display_order: number;
};

export default function ProjectDetailPage() {
  const params = useParams();
  const { language } = useLanguage();

  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const projectId = Number(rawId);

  const [project, setProject] = useState<Project | null>(null);
  const [gallery, setGallery] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      setLoading(true);
      setError("");

      if (!projectId || Number.isNaN(projectId)) {
        setError(
          language === "vi" ? "Dự án không hợp lệ." : "Invalid project.",
        );
        setLoading(false);
        return;
      }

      try {
        const { data: projectData, error: projectError } = await supabase
          .from("projects")
          .select(`
            id,
            title_vi,
            title_en,
            location_vi,
            location_en,
            type_vi,
            type_en,
            description_vi,
            description_en,
            area,
            scale,
            style_vi,
            style_en,
            scope_vi,
            scope_en,
            project_code,
            project_status,
            image_url,
            featured,
            published
          `)
          .eq("id", projectId)
          .eq("published", true)
          .single();

        if (projectError || !projectData) {
          console.error("Load project detail error:", projectError);
          setError(
            language === "vi"
              ? "Không tìm thấy dự án."
              : "Project not found.",
          );
          setLoading(false);
          return;
        }

        const currentProject = projectData as Project;
        setProject(currentProject);
        setActiveImage(currentProject.image_url || "");

        const { data: galleryData, error: galleryError } = await supabase
          .from("project_images")
          .select(`
            id,
            project_id,
            image_url,
            display_order
          `)
          .eq("project_id", projectId)
          .order("display_order", { ascending: true })
          .order("id", { ascending: true });

        if (galleryError) {
          console.error("Load project gallery error:", galleryError);
          setGallery([]);
        } else {
          setGallery((galleryData ?? []) as ProjectImage[]);
        }
      } catch (err) {
        console.error(err);
        setError(
          language === "vi"
            ? "Không thể tải thông tin dự án."
            : "Unable to load project information.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId, language]);

  const displayData = useMemo(() => {
    if (!project) return null;

    const status = project.project_status || "REFERENCE";

    const statusLabel =
      language === "vi"
        ? status === "IN_PROGRESS"
          ? "Đang thực hiện"
          : status === "COMPLETED"
            ? "Đã hoàn thành"
            : "Dự án tham khảo"
        : status === "IN_PROGRESS"
          ? "In progress"
          : status === "COMPLETED"
            ? "Completed"
            : "Reference project";

    return {
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
          : project.description_en || project.description_vi || "",
      style:
        language === "vi"
          ? project.style_vi || ""
          : project.style_en || project.style_vi || "",
      scope:
        language === "vi"
          ? project.scope_vi || ""
          : project.scope_en || project.scope_vi || "",
      statusLabel,
    };
  }, [project, language]);

  const allImages = useMemo(() => {
    const images: string[] = [];

    if (project?.image_url) images.push(project.image_url);

    gallery.forEach((image) => {
      if (image.image_url && !images.includes(image.image_url)) {
        images.push(image.image_url);
      }
    });

    return images;
  }, [project, gallery]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex min-h-[70vh] items-center justify-center bg-[#f5f5f3]">
          <p className="text-[14px] text-black/45">
            {language === "vi" ? "Đang tải dự án..." : "Loading project..."}
          </p>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !project || !displayData) {
    return (
      <>
        <Header />
        <main className="flex min-h-[70vh] items-center justify-center bg-[#f5f5f3] px-5">
          <div className="max-w-[520px] text-center">
            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#c9932e]">
              TÍN HẢI PHÁT
            </p>
            <h1 className="mt-4 text-3xl font-extrabold uppercase">
              {language === "vi" ? "Không tìm thấy dự án" : "Project not found"}
            </h1>
            <p className="mt-4 text-[14px] leading-7 text-black/50">
              {error ||
                (language === "vi"
                  ? "Dự án này hiện không tồn tại hoặc chưa được công khai."
                  : "This project does not exist or is not currently published.")}
            </p>
            <a
              href="/du-an"
              className="mt-7 inline-flex bg-[#d7a53a] px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-[#111820]"
            >
              ← {language === "vi" ? "Quay lại dự án" : "Back to projects"}
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="bg-[#f5f5f3] text-[#111820]">
        <section className="bg-[#0b1118] px-5 py-12 text-white lg:px-8 lg:py-16">
          <div className="mx-auto max-w-[1440px]">
            <a
              href="/du-an"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white/45 transition hover:text-[#d7a53a]"
            >
              ← {language === "vi" ? "Danh sách dự án" : "Projects"}
            </a>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d7a53a]">
                    {displayData.type ||
                      (language === "vi" ? "Dự án" : "Project")}
                  </p>

                  {project.project_code && (
                    <span className="border border-white/15 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white/65">
                      {project.project_code}
                    </span>
                  )}

                  <span className="bg-[#d7a53a] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.08em] text-[#0b1118]">
                    {displayData.statusLabel}
                  </span>
                </div>

                <h1 className="mt-4 max-w-[900px] text-3xl font-extrabold uppercase leading-[1.15] md:text-5xl">
                  {displayData.title}
                </h1>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {displayData.location && (
                  <InfoDark
                    label={language === "vi" ? "Địa điểm" : "Location"}
                    value={displayData.location}
                  />
                )}
                {project.area && (
                  <InfoDark
                    label={language === "vi" ? "Diện tích" : "Area"}
                    value={project.area}
                  />
                )}
                {project.scale && (
                  <InfoDark
                    label={language === "vi" ? "Quy mô" : "Scale"}
                    value={project.scale}
                  />
                )}
                {displayData.style && (
                  <InfoDark
                    label={language === "vi" ? "Phong cách" : "Style"}
                    value={displayData.style}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-10 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-[1440px]">
            {activeImage ? (
              <div className="overflow-hidden bg-[#dfe2e4]">
                <img
                  src={activeImage}
                  alt={displayData.title}
                  className="max-h-[760px] w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-[420px] items-center justify-center bg-[#dde0e2] text-[13px] text-black/30">
                {language === "vi"
                  ? "Dự án chưa có hình ảnh."
                  : "No project image available."}
              </div>
            )}

            {allImages.length > 1 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {allImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    className={`overflow-hidden border-2 transition ${
                      activeImage === image
                        ? "border-[#d7a53a]"
                        : "border-transparent hover:border-black/20"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${displayData.title} ${index + 1}`}
                      className="h-[130px] w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="px-5 pb-16 lg:px-8 lg:pb-24">
          <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="h-fit border border-black/10 bg-white p-6 md:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9932e]">
                {language === "vi"
                  ? "Hồ sơ dự án"
                  : "Project profile"}
              </p>

              <div className="mt-5 space-y-5">
                {project.project_code && (
                  <InfoLight
                    label={language === "vi" ? "Mã dự án" : "Project code"}
                    value={project.project_code}
                  />
                )}

                <InfoLight
                  label={language === "vi" ? "Trạng thái" : "Status"}
                  value={displayData.statusLabel}
                />

                {displayData.type && (
                  <InfoLight
                    label={
                      language === "vi" ? "Loại công trình" : "Project type"
                    }
                    value={displayData.type}
                  />
                )}

                {displayData.location && (
                  <InfoLight
                    label={language === "vi" ? "Địa điểm" : "Location"}
                    value={displayData.location}
                  />
                )}

                {project.area && (
                  <InfoLight
                    label={language === "vi" ? "Diện tích" : "Area"}
                    value={project.area}
                  />
                )}

                {project.scale && (
                  <InfoLight
                    label={language === "vi" ? "Quy mô" : "Scale"}
                    value={project.scale}
                  />
                )}

                {displayData.style && (
                  <InfoLight
                    label={language === "vi" ? "Phong cách" : "Style"}
                    value={displayData.style}
                  />
                )}

                {displayData.scope && (
                  <InfoLight
                    label={language === "vi" ? "Hạng mục" : "Scope"}
                    value={displayData.scope}
                  />
                )}
              </div>
            </aside>

            <article className="border border-black/10 bg-white p-6 md:p-8 lg:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9932e]">
                {language === "vi"
                  ? "Giới thiệu công trình"
                  : "Project overview"}
              </p>

              <h2 className="mt-3 text-2xl font-extrabold uppercase md:text-3xl">
                {displayData.title}
              </h2>

              <div className="mt-6 h-[3px] w-14 bg-[#d7a53a]" />

              {displayData.description ? (
                <div className="mt-7 whitespace-pre-line text-[15px] leading-8 text-black/65">
                  {displayData.description}
                </div>
              ) : (
                <p className="mt-7 text-[14px] leading-7 text-black/45">
                  {language === "vi"
                    ? "Dự án hiện chưa có nội dung mô tả."
                    : "This project currently has no description."}
                </p>
              )}

              {displayData.scope && (
                <div className="mt-9 border-t border-black/10 pt-7">
                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-black/35">
                    {language === "vi" ? "Phạm vi triển khai" : "Project scope"}
                  </p>
                  <p className="mt-3 text-[14px] font-semibold leading-7 text-black/70">
                    {displayData.scope}
                  </p>
                </div>
              )}
            </article>
          </div>
        </section>

        <section className="bg-[#111820] px-5 py-14 text-white lg:px-8">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d7a53a]">
                TÍN HẢI PHÁT
              </p>
              <h2 className="mt-2 text-2xl font-extrabold uppercase md:text-3xl">
                {language === "vi"
                  ? "Bạn đang chuẩn bị xây dựng?"
                  : "Planning your next project?"}
              </h2>
              <p className="mt-3 max-w-[720px] text-[14px] leading-7 text-white/55">
                {language === "vi"
                  ? "Trao đổi trực tiếp với Tín Hải Phát để được tư vấn phương án thiết kế, thi công và dự toán phù hợp."
                  : "Contact Tín Hải Phát for consultation on design, construction and project budgeting."}
              </p>
            </div>

            <a
              href="/lien-he"
              className="inline-flex w-fit shrink-0 bg-[#d7a53a] px-7 py-4 text-[11px] font-extrabold uppercase tracking-[0.05em] text-[#111820] transition hover:bg-[#e6b64d]"
            >
              {language === "vi" ? "Nhận tư vấn" : "Get consultation"} →
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function InfoDark({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-t border-white/15 pt-3">
      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/35">
        {label}
      </p>
      <p className="mt-1 text-[13px] font-semibold leading-6 text-white/80">
        {value}
      </p>
    </div>
  );
}

function InfoLight({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-t border-black/10 pt-4">
      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-black/35">
        {label}
      </p>
      <p className="mt-1 text-[14px] font-bold leading-6">{value}</p>
    </div>
  );
}
