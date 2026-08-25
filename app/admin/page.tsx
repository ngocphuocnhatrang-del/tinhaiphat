"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminDashboardPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [projectCount, setProjectCount] = useState(0);
  const [newsCount, setNewsCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);

  useEffect(() => {
    const loadDashboard = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      const [
        projectsResult,
        newsResult,
        contactsResult,
      ] = await Promise.all([
        supabase
          .from("projects")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("news")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("contact_requests")
          .select("*", {
            count: "exact",
            head: true,
          }),
      ]);

      setProjectCount(projectsResult.count ?? 0);
      setNewsCount(newsResult.count ?? 0);
      setContactCount(contactsResult.count ?? 0);

      setChecking(false);
    };

    loadDashboard();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.replace("/admin/login");
    router.refresh();
  };

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b1118] text-white">
        <p className="text-sm text-white/50">
          Đang tải trang quản trị...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#111820]">
      {/* HEADER */}
      <header className="bg-[#0b1118] px-5 py-5 text-white lg:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5">
          <div>
            <div className="text-[18px] font-extrabold tracking-[0.08em] text-[#d7a53a]">
              TÍN HẢI PHÁT
            </div>

            <div className="mt-1 text-[9px] tracking-[0.3em] text-white/50">
              ADMIN DASHBOARD
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="border border-white/15 px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-white/70 transition hover:border-[#d7a53a] hover:text-[#d7a53a]"
            >
              Xem website
            </a>

            <button
              type="button"
              onClick={handleLogout}
              className="border border-[#d7a53a] px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-[#d7a53a] transition hover:bg-[#d7a53a] hover:text-[#111820]"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9932e]">
              Hệ thống quản trị
            </p>

            <h1 className="mt-3 text-[30px] font-extrabold uppercase">
              Quản lý website
            </h1>

            <p className="mt-3 text-[14px] text-black/50">
              Chọn nội dung cần quản lý.
            </p>
          </div>

          {/* MODULES */}
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {/* PROJECTS */}
            <a
              href="/admin/projects"
              className="group border border-black/[0.07] bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center bg-[#111820] text-[20px] text-[#d7a53a]">
                  ▦
                </div>

                <span className="text-[28px] font-extrabold text-black/10">
                  {projectCount}
                </span>
              </div>

              <h2 className="mt-7 text-[18px] font-extrabold uppercase">
                Dự án
              </h2>

              <p className="mt-3 text-[13px] leading-6 text-black/50">
                Thêm, sửa, xóa, thay ảnh và quản lý các dự án trên website.
              </p>

              <div className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#c9932e]">
                Quản lý dự án →
              </div>
            </a>

            {/* NEWS */}
            <a
              href="/admin/news"
              className="group border border-black/[0.07] bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center bg-[#111820] text-[20px] text-[#d7a53a]">
                  ▤
                </div>

                <span className="text-[28px] font-extrabold text-black/10">
                  {newsCount}
                </span>
              </div>

              <h2 className="mt-7 text-[18px] font-extrabold uppercase">
                Tin tức
              </h2>

              <p className="mt-3 text-[13px] leading-6 text-black/50">
                Đăng bài mới, chỉnh sửa nội dung, ảnh và bài viết nổi bật.
              </p>

              <div className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#c9932e]">
                Quản lý tin tức →
              </div>
            </a>

            {/* CONTACTS */}
<a
  href="/admin/lien-he"
  className="group border border-black/[0.07] bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]"
>
  <div className="flex items-start justify-between">
    <div className="flex h-12 w-12 items-center justify-center bg-[#111820] text-[20px] text-[#d7a53a]">
      ☎
    </div>

    <span className="text-[28px] font-extrabold text-black/10">
      {contactCount}
    </span>
  </div>

  <h2 className="mt-7 text-[18px] font-extrabold uppercase">
    Yêu cầu tư vấn
  </h2>

  <p className="mt-3 text-[13px] leading-6 text-black/50">
    Danh sách khách hàng gửi yêu cầu tư vấn và báo giá.
  </p>

  <div className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#c9932e]">
    Quản lý yêu cầu →
  </div>
</a>

            {/* COMPANY */}
<div className="group border border-black/[0.07] bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
  <div className="flex h-12 w-12 items-center justify-center bg-[#111820] text-[20px] text-[#d7a53a]">
    
  </div>

  <h2 className="mt-7 text-[18px] font-extrabold uppercase">
    Thông tin công ty
  </h2>

  <p className="mt-3 text-[13px] leading-6 text-black/50">
    Hotline, email, địa chỉ, thông tin pháp lý và giới thiệu.
  </p>

  <button
    type="button"
    onClick={() =>
      router.push("/admin/thong-tin-cong-ty")
    }
    className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#c9932e] transition hover:text-[#111820]"
  >
    Quản lý thông tin →
  </button>
</div>
            
            {/* MANAGEMENT */}
<div className="group border border-black/[0.07] bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
  <div className="flex h-12 w-12 items-center justify-center bg-[#111820] text-[20px] text-[#d7a53a]">
    ♟
  </div>

  <h2 className="mt-7 text-[18px] font-extrabold uppercase">
    Ban giám đốc
  </h2>

  <p className="mt-3 text-[13px] leading-6 text-black/50">
    Quản lý hình ảnh, họ tên, chức vụ và thông tin lãnh đạo.
  </p>

  <button
    type="button"
    onClick={() =>
      router.push("/admin/ban-giam-doc")
    }
    className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#c9932e] transition hover:text-[#111820]"
  >
    Quản lý ban giám đốc →
  </button>
</div>

            {/* SETTINGS */}
            <div className="border border-black/[0.07] bg-white p-7 opacity-60">
              <div className="flex h-12 w-12 items-center justify-center bg-[#111820] text-[20px] text-[#d7a53a]">
                ⚙
              </div>

              <h2 className="mt-7 text-[18px] font-extrabold uppercase">
                Cài đặt website
              </h2>

              <p className="mt-3 text-[13px] leading-6 text-black/50">
                SEO, mạng xã hội, footer và các thiết lập chung.
              </p>

              <div className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.08em] text-black/25">
                Sẽ làm tiếp
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}