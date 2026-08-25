"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
  image_url: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
};

export default function AdminProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      const { data, error: loadError } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (loadError) {
        console.error(loadError);
        setError("Không thể tải danh sách dự án.");
        setLoading(false);
        return;
      }

      setProjects(data ?? []);
      setLoading(false);
    };

    loadProjects();
  }, [router]);

  const handleDelete = async (project: Project) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa dự án "${project.title_vi}"?`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(project.id);
    setError("");

    try {
      if (project.image_url) {
        const marker = "/project-images/";

        const markerIndex = project.image_url.indexOf(marker);

        if (markerIndex !== -1) {
          const storagePath = project.image_url.substring(
            markerIndex + marker.length,
          );

          await supabase.storage
            .from("project-images")
            .remove([storagePath]);
        }
      }

      const { error: deleteError } = await supabase
        .from("projects")
        .delete()
        .eq("id", project.id);

      if (deleteError) {
        throw deleteError;
      }

      setProjects((current) =>
        current.filter((item) => item.id !== project.id),
      );
    } catch (err) {
      console.error(err);
      setError("Không thể xóa dự án.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b1118] text-white">
        <p className="text-sm text-white/60">
          Đang tải dự án...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#111820]">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-[#0b1118] px-5 py-5 text-white lg:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-[18px] font-extrabold tracking-[0.08em] text-[#d7a53a]">
              TÍN HẢI PHÁT
            </div>

            <div className="mt-1 text-[9px] tracking-[0.3em] text-white/50">
              ADMIN · PROJECTS
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="/admin"
              className="inline-flex items-center justify-center border border-white/15 px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white/70 transition hover:border-[#d7a53a] hover:text-[#d7a53a]"
            >
              ← Dashboard
            </a>

            <a
              href="/admin/projects/new"
              className="inline-flex items-center justify-center bg-[#d7a53a] px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.05em] text-[#111820] transition hover:bg-[#e6b64d]"
            >
              + Thêm dự án
            </a>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c9932e]">
                Quản lý nội dung
              </p>

              <h1 className="mt-3 text-[30px] font-extrabold uppercase">
                Dự án
              </h1>

              <p className="mt-3 text-[14px] text-black/50">
                Tổng cộng {projects.length} dự án.
              </p>
            </div>

            <a
              href="/admin/projects/new"
              className="inline-flex w-fit items-center justify-center bg-[#111820] px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-[#d7a53a] hover:text-[#111820]"
            >
              + Thêm dự án mới
            </a>
          </div>

          {error && (
            <div className="mt-8 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {!error && projects.length === 0 && (
            <div className="mt-8 border border-black/10 bg-white p-10 text-center">
              <p className="text-[14px] text-black/45">
                Chưa có dự án nào.
              </p>

              <a
                href="/admin/projects/new"
                className="mt-5 inline-flex bg-[#d7a53a] px-6 py-3 text-[11px] font-extrabold uppercase text-[#111820]"
              >
                Thêm dự án đầu tiên
              </a>
            </div>
          )}

          {!error && projects.length > 0 && (
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="overflow-hidden border border-black/[0.07] bg-white shadow-[0_8px_25px_rgba(0,0,0,0.04)]"
                >
                  <div className="relative h-[220px] bg-[#dde0e2]">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title_vi}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[12px] font-bold uppercase text-black/30">
                        Chưa có ảnh
                      </div>
                    )}

                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      {project.featured && (
                        <span className="bg-[#d7a53a] px-3 py-1.5 text-[9px] font-extrabold uppercase text-[#111820]">
                          Tiêu biểu
                        </span>
                      )}

                      <span
                        className={`px-3 py-1.5 text-[9px] font-extrabold uppercase ${
                          project.published
                            ? "bg-green-100 text-green-700"
                            : "bg-black/70 text-white"
                        }`}
                      >
                        {project.published
                          ? "Đang hiển thị"
                          : "Đang ẩn"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#c9932e]">
                      {project.type_vi || "Dự án"}
                    </p>

                    <h2 className="mt-2 text-[18px] font-extrabold uppercase leading-6">
                      {project.title_vi}
                    </h2>

                    <p className="mt-2 text-[13px] text-black/45">
                      {project.location_vi || "Chưa nhập địa điểm"}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-black/10 pt-4">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-black/30">
                          Diện tích
                        </p>

                        <p className="mt-1 text-[12px] font-bold">
                          {project.area || "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-black/30">
                          Quy mô
                        </p>

                        <p className="mt-1 text-[12px] font-bold">
                          {project.scale || "—"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                      <a
                        href={`/admin/projects/${project.id}`}
                        className="flex-1 border border-[#111820] px-4 py-3 text-center text-[10px] font-extrabold uppercase tracking-[0.05em] transition hover:bg-[#111820] hover:text-white"
                      >
                        Sửa
                      </a>

                      <button
                        type="button"
                        disabled={deletingId === project.id}
                        onClick={() => handleDelete(project)}
                        className="flex-1 border border-red-200 px-4 py-3 text-[10px] font-extrabold uppercase tracking-[0.05em] text-red-600 transition hover:bg-red-600 hover:text-white disabled:opacity-50"
                      >
                        {deletingId === project.id
                          ? "Đang xóa..."
                          : "Xóa"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}