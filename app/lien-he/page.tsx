"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { supabase } from "@/lib/supabase";

const pageContent = {
  vi: {
    heroLabel: "LIÊN HỆ TÍN HẢI PHÁT",
    heroTitle1: "BẮT ĐẦU",
    heroTitle2: "DỰ ÁN CỦA BẠN",
    heroDescription:
      "Liên hệ Tín Hải Phát để được tư vấn về thiết kế, thi công, chi phí và phương án triển khai phù hợp với công trình.",

    infoLabel: "THÔNG TIN LIÊN HỆ",
    infoTitle: "KẾT NỐI VỚI TÍN HẢI PHÁT",
    hotline: "HOTLINE",
    email: "EMAIL",
    area: "KHU VỰC HOẠT ĐỘNG",
    areaValue: "TP.HCM và khu vực lân cận",

    formLabel: "NHẬN TƯ VẤN MIỄN PHÍ",
    formTitle: "GỬI YÊU CẦU BÁO GIÁ",
    formDescription:
      "Điền thông tin bên dưới, đội ngũ Tín Hải Phát sẽ liên hệ để trao đổi nhu cầu và tư vấn phương án phù hợp.",

    fullName: "HỌ VÀ TÊN",
    fullNamePlaceholder: "Nguyễn Văn A",

    phone: "SỐ ĐIỆN THOẠI",
    phonePlaceholder: "09xx xxx xxx",

    location: "KHU VỰC XÂY DỰNG",
    locationPlaceholder: "TP.HCM",

    service: "NHU CẦU",
    services: [
      "Xây nhà trọn gói",
      "Thiết kế kiến trúc",
      "Thi công phần thô",
      "Thi công hoàn thiện",
      "Cải tạo - sửa chữa",
      "Thiết kế & nội thất",
    ],

    message: "NỘI DUNG CẦN TƯ VẤN",
    messagePlaceholder:
      "Mô tả sơ bộ diện tích, số tầng, nhu cầu và thời gian dự kiến...",

    submit: "GỬI YÊU CẦU TƯ VẤN",

    privacy:
      "* Thông tin của bạn chỉ được sử dụng để liên hệ tư vấn và báo giá.",

    supportLabel: "HỖ TRỢ NHANH",
    supportTitle: "TRAO ĐỔI TRỰC TIẾP",
    supportDescription:
      "Nếu cần hỗ trợ nhanh, bạn có thể gọi trực tiếp hotline để trao đổi với đội ngũ Tín Hải Phát.",
    callButton: "GỌI NGAY",

    processLabel: "QUY TRÌNH TIẾP NHẬN",
    processTitle: "TỪ LIÊN HỆ ĐẾN KHẢO SÁT",
    processItems: [
      "Tiếp nhận thông tin",
      "Trao đổi nhu cầu",
      "Khảo sát hiện trạng",
      "Đề xuất phương án",
      "Báo giá chi tiết",
      "Thống nhất triển khai",
    ],
  },

  en: {
    heroLabel: "CONTACT TIN HAI PHAT",
    heroTitle1: "START",
    heroTitle2: "YOUR PROJECT",
    heroDescription:
      "Contact Tin Hai Phat for professional advice on design, construction, estimated costs and the right project implementation plan.",

    infoLabel: "CONTACT INFORMATION",
    infoTitle: "CONNECT WITH TIN HAI PHAT",
    hotline: "HOTLINE",
    email: "EMAIL",
    area: "SERVICE AREA",
    areaValue: "Ho Chi Minh City and surrounding areas",

    formLabel: "FREE CONSULTATION",
    formTitle: "REQUEST A QUOTATION",
    formDescription:
      "Fill in the information below and the Tin Hai Phat team will contact you to discuss your needs and recommend a suitable solution.",

    fullName: "FULL NAME",
    fullNamePlaceholder: "Your full name",

    phone: "PHONE NUMBER",
    phonePlaceholder: "Your phone number",

    location: "CONSTRUCTION LOCATION",
    locationPlaceholder: "Ho Chi Minh City",

    service: "SERVICE REQUIRED",
    services: [
      "Turnkey Construction",
      "Architectural Design",
      "Structural Construction",
      "Finishing Works",
      "Renovation & Remodeling",
      "Interior Design & Build",
    ],

    message: "PROJECT DETAILS",
    messagePlaceholder:
      "Briefly describe the area, number of floors, requirements and expected timeline...",

    submit: "SEND CONSULTATION REQUEST",

    privacy:
      "* Your information will only be used for consultation and quotation purposes.",

    supportLabel: "QUICK SUPPORT",
    supportTitle: "TALK DIRECTLY WITH US",
    supportDescription:
      "For immediate support, call our hotline and speak directly with the Tin Hai Phat team.",
    callButton: "CALL NOW",

    processLabel: "CONTACT PROCESS",
    processTitle: "FROM FIRST CONTACT TO SITE SURVEY",
    processItems: [
      "Receive your information",
      "Discuss your requirements",
      "Site survey",
      "Solution proposal",
      "Detailed quotation",
      "Confirm implementation",
    ],
  },
};

export default function ContactPage() {
  const { language } = useLanguage();

  const content =
    pageContent[language as keyof typeof pageContent] ??
    pageContent.vi;

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setSubmitError("");
    setSubmitSuccess(false);

    if (!fullName.trim()) {
      setSubmitError(
        language === "vi"
          ? "Vui lòng nhập họ và tên."
          : "Please enter your full name.",
      );
      return;
    }

    if (!phone.trim()) {
      setSubmitError(
        language === "vi"
          ? "Vui lòng nhập số điện thoại."
          : "Please enter your phone number.",
      );
      return;
    }

    const cleanPhone = phone.replace(/\s+/g, "");

    if (!/^[0-9+]{8,15}$/.test(cleanPhone)) {
      setSubmitError(
        language === "vi"
          ? "Số điện thoại chưa hợp lệ."
          : "The phone number is not valid.",
      );
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from("contact_requests")
        .insert({
          full_name: fullName.trim(),
          phone: phone.trim(),
          location: location.trim() || null,
          service:
            service ||
            content.services[0] ||
            null,
          message: message.trim() || null,
          status: "new",
        });

      if (error) {
        throw error;
      }

      setFullName("");
      setPhone("");
      setLocation("");
      setService("");
      setMessage("");

      setSubmitSuccess(true);
    } catch (error) {
      console.error(
        "Contact form submit error:",
        error,
      );

      setSubmitError(
        language === "vi"
          ? "Không thể gửi yêu cầu. Vui lòng thử lại."
          : "Unable to send your request. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-white">
      <Header />

      {/* HERO */}
      <section className="relative min-h-[520px] overflow-hidden bg-[#0b1118] pt-[72px] text-white lg:min-h-[610px] lg:pt-[76px]">
        <img
          src="/images/tin-hai-phat-headquarters.png"
          alt="Tin Hai Phat Construction"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071018]/95 via-[#071018]/68 to-[#071018]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071018]/72 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[448px] max-w-[1440px] items-center px-5 lg:min-h-[534px] lg:px-8">
          <div className="max-w-[780px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7a53a]">
              {content.heroLabel}
            </p>

            <h1 className="mt-5 text-[40px] font-extrabold uppercase leading-[1.05] sm:text-[54px] lg:text-[64px]">
              {content.heroTitle1}
              <br />

              <span className="text-[#d7a53a]">
                {content.heroTitle2}
              </span>
            </h1>

            <p className="mt-7 max-w-[650px] text-[14px] leading-7 text-white/75 sm:text-[16px] sm:leading-8">
              {content.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-[#f5f5f3] px-5 py-16 text-[#111820] lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] overflow-hidden border border-black/10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* INFO */}
          <div className="bg-[#0f1821] p-7 text-white sm:p-10 lg:p-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#d7a53a]">
              {content.infoLabel}
            </p>

            <h2 className="mt-4 text-[28px] font-extrabold uppercase leading-[1.15] sm:text-[34px]">
              {content.infoTitle}
            </h2>

            <div className="mt-6 h-[3px] w-14 bg-[#d7a53a]" />

            <div className="mt-10 space-y-7">
              <div className="border-t border-white/10 pt-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                  {content.hotline}
                </p>

                <a
                  href="tel:0943666866"
                  className="mt-2 inline-block text-[24px] font-extrabold text-[#d7a53a]"
                >
                  0943 666 866
                </a>
              </div>

              <div className="border-t border-white/10 pt-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                  {content.email}
                </p>

                <a
                  href="mailto:info@tinhaiphat.com"
                  className="mt-2 inline-block text-[14px] font-semibold text-white/80 transition hover:text-[#d7a53a]"
                >
                  info@tinhaiphat.com
                </a>
              </div>

              <div className="border-t border-white/10 pt-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                  {content.area}
                </p>

                <p className="mt-2 text-[14px] font-semibold text-white/80">
                  {content.areaValue}
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white p-7 sm:p-10 lg:p-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#c9932e]">
              {content.formLabel}
            </p>

            <h2 className="mt-3 text-[28px] font-extrabold uppercase sm:text-[34px]">
              {content.formTitle}
            </h2>

            <p className="mt-4 max-w-[650px] text-[14px] leading-7 text-black/55">
              {content.formDescription}
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 grid gap-5"
            >
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.08em] text-black/45">
                  {content.fullName}
                </label>

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  placeholder={
                    content.fullNamePlaceholder
                  }
                  className="w-full border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] outline-none transition placeholder:text-black/30 focus:border-[#d7a53a]"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.08em] text-black/45">
                    {content.phone}
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder={
                      content.phonePlaceholder
                    }
                    className="w-full border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] outline-none transition placeholder:text-black/30 focus:border-[#d7a53a]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.08em] text-black/45">
                    {content.location}
                  </label>

                  <input
                    type="text"
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    placeholder={
                      content.locationPlaceholder
                    }
                    className="w-full border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] outline-none transition placeholder:text-black/30 focus:border-[#d7a53a]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.08em] text-black/45">
                  {content.service}
                </label>

                <select
                  value={
                    service ||
                    content.services[0]
                  }
                  onChange={(e) =>
                    setService(e.target.value)
                  }
                  className="w-full border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] outline-none transition focus:border-[#d7a53a]"
                >
                  {content.services.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.08em] text-black/45">
                  {content.message}
                </label>

                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder={
                    content.messagePlaceholder
                  }
                  className="w-full resize-none border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] leading-7 outline-none transition placeholder:text-black/30 focus:border-[#d7a53a]"
                />
              </div>

              {submitError && (
                <div className="border border-red-200 bg-red-50 px-4 py-3 text-[12px] font-semibold text-red-700">
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="border border-green-200 bg-green-50 px-4 py-3 text-[12px] font-semibold leading-6 text-green-700">
                  {language === "vi"
                    ? "✓ Gửi yêu cầu thành công. Tín Hải Phát sẽ liên hệ với bạn trong thời gian sớm nhất."
                    : "✓ Your request has been sent successfully. Tin Hai Phat will contact you shortly."}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 inline-flex w-full items-center justify-center bg-[#d7a53a] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.06em] text-[#111820] transition hover:bg-[#e6b64d] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting
                  ? language === "vi"
                    ? "ĐANG GỬI..."
                    : "SENDING..."
                  : `${content.submit} →`}
              </button>
            </form>

            <p className="mt-5 text-[11px] leading-5 text-black/35">
              {content.privacy}
            </p>
          </div>
        </div>
      </section>

      {/* QUICK SUPPORT */}
      <section className="bg-white px-5 py-16 text-[#111820] lg:px-8 lg:py-20">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 border-l-[3px] border-[#d7a53a] bg-[#f7f7f5] p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9932e]">
              {content.supportLabel}
            </p>

            <h2 className="mt-3 text-[26px] font-extrabold uppercase">
              {content.supportTitle}
            </h2>

            <p className="mt-4 max-w-[700px] text-[14px] leading-7 text-black/55">
              {content.supportDescription}
            </p>
          </div>

          <a
            href="tel:0943666866"
            className="inline-flex shrink-0 items-center justify-center bg-[#111820] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-[#d7a53a] hover:text-[#111820]"
          >
            ☎ {content.callButton}
          </a>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#0b1118] px-5 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7a53a]">
              {content.processLabel}
            </p>

            <h2 className="mt-4 text-[30px] font-extrabold uppercase sm:text-4xl">
              {content.processTitle}
            </h2>

            <div className="mx-auto mt-5 h-[3px] w-14 bg-[#d7a53a]" />
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {content.processItems.map(
              (item, index) => (
                <div
                  key={item}
                  className="flex min-h-[100px] items-center gap-5 bg-[#101923] px-6 py-5"
                >
                  <span className="text-[11px] font-extrabold text-[#d7a53a]">
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <span className="text-[13px] font-extrabold uppercase">
                    {item}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}