"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { supabase } from "@/lib/supabase";

type CompanySettings = {
  company_name: string | null;
  company_slogan: string | null;
  tax_code: string | null;
  hotline: string | null;
  email: string | null;
  address: string | null;
  service_area: string | null;
  facebook_url: string | null;
  zalo_url: string | null;
};

export default function Contact() {
  const { t } = useLanguage();

  const [company, setCompany] =
    useState<CompanySettings | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] =
    useState("Xây nhà trọn gói");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadCompanySettings = async () => {
      const { data, error } = await supabase
        .from("company_settings")
        .select(`
          company_name,
          company_slogan,
          tax_code,
          hotline,
          email,
          address,
          service_area,
          facebook_url,
          zalo_url
        `)
        .order("id", {
          ascending: true,
        })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.warn(
          "Load company settings:",
          error,
        );
        return;
      }

      if (data) {
        setCompany(
          data as CompanySettings,
        );
      }
    };

    loadCompanySettings();
  }, []);

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setSuccess(false);
    setError("");

    if (
      !fullName.trim() ||
      !phone.trim()
    ) {
      setError(
        "Vui lòng nhập họ tên và số điện thoại.",
      );
      return;
    }

    try {
      setSubmitting(true);

      const { error: submitError } =
        await supabase
          .from("contact_requests")
          .insert({
            full_name:
              fullName.trim(),
            phone: phone.trim(),
            location:
              location.trim(),
            service,
            message:
              message.trim(),
          });

      if (submitError) {
        throw submitError;
      }

      setSuccess(true);

      setFullName("");
      setPhone("");
      setLocation("");
      setService(
        "Xây nhà trọn gói",
      );
      setMessage("");
    } catch (err) {
      console.error(err);

      setError(
        "Không thể gửi yêu cầu lúc này. Vui lòng thử lại sau.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const cleanPhone =
    company?.hotline?.replace(
      /\D/g,
      "",
    ) || "";

  return (
    <section
      id="contact"
      className="bg-[#0b1118] px-5 py-20 text-white lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid overflow-hidden border border-white/10 lg:grid-cols-[0.95fr_1.05fr]">
          {/* LEFT */}
          <div className="flex flex-col justify-center bg-[#101923] p-7 md:p-10 lg:p-12">
            <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#d7a53a]">
              {t.contact.eyebrow}
            </p>

            <h2 className="mt-4 text-3xl font-extrabold uppercase leading-[1.15] md:text-4xl xl:text-[46px]">
              {t.contact.line1}
              <br />

              <span className="text-[#d7a53a]">
                {t.contact.line2}
              </span>
            </h2>

            <div className="mt-6 h-[3px] w-14 bg-[#d7a53a]" />

            <p className="mt-7 max-w-[560px] text-[15px] leading-8 text-white/60">
              {t.contact.description}
            </p>

            {/* COMPANY INFORMATION */}
            <div className="mt-10 space-y-5">
              {company?.company_name && (
                <div className="border-t border-white/10 pt-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                    Thông tin công ty
                  </p>

                  <p className="mt-2 text-[18px] font-extrabold uppercase text-white">
                    {
                      company.company_name
                    }
                  </p>

                  {company.tax_code && (
                    <p className="mt-2 text-[13px] text-white/65">
                      MST:{" "}
                      {
                        company.tax_code
                      }
                    </p>
                  )}
                </div>
              )}

              {company?.hotline && (
                <div className="border-t border-white/10 pt-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                    {t.contact.hotline}
                  </p>

                  <a
                    href={`tel:${cleanPhone}`}
                    className="mt-2 inline-block text-[24px] font-extrabold text-[#d7a53a]"
                  >
                    {
                      company.hotline
                    }
                  </a>
                </div>
              )}

              {company?.email && (
                <div className="border-t border-white/10 pt-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                    {t.contact.email}
                  </p>

                  <a
                    href={`mailto:${company.email}`}
                    className="mt-2 inline-block text-[15px] font-semibold text-white/85 transition hover:text-[#d7a53a]"
                  >
                    {
                      company.email
                    }
                  </a>
                </div>
              )}

              {company?.address && (
                <div className="border-t border-white/10 pt-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                    Địa chỉ
                  </p>

                  <p className="mt-2 text-[15px] font-semibold leading-7 text-white/85">
                    {
                      company.address
                    }
                  </p>
                </div>
              )}

              {company?.service_area && (
                <div className="border-t border-white/10 pt-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                    {t.contact.area}
                  </p>

                  <p className="mt-2 text-[15px] font-semibold leading-7 text-white/85">
                    {
                      company.service_area
                    }
                  </p>
                </div>
              )}

              {(company?.facebook_url ||
                company?.zalo_url) && (
                <div className="border-t border-white/10 pt-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                    Mạng xã hội
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3">
                    {company.facebook_url && (
                      <a
                        href={
                          company.facebook_url
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="border border-white/15 px-4 py-2 text-[11px] font-bold text-white/80 transition hover:border-[#d7a53a] hover:text-[#d7a53a]"
                      >
                        Facebook
                      </a>
                    )}

                    {company.zalo_url && (
                      <a
                        href={
                          company.zalo_url
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="border border-white/15 px-4 py-2 text-[11px] font-bold text-white/80 transition hover:border-[#d7a53a] hover:text-[#d7a53a]"
                      >
                        Zalo
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white p-7 text-[#111820] md:p-10 lg:p-12">
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#c9932e]">
              {t.contact.freeConsultation}
            </p>

            <h3 className="mt-3 text-2xl font-extrabold uppercase md:text-3xl">
              {t.contact.quoteTitle}
            </h3>

            <p className="mt-4 max-w-[560px] text-[14px] leading-7 text-black/55">
              {
                t.contact
                  .quoteDescription
              }
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 grid gap-5"
            >
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45">
                  {t.contact.fullName}
                </label>

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value,
                    )
                  }
                  placeholder={
                    t.contact
                      .fullNamePlaceholder
                  }
                  className="w-full border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] outline-none transition placeholder:text-black/30 focus:border-[#d7a53a]"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45">
                    {t.contact.phone}
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value,
                      )
                    }
                    placeholder={
                      t.contact
                        .phonePlaceholder
                    }
                    className="w-full border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] outline-none transition placeholder:text-black/30 focus:border-[#d7a53a]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45">
                    {
                      t.contact
                        .location
                    }
                  </label>

                  <input
                    type="text"
                    value={location}
                    onChange={(e) =>
                      setLocation(
                        e.target.value,
                      )
                    }
                    placeholder={
                      t.contact
                        .locationPlaceholder
                    }
                    className="w-full border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] outline-none transition placeholder:text-black/30 focus:border-[#d7a53a]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45">
                  {t.contact.need}
                </label>

                <select
                  value={service}
                  onChange={(e) =>
                    setService(
                      e.target.value,
                    )
                  }
                  className="w-full border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] outline-none transition focus:border-[#d7a53a]"
                >
                  {t.contact.services.map(
                    (item) => (
                      <option
                        key={
                          item
                        }
                      >
                        {item}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45">
                  {
                    t.contact.message
                  }
                </label>

                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) =>
                    setMessage(
                      e.target.value,
                    )
                  }
                  placeholder={
                    t.contact
                      .messagePlaceholder
                  }
                  className="w-full resize-none border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] leading-7 outline-none transition placeholder:text-black/30 focus:border-[#d7a53a]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 inline-flex w-full items-center justify-center bg-[#d7a53a] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.06em] text-[#111820] transition hover:bg-[#e6b64d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? "ĐANG GỬI..."
                  : `${t.contact.submit} →`}
              </button>

              {success && (
                <p className="text-[13px] font-semibold text-green-700">
                  ✓ Gửi yêu cầu thành công. Tín Hải Phát sẽ liên hệ với bạn sớm.
                </p>
              )}

              {error && (
                <p className="text-[13px] font-semibold text-red-600">
                  {error}
                </p>
              )}
            </form>

            <p className="mt-5 text-[11px] leading-5 text-black/35">
              {t.contact.privacy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}