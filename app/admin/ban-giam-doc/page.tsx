"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Member = {
  id: number;
  name_vi: string;
  name_en: string | null;
  position_vi: string | null;
  position_en: string | null;
  description_vi: string | null;
  description_en: string | null;
  image_url: string | null;
  display_order: number;
  published: boolean;
};

type FormData = {
  name_vi: string;
  name_en: string;
  position_vi: string;
  position_en: string;
  description_vi: string;
  description_en: string;
  display_order: number;
  published: boolean;
};

const initialForm: FormData = {
  name_vi: "",
  name_en: "",
  position_vi: "",
  position_en: "",
  description_vi: "",
  description_en: "",
  display_order: 1,
  published: true,
};

export default function AdminManagementPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [members, setMembers] = useState<Member[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<FormData>(initialForm);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      setChecking(false);
      await loadMembers();
    };

    init();
  }, [router]);

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const loadMembers = async () => {
    setLoading(true);
    setError("");

    const { data, error: loadError } = await supabase
      .from("management_team")
      .select("*")
      .order("display_order", { ascending: true })
      .order("id", { ascending: true });

    if (loadError) {
      console.error(loadError);
      setError("Không thể tải danh sách Ban giám đốc.");
      setLoading(false);
      return;
    }

    setMembers((data ?? []) as Member[]);
    setLoading(false);
  };

  const updateField = (
    field: keyof FormData,
    value: string | number | boolean,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const clearPreview = () => {
    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl("");
    setSelectedFile(null);
  };

  const resetForm = () => {
    clearPreview();

    setForm(initialForm);
    setEditingId(null);
    setCurrentImageUrl("");
    setError("");
    setSuccess("");
  };

  const editMember = (member: Member) => {
    clearPreview();

    setEditingId(member.id);

    setForm({
      name_vi: member.name_vi || "",
      name_en: member.name_en || "",
      position_vi: member.position_vi || "",
      position_en: member.position_en || "",
      description_vi: member.description_vi || "",
      description_en: member.description_en || "",
      display_order: member.display_order ?? 1,
      published: member.published,
    });

    setCurrentImageUrl(member.image_url || "");
    setPreviewUrl(member.image_url || "");

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Vui lòng chọn đúng file hình ảnh.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("Ảnh tối đa 5MB.");
      return;
    }

    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError("");
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      return currentImageUrl || null;
    }

    const extension =
      selectedFile.name.split(".").pop()?.toLowerCase() || "jpg";

    const safeExtension = extension.replace(/[^a-z0-9]/g, "") || "jpg";

    const filePath = `directors/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${safeExtension}`;

    const { error: uploadError } = await supabase.storage
      .from("management")
      .upload(filePath, selectedFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("management")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const getStoragePath = (publicUrl: string) => {
    const marker = "/storage/v1/object/public/management/";

    const index = publicUrl.indexOf(marker);

    if (index === -1) {
      return null;
    }

    return decodeURIComponent(
      publicUrl.substring(index + marker.length),
    );
  };

  const deleteStorageImage = async (imageUrl: string | null) => {
    if (!imageUrl) {
      return;
    }

    const path = getStoragePath(imageUrl);

    if (!path) {
      return;
    }

    const { error: removeError } = await supabase.storage
      .from("management")
      .remove([path]);

    if (removeError) {
      console.error("Delete management image:", removeError);
    }
  };

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name_vi.trim()) {
      setError("Vui lòng nhập họ tên.");
      return;
    }

    setSaving(true);

    let uploadedImageUrl: string | null = null;

    try {
      uploadedImageUrl = await uploadImage();

      const payload = {
        name_vi: form.name_vi.trim(),
        name_en: form.name_en.trim() || null,
        position_vi: form.position_vi.trim() || null,
        position_en: form.position_en.trim() || null,
        description_vi: form.description_vi.trim() || null,
        description_en: form.description_en.trim() || null,
        image_url: uploadedImageUrl,
        display_order: Number(form.display_order) || 0,
        published: form.published,
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        const { error: updateError } = await supabase
          .from("management_team")
          .update(payload)
          .eq("id", editingId);

        if (updateError) {
          throw updateError;
        }

        if (
          selectedFile &&
          currentImageUrl &&
          uploadedImageUrl !== currentImageUrl
        ) {
          await deleteStorageImage(currentImageUrl);
        }

        setSuccess("Đã cập nhật thành viên.");
      } else {
        const { error: insertError } = await supabase
          .from("management_team")
          .insert(payload);

        if (insertError) {
          if (selectedFile && uploadedImageUrl) {
            await deleteStorageImage(uploadedImageUrl);
          }

          throw insertError;
        }

        setSuccess("Đã thêm thành viên.");
      }

      clearPreview();
      setEditingId(null);
      setCurrentImageUrl("");
      setForm(initialForm);

      await loadMembers();
    } catch (err) {
      console.error(err);

      setError(
        "Không thể lưu thành viên. Vui lòng kiểm tra lại dữ liệu hoặc ảnh.",
      );
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (member: Member) => {
    setError("");

    const { error: updateError } = await supabase
      .from("management_team")
      .update({
        published: !member.published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", member.id);

    if (updateError) {
      console.error(updateError);
      setError("Không thể cập nhật trạng thái.");
      return;
    }

    setMembers((current) =>
      current.map((item) =>
        item.id === member.id
          ? {
              ...item,
              published: !item.published,
            }
          : item,
      ),
    );
  };

  const deleteMember = async (member: Member) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa "${member.name_vi}"?`,
    );

    if (!confirmed) {
      return;
    }

    setError("");

    const { error: deleteError } = await supabase
      .from("management_team")
      .delete()
      .eq("id", member.id);

    if (deleteError) {
      console.error(deleteError);
      setError("Không thể xóa thành viên.");
      return;
    }

    await deleteStorageImage(member.image_url);

    setMembers((current) =>
      current.filter((item) => item.id !== member.id),
    );

    if (editingId === member.id) {
      resetForm();
    }
  };

  const inputClass =
    "w-full border border-black/10 bg-[#fafafa] px-4 py-3 text-[13px] outline-none transition focus:border-[#d7a53a]";

  const labelClass =
    "mb-2 block text-[10px] font-bold uppercase tracking-[0.07em] text-black/50";

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b1118] text-white">
        <p className="text-sm text-white/60">
          Đang kiểm tra đăng nhập...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#111820]">
      {/* HEADER */}
      <header className="bg-[#0b1118] px-5 py-5 text-white lg:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <div>
            <div className="text-[18px] font-extrabold tracking-[0.08em] text-[#d7a53a]">
              TÍN HẢI PHÁT
            </div>

            <div className="mt-1 text-[9px] tracking-[0.3em] text-white/50">
              ADMIN · BAN GIÁM ĐỐC
            </div>
          </div>

          <a
            href="/admin"
            className="border border-white/15 px-4 py-2.5 text-[10px] font-extrabold uppercase text-white/70"
          >
            ← Dashboard
          </a>
        </div>
      </header>

      <section className="px-5 py-8 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9932e]">
            Quản lý nội dung
          </p>

          <h1 className="mt-2 text-[28px] font-extrabold uppercase">
            Ban giám đốc
          </h1>

          <p className="mt-2 text-[13px] text-black/50">
            Thêm, sửa và quản lý thông tin lãnh đạo hiển thị trên website.
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mt-7 border border-black/10 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-[13px] font-extrabold uppercase">
                {editingId
                  ? "Sửa thành viên"
                  : "Thêm thành viên"}
              </h2>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-[10px] font-bold uppercase text-black/40"
                >
                  Hủy sửa
                </button>
              )}
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>
                  Họ tên tiếng Việt *
                </label>

                <input
                  value={form.name_vi}
                  onChange={(e) =>
                    updateField("name_vi", e.target.value)
                  }
                  className={inputClass}
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Họ tên tiếng Anh
                </label>

                <input
                  value={form.name_en}
                  onChange={(e) =>
                    updateField("name_en", e.target.value)
                  }
                  className={inputClass}
                  placeholder="Nguyen Van A"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Chức vụ tiếng Việt
                </label>

                <input
                  value={form.position_vi}
                  onChange={(e) =>
                    updateField(
                      "position_vi",
                      e.target.value,
                    )
                  }
                  className={inputClass}
                  placeholder="Giám đốc"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Chức vụ tiếng Anh
                </label>

                <input
                  value={form.position_en}
                  onChange={(e) =>
                    updateField(
                      "position_en",
                      e.target.value,
                    )
                  }
                  className={inputClass}
                  placeholder="Director"
                />
              </div>

              {/* IMAGE */}
              <div className="md:col-span-2">
                <label className={labelClass}>
                  Hình ảnh
                </label>

                <div className="grid gap-4 md:grid-cols-[260px_1fr]">
                  <div className="flex min-h-[260px] items-center justify-center overflow-hidden border border-dashed border-black/20 bg-[#f7f7f5]">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-[260px] w-full object-cover"
                      />
                    ) : (
                      <div className="px-5 text-center">
                        <div className="text-[30px] text-[#d7a53a]">
                          +
                        </div>

                        <p className="mt-2 text-[11px] font-extrabold uppercase">
                          Chưa chọn ảnh
                        </p>

                        <p className="mt-2 text-[10px] text-black/35">
                          JPG, PNG, WEBP
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-center">
                    <input
                      id="management-image"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    <label
                      htmlFor="management-image"
                      className="inline-flex w-fit cursor-pointer items-center justify-center bg-[#111820] px-6 py-3 text-[10px] font-extrabold uppercase tracking-[0.05em] text-white transition hover:bg-[#d7a53a] hover:text-[#111820]"
                    >
                      Chọn ảnh từ máy
                    </label>

                    <p className="mt-3 text-[10px] leading-5 text-black/40">
                      Ảnh sẽ tự upload lên Supabase khi bấm lưu.
                      Dung lượng tối đa 5MB.
                    </p>

                    {selectedFile && (
                      <p className="mt-3 text-[11px] font-semibold text-[#c9932e]">
                        {selectedFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Giới thiệu tiếng Việt
                </label>

                <textarea
                  rows={5}
                  value={form.description_vi}
                  onChange={(e) =>
                    updateField(
                      "description_vi",
                      e.target.value,
                    )
                  }
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Giới thiệu tiếng Anh
                </label>

                <textarea
                  rows={5}
                  value={form.description_en}
                  onChange={(e) =>
                    updateField(
                      "description_en",
                      e.target.value,
                    )
                  }
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Thứ tự hiển thị
                </label>

                <input
                  type="number"
                  min={0}
                  value={form.display_order}
                  onChange={(e) =>
                    updateField(
                      "display_order",
                      Number(e.target.value),
                    )
                  }
                  className={inputClass}
                />
              </div>

              <div className="flex items-end">
                <label className="flex cursor-pointer items-center gap-3 pb-3">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) =>
                      updateField(
                        "published",
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
            </div>

            {error && (
              <div className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 border border-green-200 bg-green-50 px-4 py-3 text-[12px] font-semibold text-green-700">
                ✓ {success}
              </div>
            )}

            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#d7a53a] px-7 py-3 text-[10px] font-extrabold uppercase tracking-[0.05em] transition hover:bg-[#e6b64d] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "ĐANG LƯU..."
                  : editingId
                    ? "LƯU THAY ĐỔI →"
                    : "THÊM THÀNH VIÊN →"}
              </button>
            </div>
          </form>

          {/* LIST */}
          <section className="mt-7 border border-black/10 bg-white">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <h2 className="text-[13px] font-extrabold uppercase">
                Danh sách Ban giám đốc
              </h2>

              <span className="text-[11px] text-black/40">
                {members.length} thành viên
              </span>
            </div>

            {loading ? (
              <div className="p-10 text-center text-[12px] text-black/40">
                Đang tải...
              </div>
            ) : members.length === 0 ? (
              <div className="p-10 text-center text-[12px] text-black/40">
                Chưa có thành viên nào.
              </div>
            ) : (
              members.map((member) => (
                <div
                  key={member.id}
                  className="grid gap-4 border-t border-black/[0.06] p-5 first:border-t-0 md:grid-cols-[90px_1fr_auto] md:items-center"
                >
                  <div className="h-[90px] w-[90px] overflow-hidden bg-[#ececea]">
                    {member.image_url ? (
                      <img
                        src={member.image_url}
                        alt={member.name_vi}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[25px] text-black/20">
                        ♟
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[15px] font-extrabold">
                        {member.name_vi}
                      </h3>

                      <span
                        className={`px-2 py-1 text-[8px] font-bold uppercase ${
                          member.published
                            ? "bg-green-50 text-green-700"
                            : "bg-black/5 text-black/35"
                        }`}
                      >
                        {member.published
                          ? "Đang hiển thị"
                          : "Đang ẩn"}
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] font-bold uppercase text-[#c9932e]">
                      {member.position_vi ||
                        "Chưa có chức vụ"}
                    </p>

                    <p className="mt-2 text-[12px] leading-6 text-black/50">
                      {member.description_vi ||
                        "Chưa có nội dung giới thiệu."}
                    </p>

                    <p className="mt-2 text-[9px] text-black/30">
                      Thứ tự: {member.display_order}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <button
                      type="button"
                      onClick={() => editMember(member)}
                      className="border border-black/10 px-3 py-2 text-[9px] font-extrabold uppercase transition hover:border-[#d7a53a]"
                    >
                      Sửa
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        togglePublished(member)
                      }
                      className="border border-black/10 px-3 py-2 text-[9px] font-extrabold uppercase transition hover:border-[#d7a53a]"
                    >
                      {member.published
                        ? "Ẩn"
                        : "Hiện"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteMember(member)
                      }
                      className="border border-red-200 px-3 py-2 text-[9px] font-extrabold uppercase text-red-600 transition hover:bg-red-50"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
      </section>
    </main>
  );
}