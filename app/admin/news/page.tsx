"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type NewsItem = {
  id: number;
  title_vi: string;
  title_en: string | null;
  slug: string;
  excerpt_vi: string | null;
  excerpt_en: string | null;
  category_vi: string | null;
  category_en: string | null;
  image_url: string | null;
  featured: boolean;
  published: boolean;
  published_at: string | null;
  created_at: string;
};

export default function AdminNewsPage() {
  const router = useRouter();

  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const loadNews = async () => {
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
        .from("news")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("published_at", { ascending: false });

      if (loadError) {
        console.error(loadError);
        setError("Không thể tải danh sách bài viết.");
        setLoading(false);
        return;
      }

      setItems((data ?? []) as NewsItem[]);
      setLoading(false);
    };

    loadNews();
  }, [router]);

  const getStoragePath = (url: string) => {
    const marker = "/news-images/";
    const index = url.indexOf(marker);

    if (index === -1) {
      return null;
    }

    return url.substring(index + marker.length);
  };

  const handleDelete = async (item: NewsItem) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa bài viết "${item.title_vi}"?`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(item.id);
    setError("");

    try {
      if (item.image_url) {
        const imagePath = getStoragePath(item.image_url);

        if (imagePath) {
          await supabase.storage
            .from("news-images")
            .remove([imagePath]);
        }
      }

      const { error: deleteError } = await supabase
        .from("news")
        .delete()
        .eq("id", item.id);

      if (deleteError) {
        throw deleteError;
      }

      setItems((current) =>
        current.filter((article) => article.id !== item.id),
      );
    } catch (err) {
      console.error(err);
      setError("Không thể xóa bài viết.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (value: string | null) => {
    if (!value) {
      return "—";
    }

    return new Date(value).toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b1118] text-white">
        <p className="text-sm text-white/60">
          Đang tải bài viết...
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
              ADMIN · NEWS
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
              href="/admin/news/new"
              className="inline-flex items-center justify-center bg-[#d7a53a] px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.05em] text-[#111820] transition hover:bg-[#e6b64d]"
            >
              + Thêm bài viết
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
                Tin tức
              </h1>

              <p className="mt-3 text-[14px] text-black/50">
                Tổng cộng {items.length} bài viết.
              </p>
            </div>

            <a
              href="/admin/news/new"
              className="inline-flex w-fit items-center justify-center bg-[#111820] px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-[#d7a53a] hover:text-[#111820]"
            >
              + Thêm bài viết mới
            </a>
          </div>

          {error && (
            <div className="mt-8 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {!error && items.length === 0 && (
            <div className="mt-8 border border-black/10 bg-white p-10 text-center">
              <p className="text-[14px] text-black/45">
                Chưa có bài viết nào.
              </p>

              <a
                href="/admin/news/new"
                className="mt-5 inline-flex bg-[#d7a53a] px-6 py-3 text-[11px] font-extrabold uppercase text-[#111820]"
              >
                Thêm bài viết đầu tiên
              </a>
            </div>
          )}

          {!error && items.length > 0 && (
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden border border-black/[0.07] bg-white shadow-[0_8px_25px_rgba(0,0,0,0.04)]"
                >
                  <div className="relative h-[220px] bg-[#dde0e2]">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title_vi}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[12px] font-bold uppercase text-black/30">
                        Chưa có ảnh
                      </div>
                    )}

                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      {item.featured && (
                        <span className="bg-[#d7a53a] px-3 py-1.5 text-[9px] font-extrabold uppercase text-[#111820]">
                          Nổi bật
                        </span>
                      )}

                      <span
                        className={`px-3 py-1.5 text-[9px] font-extrabold uppercase ${
                          item.published
                            ? "bg-green-100 text-green-700"
                            : "bg-black/70 text-white"
                        }`}
                      >
                        {item.published
                          ? "Đang hiển thị"
                          : "Đang ẩn"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#c9932e]">
                        {item.category_vi || "Tin tức"}
                      </p>

                      <p className="text-[10px] text-black/35">
                        {formatDate(item.published_at)}
                      </p>
                    </div>

                    <h2 className="mt-3 text-[18px] font-extrabold leading-7">
                      {item.title_vi}
                    </h2>

                    {item.excerpt_vi && (
                      <p className="mt-3 line-clamp-3 text-[13px] leading-6 text-black/50">
                        {item.excerpt_vi}
                      </p>
                    )}

                    <div className="mt-6 flex gap-2">
                      <a
                        href={`/admin/news/${item.id}`}
                        className="flex-1 border border-[#111820] px-4 py-3 text-center text-[10px] font-extrabold uppercase tracking-[0.05em] transition hover:bg-[#111820] hover:text-white"
                      >
                        Sửa
                      </a>

                      <button
                        type="button"
                        disabled={deletingId === item.id}
                        onClick={() => handleDelete(item)}
                        className="flex-1 border border-red-200 px-4 py-3 text-[10px] font-extrabold uppercase tracking-[0.05em] text-red-600 transition hover:bg-red-600 hover:text-white disabled:opacity-50"
                      >
                        {deletingId === item.id
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