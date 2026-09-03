"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewProjectPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [titleVi, setTitleVi] = useState("");
  const [titleEn, setTitleEn] = useState("");

  const [locationVi, setLocationVi] = useState("");
  const [locationEn, setLocationEn] = useState("");

  const [typeVi, setTypeVi] = useState("");
  const [typeEn, setTypeEn] = useState("");

  const [descriptionVi, setDescriptionVi] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");

  const [area, setArea] = useState("");
  const [scale, setScale] = useState("");

  const [styleVi, setStyleVi] = useState("");
  const [styleEn, setStyleEn] = useState("");

  const [scopeVi, setScopeVi] = useState("");
  const [scopeEn, setScopeEn] = useState("");

  const [projectCode, setProjectCode] = useState("");
  const [projectStatus, setProjectStatus] = useState("REFERENCE");

  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);

  /* =========================
     ẢNH ĐẠI DIỆN
  ========================= */

  const [imageFile, setImageFile] = useState<File | null>(
    null,
  );

  const imagePreview = useMemo(() => {
    if (!imageFile) {
      return "";
    }

    return URL.createObjectURL(imageFile);
  }, [imageFile]);

  /* =========================
     GALLERY
  ========================= */

  const [galleryFiles, setGalleryFiles] = useState<File[]>(
    [],
  );

  const galleryPreviews = useMemo(() => {
    return galleryFiles.map((file) =>
      URL.createObjectURL(file),
    );
  }, [galleryFiles]);

  /* =========================
     CHECK LOGIN
  ========================= */

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.replace("/admin/login");
          return;
        }
      } catch (err) {
        console.error(err);
        setError("Không thể kiểm tra phiên đăng nhập.");
      } finally {
        setChecking(false);
      }
    };

    checkSession();
  }, [router]);

  /* =========================
     CLEAN PREVIEW
  ========================= */

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    return () => {
      galleryPreviews.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [galleryPreviews]);

  /* =========================
     HELPERS
  ========================= */

  const sanitizeFileName = (name: string) => {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9.-]/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase();
  };

  const handleGalleryFiles = (
    files: FileList | null,
  ) => {
    if (!files) {
      return;
    }

    const selectedFiles = Array.from(files);

    setGalleryFiles((current) => [
      ...current,
      ...selectedFiles,
    ]);
  };

  const removeGalleryFile = (index: number) => {
    setGalleryFiles((current) =>
      current.filter(
        (_, fileIndex) => fileIndex !== index,
      ),
    );
  };

  /* =========================
     SAVE PROJECT
  ========================= */

  const handleSave = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setError("");

    if (!titleVi.trim()) {
      setError("Vui lòng nhập tên dự án tiếng Việt.");
      return;
    }

    setSaving(true);

    let uploadedMainPath: string | null = null;

    const uploadedGalleryPaths: string[] = [];

    let createdProjectId: number | null = null;

    try {
      /* =====================
         1. UPLOAD ẢNH ĐẠI DIỆN
      ===================== */

      let imageUrl: string | null = null;

      if (imageFile) {
        const safeName = sanitizeFileName(imageFile.name);

        uploadedMainPath =
          `main-${Date.now()}-${safeName}`;

        const { error: uploadError } =
          await supabase.storage
            .from("project-images")
            .upload(uploadedMainPath, imageFile, {
              cacheControl: "3600",
              upsert: false,
            });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } =
          supabase.storage
            .from("project-images")
            .getPublicUrl(uploadedMainPath);

        imageUrl = publicUrlData.publicUrl;
      }

      /* =====================
         2. TẠO PROJECT
      ===================== */

      const { data: newProject, error: insertError } =
        await supabase
          .from("projects")
          .insert({
            title_vi: titleVi.trim(),
            title_en: titleEn.trim() || null,

            location_vi: locationVi.trim() || null,
            location_en: locationEn.trim() || null,

            type_vi: typeVi.trim() || null,
            type_en: typeEn.trim() || null,

            description_vi:
              descriptionVi.trim() || null,

            description_en:
              descriptionEn.trim() || null,

            area: area.trim() || null,
            scale: scale.trim() || null,

            style_vi: styleVi.trim() || null,
            style_en: styleEn.trim() || null,

            scope_vi: scopeVi.trim() || null,
            scope_en: scopeEn.trim() || null,

            project_code: projectCode.trim().toUpperCase() || null,
            project_status: projectStatus,

            image_url: imageUrl,

            featured,
            published,

            sort_order: 0,
          })
          .select("id")
          .single();

      if (insertError || !newProject) {
        throw insertError || new Error("Không tạo được dự án.");
      }

      createdProjectId = Number(newProject.id);

      /* =====================
         3. UPLOAD GALLERY
      ===================== */

      for (
        let index = 0;
        index < galleryFiles.length;
        index++
      ) {
        const file = galleryFiles[index];

        const safeName = sanitizeFileName(file.name);

        const path =
          `gallery-${createdProjectId}-${Date.now()}-${index}-${safeName}`;

        const { error: galleryUploadError } =
          await supabase.storage
            .from("project-images")
            .upload(path, file, {
              cacheControl: "3600",
              upsert: false,
            });

        if (galleryUploadError) {
          throw galleryUploadError;
        }

        uploadedGalleryPaths.push(path);

        const { data: publicUrlData } =
          supabase.storage
            .from("project-images")
            .getPublicUrl(path);

        const { error: galleryInsertError } =
          await supabase
            .from("project_images")
            .insert({
              project_id: createdProjectId,
              image_url: publicUrlData.publicUrl,
              display_order: index,
            });

        if (galleryInsertError) {
          throw galleryInsertError;
        }
      }

      /* =====================
         4. DONE
      ===================== */

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      console.error("Save project error:", err);

      /*
       * Nếu project đã tạo nhưng gallery lỗi,
       * xóa project để tránh dữ liệu dang dở.
       * project_images sẽ cascade delete.
       */

      if (createdProjectId) {
        await supabase
          .from("projects")
          .delete()
          .eq("id", createdProjectId);
      }

      /* Xóa ảnh đại diện vừa upload */

      if (uploadedMainPath) {
        await supabase.storage
          .from("project-images")
          .remove([uploadedMainPath]);
      }

      /* Xóa gallery vừa upload */

      if (uploadedGalleryPaths.length > 0) {
        await supabase.storage
          .from("project-images")
          .remove(uploadedGalleryPaths);
      }

      setError(
        "Không thể lưu dự án. Vui lòng thử lại.",
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     LOADING
  ========================= */

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b1118] text-white">
        <p className="text-sm text-white/60">
          Đang kiểm tra quyền truy cập...
        </p>
      </main>
    );
  }

  const inputClass =
    "w-full border border-black/10 bg-[#fafafa] px-3 py-2.5 text-[13px] outline-none transition focus:border-[#d7a53a]";

  const labelClass =
    "mb-1.5 block text-[9px] font-bold uppercase tracking-[0.07em] text-black/55";

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
              ADMIN · NEW PROJECT
            </div>
          </div>

          <a
            href="/admin/projects"
            className="inline-flex items-center justify-center border border-white/15 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.05em] text-white/75 transition hover:border-[#d7a53a] hover:text-[#d7a53a]"
          >
            ← Danh sách dự án
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
              Thêm dự án
            </h1>

            <p className="mt-1 text-[11px] text-black/50">
              Nhập thông tin, chọn ảnh đại diện và thư viện
              ảnh cho dự án.
            </p>
          </div>

          <form
            onSubmit={handleSave}
            className="mt-4 grid gap-2"
          >
            {/* BASIC */}

            <section className="border border-black/10 bg-white px-4 py-3">
              <h2 className="text-[12px] font-extrabold uppercase">
                Thông tin dự án
              </h2>

              <div className="mt-3 grid gap-x-4 gap-y-2 md:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Mã dự án
                  </label>

                  <input
                    value={projectCode}
                    onChange={(e) =>
                      setProjectCode(e.target.value.toUpperCase())
                    }
                    placeholder="Ví dụ: THP-NP-001"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Trạng thái dự án
                  </label>

                  <select
                    value={projectStatus}
                    onChange={(e) =>
                      setProjectStatus(e.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="REFERENCE">
                      Dự án tham khảo
                    </option>
                    <option value="IN_PROGRESS">
                      Đang thực hiện
                    </option>
                    <option value="COMPLETED">
                      Đã hoàn thành
                    </option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    Tên dự án tiếng Việt *
                  </label>

                  <input
                    value={titleVi}
                    onChange={(e) =>
                      setTitleVi(e.target.value)
                    }
                    placeholder="Ví dụ: Nhà phố hiện đại"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Tên dự án tiếng Anh
                  </label>

                  <input
                    value={titleEn}
                    onChange={(e) =>
                      setTitleEn(e.target.value)
                    }
                    placeholder="Modern Townhouse"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Địa điểm tiếng Việt
                  </label>

                  <input
                    value={locationVi}
                    onChange={(e) =>
                      setLocationVi(e.target.value)
                    }
                    placeholder="TP.HCM"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Địa điểm tiếng Anh
                  </label>

                  <input
                    value={locationEn}
                    onChange={(e) =>
                      setLocationEn(e.target.value)
                    }
                    placeholder="Ho Chi Minh City"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Loại công trình tiếng Việt
                  </label>

                  <input
                    value={typeVi}
                    onChange={(e) =>
                      setTypeVi(e.target.value)
                    }
                    placeholder="Nhà phố / Biệt thự / Khách sạn..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Loại công trình tiếng Anh
                  </label>

                  <input
                    value={typeEn}
                    onChange={(e) =>
                      setTypeEn(e.target.value)
                    }
                    placeholder="Townhouse / Villa / Hotel..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Diện tích
                  </label>

                  <input
                    value={area}
                    onChange={(e) =>
                      setArea(e.target.value)
                    }
                    placeholder="90 m²"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Quy mô
                  </label>

                  <input
                    value={scale}
                    onChange={(e) =>
                      setScale(e.target.value)
                    }
                    placeholder="1 trệt + 3 lầu + sân thượng"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Phong cách tiếng Việt
                  </label>

                  <input
                    value={styleVi}
                    onChange={(e) =>
                      setStyleVi(e.target.value)
                    }
                    placeholder="Ví dụ: Hiện đại"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Phong cách tiếng Anh
                  </label>

                  <input
                    value={styleEn}
                    onChange={(e) =>
                      setStyleEn(e.target.value)
                    }
                    placeholder="Modern"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Hạng mục thực hiện tiếng Việt
                  </label>

                  <input
                    value={scopeVi}
                    onChange={(e) =>
                      setScopeVi(e.target.value)
                    }
                    placeholder="Thiết kế kiến trúc – Kết cấu – Nội thất – Hoàn thiện"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Hạng mục thực hiện tiếng Anh
                  </label>

                  <input
                    value={scopeEn}
                    onChange={(e) =>
                      setScopeEn(e.target.value)
                    }
                    placeholder="Architecture – Structure – Interior – Finishing"
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* DESCRIPTION */}

            <section className="border border-black/10 bg-white px-4 py-3">
              <h2 className="text-[12px] font-extrabold uppercase">
                Mô tả dự án
              </h2>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Mô tả tiếng Việt
                  </label>

                  <textarea
                    rows={8}
                    value={descriptionVi}
                    onChange={(e) =>
                      setDescriptionVi(e.target.value)
                    }
                    placeholder="Mô tả dự án..."
                    className="w-full resize-y border border-black/10 bg-[#fafafa] px-3 py-2.5 text-[12px] leading-5 outline-none transition focus:border-[#d7a53a]"
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Mô tả tiếng Anh
                  </label>

                  <textarea
                    rows={8}
                    value={descriptionEn}
                    onChange={(e) =>
                      setDescriptionEn(e.target.value)
                    }
                    placeholder="English project description..."
                    className="w-full resize-y border border-black/10 bg-[#fafafa] px-3 py-2.5 text-[12px] leading-5 outline-none transition focus:border-[#d7a53a]"
                  />
                </div>
              </div>
            </section>

            {/* IMAGES */}

            <section className="border border-black/10 bg-white px-4 py-4">
              <h2 className="text-[12px] font-extrabold uppercase">
                Hình ảnh dự án
              </h2>

              <p className="mt-1 text-[10px] text-black/45">
                Chọn 1 ảnh đại diện và các ảnh bổ sung cho
                thư viện dự án.
              </p>

              {/* MAIN IMAGE */}

              <div className="mt-5">
                <h3 className="text-[10px] font-extrabold uppercase tracking-[0.06em]">
                  Ảnh đại diện
                </h3>

                <div className="mt-2 grid gap-3 md:grid-cols-[230px_1fr]">
                  <label className="flex h-[180px] cursor-pointer flex-col items-center justify-center border border-dashed border-black/20 bg-[#fafafa] p-3 text-center transition hover:border-[#d7a53a]">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file =
                          e.target.files?.[0] ?? null;

                        setImageFile(file);
                      }}
                    />

                    <span className="text-[30px] leading-none text-[#c9932e]">
                      +
                    </span>

                    <span className="mt-2 text-[10px] font-extrabold uppercase">
                      Chọn ảnh đại diện
                    </span>

                    <span className="mt-1 text-[9px] text-black/40">
                      JPG, PNG, WEBP
                    </span>
                  </label>

                  <div className="h-[180px] overflow-hidden border border-black/10 bg-[#ececea]">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Ảnh đại diện"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center p-4 text-center text-[10px] text-black/35">
                        Ảnh đại diện sẽ hiển thị tại đây.
                      </div>
                    )}
                  </div>
                </div>

                {imageFile && (
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <p className="truncate text-[9px] text-black/55">
                      {imageFile.name}
                    </p>

                    <button
                      type="button"
                      onClick={() => setImageFile(null)}
                      className="shrink-0 text-[9px] font-extrabold uppercase text-red-600"
                    >
                      Xóa ảnh
                    </button>
                  </div>
                )}
              </div>

              {/* GALLERY */}

              <div className="mt-7 border-t border-black/10 pt-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-[10px] font-extrabold uppercase tracking-[0.06em]">
                      Thư viện ảnh
                    </h3>

                    <p className="mt-1 text-[9px] text-black/40">
                      Có thể chọn nhiều ảnh cùng lúc hoặc thêm
                      từng ảnh.
                    </p>
                  </div>

                  <label className="cursor-pointer bg-[#111820] px-5 py-3 text-[9px] font-extrabold uppercase tracking-[0.05em] text-white transition hover:bg-[#d7a53a] hover:text-[#111820]">
                    + Thêm ảnh Gallery

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        handleGalleryFiles(e.target.files);

                        /*
                         * Reset input để có thể chọn
                         * lại cùng một file nếu cần.
                         */
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>

                {galleryFiles.length > 0 ? (
                  <div className="mt-4">
                    <p className="mb-3 text-[9px] font-bold uppercase text-[#c9932e]">
                      Đã chọn {galleryFiles.length} ảnh Gallery
                    </p>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                      {galleryFiles.map((file, index) => (
                        <div
                          key={`${file.name}-${file.lastModified}-${index}`}
                          className="overflow-hidden border border-[#d7a53a]/35 bg-[#fffaf0]"
                        >
                          <div className="relative h-[145px]">
                            <img
                              src={galleryPreviews[index]}
                              alt={`Gallery ${index + 1}`}
                              className="h-full w-full object-cover"
                            />

                            <span className="absolute left-2 top-2 bg-[#d7a53a] px-2 py-1 text-[8px] font-extrabold text-[#111820]">
                              ẢNH {index + 1}
                            </span>
                          </div>

                          <div className="border-t border-[#d7a53a]/20">
                            <p className="truncate px-3 py-2 text-[8px] text-black/45">
                              {file.name}
                            </p>

                            <button
                              type="button"
                              onClick={() =>
                                removeGalleryFile(index)
                              }
                              className="w-full border-t border-[#d7a53a]/20 px-3 py-2 text-[9px] font-extrabold uppercase text-red-600 transition hover:bg-red-50"
                            >
                              Bỏ ảnh
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex min-h-[110px] items-center justify-center border border-dashed border-black/15 bg-[#fafafa] px-4 text-center">
                    <p className="text-[10px] text-black/35">
                      Chưa chọn ảnh Gallery.
                    </p>
                  </div>
                )}
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
                      setFeatured(e.target.checked)
                    }
                    className="h-4 w-4"
                  />

                  <span className="text-[11px] font-bold">
                    Dự án tiêu biểu
                  </span>
                </label>

                <label className="flex cursor-pointer items-center gap-2 sm:ml-6">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) =>
                      setPublished(e.target.checked)
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
                href="/admin/projects"
                className="inline-flex min-w-[110px] items-center justify-center border border-black/15 bg-white px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-black/60"
              >
                Hủy
              </a>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex min-w-[165px] items-center justify-center bg-[#d7a53a] px-6 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-[#111820] transition hover:bg-[#e6b64d] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "ĐANG LƯU..."
                  : "LƯU DỰ ÁN →"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}