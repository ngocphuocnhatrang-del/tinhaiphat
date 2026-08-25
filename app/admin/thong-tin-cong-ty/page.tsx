"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type CompanySettings = {
  id: number;
  company_name: string;
  company_slogan: string | null;
  hotline: string | null;
  email: string | null;
  address: string | null;
  service_area: string | null;
  facebook_url: string | null;
  zalo_url: string | null;
};

export default function CompanySettingsPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [recordId, setRecordId] = useState<number | null>(null);

  const [companyName, setCompanyName] = useState("");
  const [companySlogan, setCompanySlogan] = useState("");
  const [hotline, setHotline] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [zaloUrl, setZaloUrl] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      setChecking(true);
      setError("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      const { data, error: loadError } = await supabase
        .from("company_settings")
        .select("*")
        .order("id", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (loadError) {
        console.error(loadError);
        setError("Không thể tải thông tin công ty.");
        setChecking(false);
        return;
      }

      if (!data) {
        setError("Chưa có dữ liệu thông tin công ty.");
        setChecking(false);
        return;
      }

      const settings = data as CompanySettings;

      setRecordId(settings.id);
      setCompanyName(settings.company_name || "");
      setCompanySlogan(settings.company_slogan || "");
      setHotline(settings.hotline || "");
      setEmail(settings.email || "");
      setAddress(settings.address || "");
      setServiceArea(settings.service_area || "");
      setFacebookUrl(settings.facebook_url || "");
      setZaloUrl(settings.zalo_url || "");

      setChecking(false);
    };

    loadSettings();
  }, [router]);

  const handleSave = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!recordId) {
      setError("Không tìm thấy bản ghi thông tin công ty.");
      return;
    }

    if (!companyName.trim()) {
      setError("Vui lòng nhập tên công ty.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const { error: updateError } = await supabase
      .from("company_settings")
      .update({
        company_name: companyName.trim(),
        company_slogan: companySlogan.trim() || null,
        hotline: hotline.trim() || null,
        email: email.trim() || null,
        address: address.trim() || null,
        service_area: serviceArea.trim() || null,
        facebook_url: facebookUrl.trim() || null,
        zalo_url: zaloUrl.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", recordId);

    if (updateError) {
      console.error(updateError);
      setError("Không thể lưu thông tin công ty.");
      setSaving(false);
      return;
    }

    setSuccess("Đã cập nhật thông tin công ty.");
    setSaving(false);
  };

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b1118] text-white">
        <p className="text-sm text-white/60">
          Đang tải thông tin công ty...
        </p>
      </main>
    );
  }

  const inputClass =
    "w-full border border-black/10 bg-[#fafafa] px-4 py-3 text-[13px] outline-none transition focus:border-[#d7a53a]";

  const labelClass =
    "mb-2 block text-[10px] font-bold uppercase tracking-[0.07em] text-black/50";

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#111820]">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-[#0b1118] px-5 py-5 text-white lg:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <div>
            <div className="text-[18px] font-extrabold tracking-[0.08em] text-[#d7a53a]">
              TÍN HẢI PHÁT
            </div>

            <div className="mt-1 text-[9px] tracking-[0.3em] text-white/50">
              ADMIN · COMPANY SETTINGS
            </div>
          </div>

          <a
            href="/admin"
            className="inline-flex items-center justify-center border border-white/15 px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-white/70 transition hover:border-[#d7a53a] hover:text-[#d7a53a]"
          >
            ← Dashboard
          </a>
        </div>
      </header>

      {/* CONTENT */}
      <section className="px-5 py-8 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9932e]">
              Cài đặt nội dung
            </p>

            <h1 className="mt-2 text-[28px] font-extrabold uppercase">
              Thông tin công ty
            </h1>

            <p className="mt-2 text-[13px] text-black/50">
              Cập nhật các thông tin liên hệ và nhận diện cơ bản của website.
            </p>
          </div>

          <form
            onSubmit={handleSave}
            className="mt-7 grid gap-3"
          >
            {/* COMPANY */}
            <section className="border border-black/10 bg-white p-5">
              <h2 className="text-[13px] font-extrabold uppercase">
                Thông tin cơ bản
              </h2>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Tên công ty *
                  </label>

                  <input
                    value={companyName}
                    onChange={(e) =>
                      setCompanyName(e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Slogan
                  </label>

                  <input
                    value={companySlogan}
                    onChange={(e) =>
                      setCompanySlogan(e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* CONTACT */}
            <section className="border border-black/10 bg-white p-5">
              <h2 className="text-[13px] font-extrabold uppercase">
                Liên hệ
              </h2>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Hotline
                  </label>

                  <input
                    value={hotline}
                    onChange={(e) =>
                      setHotline(e.target.value)
                    }
                    className={inputClass}
                    placeholder="0943 666 866"
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className={inputClass}
                    placeholder="info@tinhaiphat.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>
                    Địa chỉ
                  </label>

                  <input
                    value={address}
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                    className={inputClass}
                    placeholder="Địa chỉ văn phòng..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>
                    Khu vực hoạt động
                  </label>

                  <input
                    value={serviceArea}
                    onChange={(e) =>
                      setServiceArea(e.target.value)
                    }
                    className={inputClass}
                    placeholder="TP.HCM và khu vực lân cận"
                  />
                </div>
              </div>
            </section>

            {/* SOCIAL */}
            <section className="border border-black/10 bg-white p-5">
              <h2 className="text-[13px] font-extrabold uppercase">
                Mạng xã hội
              </h2>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Facebook
                  </label>

                  <input
                    value={facebookUrl}
                    onChange={(e) =>
                      setFacebookUrl(e.target.value)
                    }
                    className={inputClass}
                    placeholder="https://facebook.com/..."
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Zalo
                  </label>

                  <input
                    value={zaloUrl}
                    onChange={(e) =>
                      setZaloUrl(e.target.value)
                    }
                    className={inputClass}
                    placeholder="https://zalo.me/..."
                  />
                </div>
              </div>
            </section>

            {error && (
              <div className="border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="border border-green-200 bg-green-50 px-4 py-3 text-[12px] font-semibold text-green-700">
                ✓ {success}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-1">
              <a
                href="/admin"
                className="inline-flex min-w-[110px] items-center justify-center border border-black/15 bg-white px-5 py-3 text-[10px] font-extrabold uppercase text-black/60"
              >
                Hủy
              </a>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex min-w-[190px] items-center justify-center bg-[#d7a53a] px-6 py-3 text-[10px] font-extrabold uppercase tracking-[0.05em] text-[#111820] transition hover:bg-[#e6b64d] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "ĐANG LƯU..."
                  : "LƯU THÔNG TIN →"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}