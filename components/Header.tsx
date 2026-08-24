"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
  { label: t.nav.home, href: "/" },
  { label: t.nav.about, href: "/gioi-thieu" },
  { label: t.nav.services, href: "/dich-vu" },
  { label: t.nav.projects, href: "/du-an" },
  { label: t.nav.process, href: "/quy-trinh" },
  { label: t.nav.news, href: "/tin-tuc" },
  { label: t.nav.contact, href: "/lien-he" },
];

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#0b1016]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-5 lg:h-[76px] lg:px-8">
        {/* LOGO */}
        <a
          href="/"
          className="flex min-w-0 items-center gap-2.5 sm:gap-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-end justify-center gap-[2px] sm:h-11 sm:w-11">
            <span className="h-5 w-[5px] bg-[#d7a53a] sm:w-[6px]" />
            <span className="h-7 w-[5px] bg-[#d7a53a] sm:h-8 sm:w-[6px]" />
            <span className="h-9 w-[5px] bg-[#d7a53a] sm:h-10 sm:w-[6px]" />
            <span className="h-6 w-[5px] bg-[#d7a53a] sm:h-7 sm:w-[6px]" />
          </div>

          <div className="min-w-0 leading-none">
            <div className="whitespace-nowrap text-[15px] font-extrabold tracking-[0.08em] text-[#e5b24a] sm:text-[18px]">
              TÍN HẢI PHÁT
            </div>

            <div className="mt-1 whitespace-nowrap text-[7px] tracking-[0.28em] text-white/80 sm:text-[9px] sm:tracking-[0.32em]">
              CONSTRUCTION
            </div>

            <div className="mt-1 hidden text-[7px] uppercase tracking-[0.06em] text-[#d7a53a]/85 xl:block">
              Kiến tạo không gian - Xây dựng giá trị bền vững
            </div>
          </div>
        </a>

       {/* DESKTOP MENU */}
<nav className="hidden items-center gap-6 lg:flex">
  {navItems.map((item) => {
    const isActive =
  item.href === "/"
    ? pathname === "/"
    : pathname === item.href ||
      pathname.startsWith(`${item.href}/`);

    return (
      <a
        key={item.href}
        href={item.href}
        className={`relative py-2 text-[11px] font-semibold tracking-[0.03em] transition xl:text-[12px] ${
          isActive
            ? "text-[#e5b24a]"
            : "text-white/90 hover:text-[#e5b24a]"
        }`}
      >
        {item.label}

        {isActive && (
          <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#e5b24a]" />
        )}
      </a>
    );
  })}
</nav>

        {/* DESKTOP RIGHT */}
        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center border border-white/15">
            <button
              type="button"
              onClick={() => setLanguage("vi")}
              className={`px-3 py-2 text-[11px] font-extrabold transition ${
                language === "vi"
                  ? "bg-[#d7a53a] text-[#0b1016]"
                  : "text-white/65 hover:text-[#d7a53a]"
              }`}
            >
              VI
            </button>

            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-3 py-2 text-[11px] font-extrabold transition ${
                language === "en"
                  ? "bg-[#d7a53a] text-[#0b1016]"
                  : "text-white/65 hover:text-[#d7a53a]"
              }`}
            >
              EN
            </button>
          </div>

          <a
            href="tel:0943666866"
            className="hidden items-center gap-2 rounded-sm border border-[#d7a53a] px-4 py-2.5 text-[12px] font-bold text-[#e5b24a] transition hover:bg-[#d7a53a] hover:text-[#0b1016] xl:flex"
          >
            <span>☎</span>
            <span>0943 666 866</span>
          </a>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex items-center border border-white/15">
            <button
              type="button"
              onClick={() => setLanguage("vi")}
              className={`px-2.5 py-2 text-[10px] font-extrabold transition ${
                language === "vi"
                  ? "bg-[#d7a53a] text-[#0b1016]"
                  : "text-white/65"
              }`}
            >
              VI
            </button>

            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-2 text-[10px] font-extrabold transition ${
                language === "en"
                  ? "bg-[#d7a53a] text-[#0b1016]"
                  : "text-white/65"
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 shrink-0 items-center justify-center"
          >
            <div className="relative h-5 w-7">
              <span
                className={`absolute left-0 top-0 h-[2px] w-7 bg-white transition-all duration-300 ${
                  menuOpen ? "top-[9px] rotate-45" : ""
                }`}
              />

              <span
                className={`absolute left-0 top-[9px] h-[2px] w-7 bg-white transition-all duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />

              <span
                className={`absolute left-0 top-[18px] h-[2px] w-7 bg-white transition-all duration-300 ${
                  menuOpen ? "top-[9px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-[#0b1016] transition-all duration-300 lg:hidden ${
          menuOpen
            ? "max-h-[620px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 py-2 sm:px-5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-[52px] items-center border-b border-white/10 text-[13px] font-semibold tracking-[0.03em] text-white/90 transition hover:text-[#e5b24a]"
            >
              {item.label}
            </a>
          ))}

          <a
            href="tel:0943666866"
            onClick={() => setMenuOpen(false)}
            className="my-5 flex items-center justify-center gap-2 border border-[#d7a53a] px-4 py-3.5 text-[13px] font-bold text-[#e5b24a]"
          >
            <span>☎</span>
            <span>0943 666 866</span>
          </a>
        </nav>
      </div>
    </header>
  );
}