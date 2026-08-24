"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function Contact() {
  const { t } = useLanguage();

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

            <div className="mt-10 space-y-6">
              <div className="border-t border-white/10 pt-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                  {t.contact.hotline}
                </p>

                <a
                  href="tel:0943666866"
                  className="mt-2 inline-block text-[24px] font-extrabold text-[#d7a53a]"
                >
                  0943 666 866
                </a>
              </div>

              <div className="border-t border-white/10 pt-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                  {t.contact.email}
                </p>

                <a
                  href="mailto:info@tinhaiphat.com"
                  className="mt-2 inline-block text-[15px] font-semibold text-white/85 transition hover:text-[#d7a53a]"
                >
                  info@tinhaiphat.com
                </a>
              </div>

              <div className="border-t border-white/10 pt-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                  {t.contact.area}
                </p>

                <p className="mt-2 text-[15px] font-semibold text-white/85">
                  {t.contact.areaValue}
                </p>
              </div>
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
              {t.contact.quoteDescription}
            </p>

            <form className="mt-8 grid gap-5">
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45">
                  {t.contact.fullName}
                </label>

                <input
                  type="text"
                  placeholder={t.contact.fullNamePlaceholder}
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
                    placeholder={t.contact.phonePlaceholder}
                    className="w-full border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] outline-none transition placeholder:text-black/30 focus:border-[#d7a53a]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45">
                    {t.contact.location}
                  </label>

                  <input
                    type="text"
                    placeholder={t.contact.locationPlaceholder}
                    className="w-full border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] outline-none transition placeholder:text-black/30 focus:border-[#d7a53a]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45">
                  {t.contact.need}
                </label>

                <select className="w-full border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] outline-none transition focus:border-[#d7a53a]">
                  {t.contact.services.map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45">
                  {t.contact.message}
                </label>

                <textarea
                  rows={5}
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full resize-none border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] leading-7 outline-none transition placeholder:text-black/30 focus:border-[#d7a53a]"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center bg-[#d7a53a] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.06em] text-[#111820] transition hover:bg-[#e6b64d]"
              >
                {t.contact.submit} →
              </button>
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