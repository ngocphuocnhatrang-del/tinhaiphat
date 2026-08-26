"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { supabase } from "@/lib/supabase";

type CompanySettings = {
  company_name: string | null;
  tax_code: string | null;
  hotline: string | null;
  email: string | null;
  address: string | null;
  service_area: string | null;
};

export default function Footer() {
  const { t } = useLanguage();

  const [company, setCompany] =
    useState<CompanySettings | null>(null);

  useEffect(() => {
    const loadCompanySettings = async () => {
      const { data, error } = await supabase
        .from("company_settings")
        .select(`
          company_name,
          tax_code,
          hotline,
          email,
          address,
          service_area
        `)
        .order("id", {
          ascending: true,
        })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.warn(
          "Load footer company settings:",
          error,
        );
        return;
      }

      if (data) {
        setCompany(data as CompanySettings);
      }
    };

    loadCompanySettings();
  }, []);

  const cleanPhone =
    company?.hotline?.replace(/\D/g, "") || "";

  return (
    <footer className="bg-[#080d12] px-5 pt-16 text-white lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-2 xl:grid-cols-4">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-end justify-center gap-[2px]">
                <span className="h-5 w-[6px] bg-[#d7a53a]" />
                <span className="h-8 w-[6px] bg-[#d7a53a]" />
                <span className="h-11 w-[6px] bg-[#d7a53a]" />
                <span className="h-7 w-[6px] bg-[#d7a53a]" />
              </div>

              <div>
                <div className="text-[18px] font-extrabold tracking-[0.08em] text-[#e5b24a]">
                  TÍN HẢI PHÁT
                </div>

                <div className="mt-1 text-[9px] tracking-[0.3em] text-white/70">
                  CONSTRUCTION
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-[320px] text-[13px] leading-7 text-white/50">
              {t.footer.description}
            </p>

            {/* COMPANY LEGAL INFO */}
            <div className="mt-6 space-y-2 border-t border-white/10 pt-5">
              {company?.company_name && (
                <p className="text-[13px] font-bold uppercase leading-6 text-white/80">
                  {company.company_name}
                </p>
              )}

              {company?.tax_code && (
                <p className="text-[12px] text-white/50">
                  MST: {company.tax_code}
                </p>
              )}

              {company?.address && (
                <p className="max-w-[320px] text-[12px] leading-6 text-white/50">
                  {company.address}
                </p>
              )}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#d7a53a]">
              {t.footer.quickLinksTitle}
            </h3>

            <div className="mt-5 grid gap-3">
              {t.footer.quickLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[13px] text-white/55 transition hover:text-[#d7a53a]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#d7a53a]">
              {t.footer.servicesTitle}
            </h3>

            <div className="mt-5 grid gap-3">
              {t.footer.services.map((service) => (
                <a
                  key={service}
                  href="#services"
                  className="text-[13px] text-white/55 transition hover:text-[#d7a53a]"
                >
                  {service}
                </a>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#d7a53a]">
              {t.footer.contactTitle}
            </h3>

            <div className="mt-5 space-y-5">
              {company?.hotline && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
                    {t.footer.hotline}
                  </p>

                  <a
                    href={`tel:${cleanPhone}`}
                    className="mt-1 inline-block text-[15px] font-bold text-white/80 transition hover:text-[#d7a53a]"
                  >
                    {company.hotline}
                  </a>
                </div>
              )}

              {company?.email && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
                    {t.footer.email}
                  </p>

                  <a
                    href={`mailto:${company.email}`}
                    className="mt-1 inline-block break-all text-[13px] text-white/60 transition hover:text-[#d7a53a]"
                  >
                    {company.email}
                  </a>
                </div>
              )}

              {company?.address && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
                    Địa chỉ
                  </p>

                  <p className="mt-1 text-[13px] leading-6 text-white/60">
                    {company.address}
                  </p>
                </div>
              )}

              {company?.service_area && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
                    {t.footer.serviceArea}
                  </p>

                  <p className="mt-1 text-[13px] leading-6 text-white/60">
                    {company.service_area}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="flex flex-col gap-3 py-6 text-[11px] text-white/35 md:flex-row md:items-center md:justify-between">
          <p>{t.footer.copyright}</p>

          <div className="flex flex-wrap gap-5">
            <a
              href="#"
              className="transition hover:text-[#d7a53a]"
            >
              {t.footer.privacy}
            </a>

            <a
              href="#"
              className="transition hover:text-[#d7a53a]"
            >
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}