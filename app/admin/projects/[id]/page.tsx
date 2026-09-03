"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
};

type ProjectImage = {
  id: number;
  project_id: number;
  image_url: string;
  display_order: number;
};

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();

  const projectId = Number(params.id);

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

  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);

  /* =========================
     ẢNH ĐẠI DIỆN
  ========================= */

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

  /* =========================
     GALLERY
  ========================= */

  const [galleryImages, setGalleryImages] =
    useState<ProjectImage[]>([]);

  const [galleryFiles, setGalleryFiles] =
    useState<File[]>([]);

  const [galleryPreviews, setGalleryPreviews] =
    useState<string[]>([]);

  const [deletedGalleryImages, setDeletedGalleryImages] =
    useState<ProjectImage[]>([]);

  useEffect(() => {
    const previews = galleryFiles.map((file) =>
      URL.createObjectURL(file),
    );

    setGalleryPreviews(previews);

    return () => {
      previews.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [galleryFiles]);

  /* =========================
     LOAD PROJECT
  ========================= */

  useEffect(() => {
    const loadProject = async () => {
      try {
        setChecking(true);
        setError("");

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.replace("/admin/login");
          return;
        }

        if (!projectId || Number.isNaN(projectId)) {
          setError("Dự án không hợp lệ.");
          return;
        }

        const { data, error: loadError } =
          await supabase
            .from("projects")
            .select("*")
            .eq("id", projectId)
            .single();

        if (loadError || !data) {
          console.error(loadError);

          setError("Không tìm thấy dự án.");
          return;
        }

        const project = data as Project;

        setTitleVi(project.title_vi ?? "");
        setTitleEn(project.title_en ?? "");

        setLocationVi(project.location_vi ?? "");
        setLocationEn(project.location_en ?? "");

        setTypeVi(project.type_vi ?? "");
        setTypeEn(project.type_en ?? "");

        setDescriptionVi(
          project.description_vi ?? "",
        );

        setDescriptionEn(
          project.description_en ?? "",
        );

        setArea(project.area ?? "");
        setScale(project.scale ?? "");

        setFeatured(project.featured);
        setPublished(project.published);

        setCurrentImageUrl(project.image_url);

        /* LOAD GALLERY */

        const {
          data: galleryData,
          error: galleryError,
        } = await supabase
          .from("project_images")
          .select(
            "id, project_id, image_url, display_order",
          )
          .eq("project_id", projectId)
          .order("display_order", {
            ascending: true,
          })
          .order("id", {
            ascending: true,
          });

        if (galleryError) {
          console.error(
            "Load gallery error:",
            galleryError,
          );
        } else {
          setGalleryImages(
            (galleryData ?? []) as ProjectImage[],
          );
        }
      } catch (err) {
        console.error(err);

        setError(
          "Không thể tải dữ liệu dự án.",
        );
      } finally {
        setChecking(false);
      }
    };

    loadProject();
  }, [projectId, router]);

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

  const getStoragePath = (url: string) => {
    const marker = "/project-images/";

    const index = url.indexOf(marker);

    if (index === -1) {
      return null;
    }

    return url.substring(
      index + marker.length,
    );
  };

  /* =========================
     GALLERY ACTIONS
  ========================= */

  const handleGalleryFiles = (
    files: FileList | null,
  ) => {
    if (!files) {
      return;
    }

    const selected = Array.from(files);

    setGalleryFiles((current) => [
      ...current,
      ...selected,
    ]);
  };

  const removeNewGalleryFile = (
    index: number,
  ) => {
    setGalleryFiles((current) =>
      current.filter(
        (_, fileIndex) =>
          fileIndex !== index,
      ),
    );
  };

  const removeExistingGalleryImage = (
    image: ProjectImage,
  ) => {
    setGalleryImages((current) =>
      current.filter(
        (item) =>
          item.id !== image.id,
      ),
    );

    setDeletedGalleryImages((current) => [
      ...current,
      image,
    ]);
  };

  /* =========================
     SAVE
  ========================= */

  const handleSave = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setError("");

    if (!titleVi.trim()) {
      setError(
        "Vui lòng nhập tên dự án tiếng Việt.",
      );

      return;
    }

    setSaving(true);

    let uploadedMainPath:
      | string
      | null = null;

    const uploadedGalleryPaths:
      string[] = [];

    let newImageUrl =
      currentImageUrl;

    try {
      /* =====================
         UPLOAD ẢNH ĐẠI DIỆN
      ===================== */

      if (imageFile) {
        const safeName =
          sanitizeFileName(
            imageFile.name,
          );

        uploadedMainPath =
          `main-${projectId}-${Date.now()}-${safeName}`;

        const { error: uploadError } =
          await supabase.storage
            .from("project-images")
            .upload(
              uploadedMainPath,
              imageFile,
              {
                cacheControl: "3600",
                upsert: false,
              },
            );

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } =
          supabase.storage
            .from("project-images")
            .getPublicUrl(
              uploadedMainPath,
            );

        newImageUrl =
          publicUrlData.publicUrl;
      }

      /* =====================
         UPDATE PROJECT
      ===================== */

      const { error: updateError } =
        await supabase
          .from("projects")
          .update({
            title_vi:
              titleVi.trim(),

            title_en:
              titleEn.trim() ||
              null,

            location_vi:
              locationVi.trim() ||
              null,

            location_en:
              locationEn.trim() ||
              null,

            type_vi:
              typeVi.trim() ||
              null,

            type_en:
              typeEn.trim() ||
              null,

            description_vi:
              descriptionVi.trim() ||
              null,

            description_en:
              descriptionEn.trim() ||
              null,

            area:
              area.trim() || null,

            scale:
              scale.trim() || null,

            image_url:
              newImageUrl,

            featured,
            published,

            updated_at:
              new Date().toISOString(),
          })
          .eq("id", projectId);

      if (updateError) {
        throw updateError;
      }

      /* =====================
         UPLOAD GALLERY
      ===================== */

      let nextDisplayOrder =
        galleryImages.length;

      for (
        let index = 0;
        index <
        galleryFiles.length;
        index++
      ) {
        const file =
          galleryFiles[index];

        const safeName =
          sanitizeFileName(
            file.name,
          );

        const path =
          `gallery-${projectId}-${Date.now()}-${index}-${safeName}`;

        const { error: uploadError } =
          await supabase.storage
            .from("project-images")
            .upload(
              path,
              file,
              {
                cacheControl: "3600",
                upsert: false,
              },
            );

        if (uploadError) {
          throw uploadError;
        }

        uploadedGalleryPaths.push(
          path,
        );

        const { data: publicUrlData } =
          supabase.storage
            .from("project-images")
            .getPublicUrl(path);

        const imageUrl =
          publicUrlData.publicUrl;

        const { error: insertError } =
          await supabase
            .from("project_images")
            .insert({
              project_id:
                projectId,

              image_url:
                imageUrl,

              display_order:
                nextDisplayOrder,
            });

        if (insertError) {
          throw insertError;
        }

        nextDisplayOrder++;
      }

      /* =====================
         XÓA GALLERY ĐÃ CHỌN
      ===================== */

      for (
        const image of
        deletedGalleryImages
      ) {
        const {
          error: deleteDbError,
        } = await supabase
          .from("project_images")
          .delete()
          .eq("id", image.id);

        if (deleteDbError) {
          throw deleteDbError;
        }

        const storagePath =
          getStoragePath(
            image.image_url,
          );

        if (storagePath) {
          await supabase.storage
            .from("project-images")
            .remove([
              storagePath,
            ]);
        }
      }

      /* =====================
         XÓA ẢNH ĐẠI DIỆN CŨ
      ===================== */

      if (
        imageFile &&
        currentImageUrl &&
        currentImageUrl !==
          newImageUrl
      ) {
        const oldPath =
          getStoragePath(
            currentImageUrl,
          );

        if (oldPath) {
          await supabase.storage
            .from("project-images")
            .remove([
              oldPath,
            ]);
        }
      }

      router.push(
        "/admin/projects",
      );

      router.refresh();
    } catch (err) {
      console.error(err);

      /* Nếu lỗi thì xóa ảnh đại diện
         mới vừa upload */

      if (uploadedMainPath) {
        await supabase.storage
          .from("project-images")
          .remove([
            uploadedMainPath,
          ]);
      }

      /* Nếu lỗi thì dọn các ảnh
         gallery mới vừa upload */

      if (
        uploadedGalleryPaths.length >
        0
      ) {
        await supabase.storage
          .from("project-images")
          .remove(
            uploadedGalleryPaths,
          );
      }

      setError(
        "Không thể cập nhật dự án. Vui lòng thử lại.",
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
          Đang tải dự án...
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
              ADMIN · EDIT PROJECT
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
              Sửa dự án
            </h1>

            <p className="mt-1 text-[11px] text-black/50">
              Cập nhật thông tin, ảnh đại diện và thư viện hình ảnh dự án.
            </p>
          </div>

          {error ===
            "Không tìm thấy dự án." ||
          error ===
            "Dự án không hợp lệ." ? (
            <div className="mt-5 border border-red-200 bg-red-50 p-5 text-[13px] text-red-700">
              {error}
            </div>
          ) : (
            <form
              onSubmit={
                handleSave
              }
              className="mt-4 grid gap-2"
            >
              {/* BASIC */}

              <section className="border border-black/10 bg-white px-4 py-3">
                <h2 className="text-[12px] font-extrabold uppercase">
                  Thông tin dự án
                </h2>

                <div className="mt-3 grid gap-x-4 gap-y-2 md:grid-cols-2">
                  <div>
                    <label
                      className={
                        labelClass
                      }
                    >
                      Tên dự án tiếng Việt *
                    </label>

                    <input
                      value={
                        titleVi
                      }
                      onChange={(
                        e,
                      ) =>
                        setTitleVi(
                          e.target
                            .value,
                        )
                      }
                      className={
                        inputClass
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        labelClass
                      }
                    >
                      Tên dự án tiếng Anh
                    </label>

                    <input
                      value={
                        titleEn
                      }
                      onChange={(
                        e,
                      ) =>
                        setTitleEn(
                          e.target
                            .value,
                        )
                      }
                      className={
                        inputClass
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        labelClass
                      }
                    >
                      Địa điểm tiếng Việt
                    </label>

                    <input
                      value={
                        locationVi
                      }
                      onChange={(
                        e,
                      ) =>
                        setLocationVi(
                          e.target
                            .value,
                        )
                      }
                      className={
                        inputClass
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        labelClass
                      }
                    >
                      Địa điểm tiếng Anh
                    </label>

                    <input
                      value={
                        locationEn
                      }
                      onChange={(
                        e,
                      ) =>
                        setLocationEn(
                          e.target
                            .value,
                        )
                      }
                      className={
                        inputClass
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        labelClass
                      }
                    >
                      Loại công trình tiếng Việt
                    </label>

                    <input
                      value={
                        typeVi
                      }
                      onChange={(
                        e,
                      ) =>
                        setTypeVi(
                          e.target
                            .value,
                        )
                      }
                      className={
                        inputClass
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        labelClass
                      }
                    >
                      Loại công trình tiếng Anh
                    </label>

                    <input
                      value={
                        typeEn
                      }
                      onChange={(
                        e,
                      ) =>
                        setTypeEn(
                          e.target
                            .value,
                        )
                      }
                      className={
                        inputClass
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        labelClass
                      }
                    >
                      Diện tích
                    </label>

                    <input
                      value={area}
                      onChange={(
                        e,
                      ) =>
                        setArea(
                          e.target
                            .value,
                        )
                      }
                      className={
                        inputClass
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        labelClass
                      }
                    >
                      Quy mô
                    </label>

                    <input
                      value={
                        scale
                      }
                      onChange={(
                        e,
                      ) =>
                        setScale(
                          e.target
                            .value,
                        )
                      }
                      className={
                        inputClass
                      }
                    />
                  </div>
                </div>
              </section>

              {/* DESCRIPTION */}

              <section className="border border-black/10 bg-white px-4 py-3">
                <h2 className="text-[12px] font-extrabold uppercase">
                  Mô tả dự án
                </h2>

                <div className="mt-3 grid gap-3 lg:grid-cols-2">
                  <div>
                    <label
                      className={
                        labelClass
                      }
                    >
                      Mô tả tiếng Việt
                    </label>

                    <textarea
                      rows={8}
                      value={
                        descriptionVi
                      }
                      onChange={(
                        e,
                      ) =>
                        setDescriptionVi(
                          e.target
                            .value,
                        )
                      }
                      className="w-full resize-y border border-black/10 bg-[#fafafa] px-3 py-2.5 text-[12px] leading-5 outline-none transition focus:border-[#d7a53a]"
                    />
                  </div>

                  <div>
                    <label
                      className={
                        labelClass
                      }
                    >
                      Mô tả tiếng Anh
                    </label>

                    <textarea
                      rows={8}
                      value={
                        descriptionEn
                      }
                      onChange={(
                        e,
                      ) =>
                        setDescriptionEn(
                          e.target
                            .value,
                        )
                      }
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
                  Ảnh đại diện dùng cho danh sách dự án. Gallery hiển thị các ảnh bổ sung trong trang chi tiết.
                </p>

                {/* MAIN IMAGE */}

                <div className="mt-5">
                  <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em]">
                    Ảnh đại diện
                  </h3>

                  <div className="mt-2 grid gap-3 md:grid-cols-[230px_1fr]">
                    <label className="flex h-[180px] cursor-pointer flex-col items-center justify-center border border-dashed border-black/20 bg-[#fafafa] p-3 text-center transition hover:border-[#d7a53a]">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(
                          e,
                        ) => {
                          const file =
                            e
                              .target
                              .files?.[0] ??
                            null;

                          setImageFile(
                            file,
                          );
                        }}
                      />

                      <span className="text-[30px] leading-none text-[#c9932e]">
                        +
                      </span>

                      <span className="mt-2 text-[10px] font-extrabold uppercase">
                        Thay ảnh đại diện
                      </span>

                      <span className="mt-1 text-[9px] text-black/40">
                        JPG, PNG, WEBP
                      </span>
                    </label>

                    <div className="h-[180px] overflow-hidden border border-black/10 bg-[#ececea]">
                      {imagePreview ? (
                        <img
                          src={
                            imagePreview
                          }
                          alt="Ảnh đại diện mới"
                          className="h-full w-full object-cover"
                        />
                      ) : currentImageUrl ? (
                        <img
                          src={
                            currentImageUrl
                          }
                          alt={
                            titleVi
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center p-4 text-center text-[10px] text-black/35">
                          Dự án chưa có ảnh đại diện.
                        </div>
                      )}
                    </div>
                  </div>

                  {imageFile && (
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="truncate text-[9px] text-black/55">
                        Ảnh mới:{" "}
                        {
                          imageFile.name
                        }
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setImageFile(
                            null,
                          )
                        }
                        className="shrink-0 text-[9px] font-extrabold uppercase text-red-600"
                      >
                        Hủy thay ảnh
                      </button>
                    </div>
                  )}
                </div>

                {/* GALLERY */}

                <div className="mt-7 border-t border-black/10 pt-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em]">
                        Thư viện ảnh
                      </h3>

                      <p className="mt-1 text-[9px] text-black/40">
                        Có thể chọn nhiều ảnh cùng lúc.
                      </p>
                    </div>

                    <label className="cursor-pointer bg-[#111820] px-5 py-2.5 text-[9px] font-extrabold uppercase tracking-[0.05em] text-white transition hover:bg-[#d7a53a] hover:text-[#111820]">
                      + Thêm ảnh Gallery

                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(
                          e,
                        ) => {
                          handleGalleryFiles(
                            e
                              .target
                              .files,
                          );

                          e.target.value =
                            "";
                        }}
                      />
                    </label>
                  </div>

                  {/* EXISTING IMAGES */}

                  {galleryImages.length >
                    0 && (
                    <div className="mt-4">
                      <p className="mb-2 text-[9px] font-bold uppercase text-black/40">
                        Ảnh hiện có
                      </p>

                      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {galleryImages.map(
                          (
                            image,
                            index,
                          ) => (
                            <div
                              key={
                                image.id
                              }
                              className="overflow-hidden border border-black/10 bg-[#fafafa]"
                            >
                              <div className="relative h-[140px]">
                                <img
                                  src={
                                    image.image_url
                                  }
                                  alt={`Gallery ${
                                    index +
                                    1
                                  }`}
                                  className="h-full w-full object-cover"
                                />

                                <div className="absolute left-2 top-2 bg-black/65 px-2 py-1 text-[8px] font-bold text-white">
                                  #
                                  {index +
                                    1}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeExistingGalleryImage(
                                    image,
                                  )
                                }
                                className="w-full border-t border-black/10 px-3 py-2 text-[9px] font-extrabold uppercase text-red-600 transition hover:bg-red-50"
                              >
                                Xóa ảnh
                              </button>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {/* NEW IMAGES */}

                  {galleryPreviews.length >
                    0 && (
                    <div className="mt-5">
                      <p className="mb-2 text-[9px] font-bold uppercase text-[#c9932e]">
                        Ảnh mới chờ upload
                      </p>

                      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {galleryPreviews.map(
                          (
                            preview,
                            index,
                          ) => (
                            <div
                              key={
                                preview
                              }
                              className="overflow-hidden border border-[#d7a53a]/40 bg-[#fffaf0]"
                            >
                              <div className="relative h-[140px]">
                                <img
                                  src={
                                    preview
                                  }
                                  alt={`Ảnh mới ${
                                    index +
                                    1
                                  }`}
                                  className="h-full w-full object-cover"
                                />

                                <div className="absolute left-2 top-2 bg-[#d7a53a] px-2 py-1 text-[8px] font-bold text-[#111820]">
                                  MỚI
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeNewGalleryFile(
                                    index,
                                  )
                                }
                                className="w-full border-t border-[#d7a53a]/30 px-3 py-2 text-[9px] font-extrabold uppercase text-red-600 transition hover:bg-red-50"
                              >
                                Bỏ ảnh
                              </button>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {galleryImages.length ===
                    0 &&
                    galleryFiles.length ===
                      0 && (
                      <div className="mt-4 flex min-h-[100px] items-center justify-center border border-dashed border-black/15 bg-[#fafafa] px-4 text-center text-[10px] text-black/35">
                        Chưa có ảnh trong thư viện.
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
                      checked={
                        featured
                      }
                      onChange={(
                        e,
                      ) =>
                        setFeatured(
                          e.target
                            .checked,
                        )
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
                      checked={
                        published
                      }
                      onChange={(
                        e,
                      ) =>
                        setPublished(
                          e.target
                            .checked,
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
                  href="/admin/projects"
                  className="inline-flex min-w-[110px] items-center justify-center border border-black/15 bg-white px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-black/60"
                >
                  Hủy
                </a>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex min-w-[185px] items-center justify-center bg-[#d7a53a] px-6 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-[#111820] transition hover:bg-[#e6b64d] disabled:cursor-not-allowed disabled:opacity-50"
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