"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type NewsItem = {
  id: number;
  title_vi: string;
  title_en: string | null;
  slug: string;

  category_vi: string | null;
  category_en: string | null;

  excerpt_vi: string | null;
  excerpt_en: string | null;

  content_vi: string | null;
  content_en: string | null;

  image_url: string | null;

  featured: boolean;
  published: boolean;
};

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();

  const articleId = Number(
    Array.isArray(params.id)
      ? params.id[0]
      : params.id,
  );

  const [checking, setChecking] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [titleVi, setTitleVi] = useState("");
  const [titleEn, setTitleEn] = useState("");

  const [categoryVi, setCategoryVi] =
    useState("CHI PHÍ XÂY DỰNG");
  const [categoryEn, setCategoryEn] =
    useState("CONSTRUCTION COSTS");

  const [excerptVi, setExcerptVi] = useState("");
  const [excerptEn, setExcerptEn] = useState("");

  const [contentVi, setContentVi] = useState("");
  const [contentEn, setContentEn] = useState("");

  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);

  const [currentImageUrl, setCurrentImageUrl] =
    useState<string | null>(null);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const imagePreview = useMemo(() => {
    if (!imageFile) {
      return "";
    }

    return URL.createObjectURL(imageFile);
  }, [imageFile]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    const loadArticle = async () => {
      setChecking(true);
      setError("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      if (!articleId || Number.isNaN(articleId)) {
        setError("Bài viết không hợp lệ.");
        setChecking(false);
        return;
      }

      const { data, error: loadError } =
        await supabase
          .from("news")
          .select("*")
          .eq("id", articleId)
          .single();

      if (loadError || !data) {
        console.error(loadError);

        setError("Không tìm thấy bài viết.");
        setChecking(false);
        return;
      }

      const article = data as NewsItem;

      setTitleVi(article.title_vi ?? "");
      setTitleEn(article.title_en ?? "");

      setCategoryVi(
        article.category_vi ||
          "CHI PHÍ XÂY DỰNG",
      );

      setCategoryEn(
        article.category_en ||
          "CONSTRUCTION COSTS",
      );

      setExcerptVi(article.excerpt_vi ?? "");
      setExcerptEn(article.excerpt_en ?? "");

      setContentVi(article.content_vi ?? "");
      setContentEn(article.content_en ?? "");

      setFeatured(article.featured);
      setPublished(article.published);

      setCurrentImageUrl(article.image_url);

      setChecking(false);
    };

    loadArticle();
  }, [articleId, router]);

  const sanitizeFileName = (name: string) => {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9.-]/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase();
  };

  const getStoragePath = (url: string) => {
    const marker = "/news-images/";
    const index = url.indexOf(marker);

    if (index === -1) {
      return null;
    }

    return url.substring(index + marker.length);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryVi(value);

    if (value === "CHI PHÍ XÂY DỰNG") {
      setCategoryEn("CONSTRUCTION COSTS");
    }

    if (value === "KINH NGHIỆM") {
      setCategoryEn("EXPERIENCE");
    }

    if (value === "THIẾT KẾ") {
      setCategoryEn("DESIGN");
    }

    if (value === "THI CÔNG") {
      setCategoryEn("CONSTRUCTION");
    }
  };

  const handleSave = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setError("");

    if (!titleVi.trim()) {
      setError(
        "Vui lòng nhập tiêu đề tiếng Việt.",
      );
      return;
    }

    if (!contentVi.trim()) {
      setError(
        "Vui lòng nhập nội dung bài viết.",
      );
      return;
    }

    setSaving(true);

    let uploadedPath: string | null = null;
    let newImageUrl = currentImageUrl;

    try {
      // Upload ảnh mới nếu có
      if (imageFile) {
        const safeName = sanitizeFileName(
          imageFile.name,
        );

        uploadedPath =
          `${Date.now()}-${safeName}`;

        const { error: uploadError } =
          await supabase.storage
            .from("news-images")
            .upload(uploadedPath, imageFile, {
              cacheControl: "3600",
              upsert: false,
            });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } =
          supabase.storage
            .from("news-images")
            .getPublicUrl(uploadedPath);

        newImageUrl = publicUrlData.publicUrl;
      }

      const { error: updateError } =
        await supabase
          .from("news")
          .update({
            title_vi: titleVi.trim(),

            title_en:
              titleEn.trim() || null,

            category_vi:
              categoryVi.trim() || null,

            category_en:
              categoryEn.trim() || null,

            excerpt_vi:
              excerptVi.trim() || null,

            excerpt_en:
              excerptEn.trim() || null,

            content_vi:
              contentVi.trim(),

            content_en:
              contentEn.trim() || null,

            image_url: newImageUrl,

            featured,
            published,

            updated_at:
              new Date().toISOString(),
          })
          .eq("id", articleId);

      if (updateError) {
        throw updateError;
      }

      // Nếu thay ảnh thành công, xóa ảnh cũ trong Storage
      // Chỉ xóa nếu ảnh cũ thuộc news-images.
      if (
        imageFile &&
        currentImageUrl &&
        currentImageUrl !== newImageUrl
      ) {
        const oldPath =
          getStoragePath(currentImageUrl);

        if (oldPath) {
          await supabase.storage
            .from("news-images")
            .remove([oldPath]);
        }
      }

      router.push("/admin/news");
      router.refresh();
    } catch (err) {
      console.error(err);

      // Nếu update DB lỗi, xóa ảnh mới vừa upload
      if (uploadedPath) {
        await supabase.storage
          .from("news-images")
          .remove([uploadedPath]);
      }

      setError(
        "Không thể cập nhật bài viết. Vui lòng thử lại.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b1118] text-white">
        <p className="text-sm text-white/60">
          Đang tải bài viết...
        </p>
      </main>
    );
  }

  const inputClass =
    "w-full border border-black/10 bg-[#fafafa] px-3 py-2.5 text-[13px] outline-none transition focus:border-[#d7a53a]";

  const labelClass =
    "mb-1.5 block text-[9px] font-bold uppercase tracking-[0.07em] text-black/55";

  const fatalError =
    error === "Không tìm thấy bài viết." ||
    error === "Bài viết không hợp lệ.";

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#111820]">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-[#0b1118] px-5 py-4 text-white lg:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <div>
            <div className="text-[17px] font-extrabold tracking-[0.08em] text-[#d7a53a]">
              TÍN HẢI PHÁT
            </div>

            <div className="mt-1 text-[8px] tracking-[0.28em] text-white/50">
              ADMIN · EDIT ARTICLE
            </div>
          </div>

          <a
            href="/admin/news"
            className="inline-flex items-center justify-center border border-white/15 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.05em] text-white/75 transition hover:border-[#d7a53a] hover:text-[#d7a53a]"
          >
            ← Danh sách tin tức
          </a>
        </div>
      </header>

      {/* CONTENT */}
      <section className="px-5 py-4 lg:px-8">
        <div className="mx-auto max-w-[1380px]">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.23em] text-[#c9932e]">
              Quản lý nội dung
            </p>

            <h1 className="mt-1.5 text-[23px] font-extrabold uppercase">
              Sửa bài viết
            </h1>

            <p className="mt-1 text-[11px] text-black/50">
              Cập nhật nội dung bài viết trên website.
            </p>
          </div>

          {fatalError ? (
            <div className="mt-5 border border-red-200 bg-red-50 p-5 text-[13px] text-red-700">
              {error}
            </div>
          ) : (
            <form
              onSubmit={handleSave}
              className="mt-4 grid gap-2"
            >
              {/* BASIC INFO */}
              <section className="border border-black/10 bg-white px-4 py-3">
                <h2 className="text-[12px] font-extrabold uppercase">
                  Thông tin bài viết
                </h2>

                <div className="mt-3 grid gap-x-4 gap-y-2 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Tiêu đề tiếng Việt *
                    </label>

                    <input
                      value={titleVi}
                      onChange={(e) =>
                        setTitleVi(e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Tiêu đề tiếng Anh
                    </label>

                    <input
                      value={titleEn}
                      onChange={(e) =>
                        setTitleEn(e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Chuyên mục
                    </label>

                    <select
                      value={categoryVi}
                      onChange={(e) =>
                        handleCategoryChange(
                          e.target.value,
                        )
                      }
                      className={inputClass}
                    >
                      <option value="CHI PHÍ XÂY DỰNG">
                        CHI PHÍ XÂY DỰNG
                      </option>

                      <option value="KINH NGHIỆM">
                        KINH NGHIỆM
                      </option>

                      <option value="THIẾT KẾ">
                        THIẾT KẾ
                      </option>

                      <option value="THI CÔNG">
                        THI CÔNG
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Chuyên mục tiếng Anh
                    </label>

                    <input
                      value={categoryEn}
                      onChange={(e) =>
                        setCategoryEn(
                          e.target.value,
                        )
                      }
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>

              {/* EXCERPT + IMAGE */}
              <div className="grid gap-2 lg:grid-cols-[1.05fr_0.95fr]">
                {/* EXCERPT */}
                <section className="border border-black/10 bg-white px-4 py-3">
                  <h2 className="text-[12px] font-extrabold uppercase">
                    Mô tả ngắn
                  </h2>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>
                        Mô tả tiếng Việt
                      </label>

                      <textarea
                        rows={5}
                        value={excerptVi}
                        onChange={(e) =>
                          setExcerptVi(
                            e.target.value,
                          )
                        }
                        className="w-full resize-none border border-black/10 bg-[#fafafa] px-3 py-2.5 text-[12px] leading-5 outline-none focus:border-[#d7a53a]"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Mô tả tiếng Anh
                      </label>

                      <textarea
                        rows={5}
                        value={excerptEn}
                        onChange={(e) =>
                          setExcerptEn(
                            e.target.value,
                          )
                        }
                        className="w-full resize-none border border-black/10 bg-[#fafafa] px-3 py-2.5 text-[12px] leading-5 outline-none focus:border-[#d7a53a]"
                      />
                    </div>
                  </div>
                </section>

                {/* IMAGE */}
                <section className="border border-black/10 bg-white px-4 py-3">
                  <h2 className="text-[12px] font-extrabold uppercase">
                    Ảnh đại diện
                  </h2>

                  <p className="mt-1 text-[9px] text-black/40">
                    Chọn ảnh mới nếu muốn thay ảnh hiện tại.
                  </p>

                  <div className="mt-3 grid grid-cols-[0.72fr_1fr] gap-3">
                    <label className="flex h-[142px] cursor-pointer flex-col items-center justify-center border border-dashed border-black/20 bg-[#fafafa] p-3 text-center hover:border-[#d7a53a]">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file =
                            e.target.files?.[0] ??
                            null;

                          setImageFile(file);
                        }}
                      />

                      <span className="text-[27px] leading-none text-[#c9932e]">
                        +
                      </span>

                      <span className="mt-2 text-[10px] font-extrabold uppercase">
                        Thay ảnh
                      </span>

                      <span className="mt-1 text-[9px] text-black/40">
                        JPG, PNG, WEBP
                      </span>
                    </label>

                    <div className="h-[142px] overflow-hidden border border-black/10 bg-[#ececea]">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Ảnh mới"
                          className="h-full w-full object-cover"
                        />
                      ) : currentImageUrl ? (
                        <img
                          src={currentImageUrl}
                          alt={titleVi}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center p-4 text-center text-[10px] text-black/35">
                          Chưa có ảnh
                        </div>
                      )}
                    </div>
                  </div>

                  {imageFile && (
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="truncate text-[9px] text-black/50">
                        Ảnh mới: {imageFile.name}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setImageFile(null)
                        }
                        className="shrink-0 text-[9px] font-extrabold uppercase text-red-600"
                      >
                        Hủy thay ảnh
                      </button>
                    </div>
                  )}
                </section>
              </div>

              {/* CONTENT */}
              <section className="border border-black/10 bg-white px-4 py-3">
                <h2 className="text-[12px] font-extrabold uppercase">
                  Nội dung bài viết
                </h2>

                <div className="mt-3 grid gap-3 lg:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Nội dung tiếng Việt *
                    </label>

                    <textarea
                      rows={10}
                      value={contentVi}
                      onChange={(e) =>
                        setContentVi(
                          e.target.value,
                        )
                      }
                      className="w-full resize-y border border-black/10 bg-[#fafafa] px-3 py-3 text-[13px] leading-6 outline-none focus:border-[#d7a53a]"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Nội dung tiếng Anh
                    </label>

                    <textarea
                      rows={10}
                      value={contentEn}
                      onChange={(e) =>
                        setContentEn(
                          e.target.value,
                        )
                      }
                      className="w-full resize-y border border-black/10 bg-[#fafafa] px-3 py-3 text-[13px] leading-6 outline-none focus:border-[#d7a53a]"
                    />
                  </div>
                </div>
              </section>

              {/* SETTINGS */}
              <section className="border border-black/10 bg-white px-4 py-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <h2 className="mr-5 text-[12px] font-extrabold uppercase">
                    Hiển thị
                  </h2>

                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) =>
                        setFeatured(
                          e.target.checked,
                        )
                      }
                      className="h-4 w-4"
                    />

                    <span className="text-[11px] font-bold">
                      Bài viết nổi bật
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-2 sm:ml-6">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) =>
                        setPublished(
                          e.target.checked,
                        )
                      }
                      className="h-4 w-4"
                    />

                    <span className="text-[11px] font-bold">
                      Hiển thị trên website
                    </span>
                  </label>
                </div>
              </section>

              {error && (
                <div className="border border-red-200 bg-red-50 px-4 py-2.5 text-[11px] font-semibold text-red-700">
                  {error}
                </div>
              )}

              {/* ACTIONS */}
              <div className="flex justify-end gap-2 pt-1">
                <a
                  href="/admin/news"
                  className="inline-flex min-w-[110px] items-center justify-center border border-black/15 bg-white px-5 py-2.5 text-[10px] font-extrabold uppercase text-black/60"
                >
                  Hủy
                </a>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex min-w-[190px] items-center justify-center bg-[#d7a53a] px-6 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-[#111820] transition hover:bg-[#e6b64d] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "ĐANG CẬP NHẬT..."
                    : "LƯU THAY ĐỔI →"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}