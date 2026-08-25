"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) {
        throw loginError;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error(err);

      setError(
        "Email hoặc mật khẩu không chính xác.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b1118] px-5">
      <div className="w-full max-w-[440px] border border-white/10 bg-[#101923] p-7 shadow-2xl sm:p-10">
        <div className="text-center">
          <div className="text-[20px] font-extrabold tracking-[0.08em] text-[#d7a53a]">
            TÍN HẢI PHÁT
          </div>

          <div className="mt-1 text-[9px] tracking-[0.3em] text-white/50">
            CONSTRUCTION
          </div>

          <h1 className="mt-8 text-[24px] font-extrabold uppercase text-white">
            Quản trị website
          </h1>

          <p className="mt-3 text-[13px] leading-6 text-white/45">
            Đăng nhập để quản lý yêu cầu tư vấn từ khách hàng.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-white/50">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="tho@tinhaiphat.com"
              className="w-full border border-white/10 bg-[#0b1118] px-4 py-4 text-[14px] text-white outline-none transition placeholder:text-white/20 focus:border-[#d7a53a]"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-white/50">
              Mật khẩu
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full border border-white/10 bg-[#0b1118] px-4 py-4 text-[14px] text-white outline-none transition placeholder:text-white/20 focus:border-[#d7a53a]"
            />
          </div>

          {error && (
            <p className="text-[13px] font-semibold text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d7a53a] px-6 py-4 text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#0b1118] transition hover:bg-[#e6b64d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP →"}
          </button>
        </form>

        <a
          href="/"
          className="mt-6 block text-center text-[11px] font-bold uppercase tracking-[0.08em] text-white/35 transition hover:text-[#d7a53a]"
        >
          ← Về trang chủ
        </a>
      </div>
    </main>
  );
}