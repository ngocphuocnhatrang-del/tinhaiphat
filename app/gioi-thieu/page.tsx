"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BoardOfDirectors from "@/components/BoardOfDirectors";
import { useLanguage } from "@/components/LanguageProvider";

const pageContent = {
  vi: {
    heroLabel: "VỀ TÍN HẢI PHÁT",
    heroTitle1: "XÂY DỰNG TỪ",
    heroTitle2: "CHỮ TÍN",
    heroDescription:
      "Tín Hải Phát hướng đến những công trình bền vững về chất lượng, tối ưu về công năng và có giá trị lâu dài với khách hàng.",

    storyLabel: "CÂU CHUYỆN TÍN HẢI PHÁT",
    storyTitle: "KIẾN TẠO GIÁ TRỊ BỀN VỮNG",
    storyParagraph1:
      "Tín Hải Phát hoạt động trong lĩnh vực thiết kế và thi công xây dựng, cung cấp các giải pháp toàn diện từ khảo sát, thiết kế, dự toán đến thi công và hoàn thiện công trình.",
    storyParagraph2:
      "Chúng tôi xác định chữ Tín, chất lượng thi công và sự minh bạch là nền tảng trong mọi dự án. Mỗi công trình không chỉ là một sản phẩm xây dựng mà còn là tài sản và không gian sống lâu dài của khách hàng.",
    storyParagraph3:
      "Tín Hải Phát hướng đến việc xây dựng một thương hiệu nhà thầu chuyên nghiệp tại TP.HCM, có khả năng đồng hành cùng khách hàng từ những ý tưởng đầu tiên đến khi công trình được bàn giao hoàn chỉnh.",

    vision: "TẦM NHÌN",
    visionText:
      "Trở thành đơn vị thiết kế và thi công xây dựng uy tín, chuyên nghiệp và được khách hàng tin tưởng tại TP.HCM và các khu vực lân cận.",

    mission: "SỨ MỆNH",
    missionText:
      "Kiến tạo những công trình chất lượng, thẩm mỹ và bền vững, đồng thời mang đến quy trình xây dựng minh bạch và an tâm cho khách hàng.",

    values: "GIÁ TRỊ CỐT LÕI",
    valueItems: [
      {
        number: "01",
        title: "CHỮ TÍN",
        description:
          "Tôn trọng mọi cam kết về chất lượng, vật tư, chi phí và tiến độ.",
      },
      {
        number: "02",
        title: "CHẤT LƯỢNG",
        description:
          "Kiểm soát chặt chẽ kỹ thuật và chất lượng trong từng hạng mục thi công.",
      },
      {
        number: "03",
        title: "MINH BẠCH",
        description:
          "Báo giá rõ ràng, quy trình minh bạch và hạn chế tối đa phát sinh.",
      },
      {
        number: "04",
        title: "TRÁCH NHIỆM",
        description:
          "Đồng hành với khách hàng trong suốt quá trình thi công và sau bàn giao.",
      },
    ],

    capabilityLabel: "NĂNG LỰC TÍN HẢI PHÁT",
    capabilityTitle: "GIẢI PHÁP TOÀN DIỆN CHO MỖI CÔNG TRÌNH",
    capabilities: [
      "Thiết kế kiến trúc",
      "Xây nhà trọn gói",
      "Thi công phần thô",
      "Thi công hoàn thiện",
      "Cải tạo - sửa chữa",
      "Thiết kế & thi công nội thất",
    ],

    ctaLabel: "BẮT ĐẦU DỰ ÁN CỦA BẠN",
    ctaTitle: "BẠN ĐANG CÓ KẾ HOẠCH XÂY DỰNG?",
    ctaDescription:
      "Hãy trao đổi với Tín Hải Phát để nhận tư vấn phương án, chi phí và lộ trình triển khai phù hợp.",
    ctaButton: "NHẬN TƯ VẤN",
  },

  en: {
    heroLabel: "ABOUT TIN HAI PHAT",
    heroTitle1: "BUILT ON",
    heroTitle2: "TRUST",
    heroDescription:
      "Tin Hai Phat creates construction projects that combine lasting quality, practical functionality and long-term value for our clients.",

    storyLabel: "OUR STORY",
    storyTitle: "CREATING LASTING VALUE",
    storyParagraph1:
      "Tin Hai Phat specializes in architectural design and construction, providing comprehensive solutions from site survey, design and cost estimation to construction and project completion.",
    storyParagraph2:
      "We consider trust, construction quality and transparency the foundation of every project. Each building is not only a construction product but also a long-term asset and living environment for our clients.",
    storyParagraph3:
      "Our goal is to build a professional and trusted construction brand in Ho Chi Minh City, supporting clients from the first concept through final project handover.",

    vision: "VISION",
    visionText:
      "To become a trusted and professional design and construction company serving Ho Chi Minh City and surrounding areas.",

    mission: "MISSION",
    missionText:
      "To create high-quality, aesthetically refined and sustainable buildings while providing clients with a transparent and reliable construction process.",

    values: "CORE VALUES",
    valueItems: [
      {
        number: "01",
        title: "TRUST",
        description:
          "We honor every commitment regarding quality, materials, costs and schedule.",
      },
      {
        number: "02",
        title: "QUALITY",
        description:
          "Strict technical and quality control is maintained throughout every stage of construction.",
      },
      {
        number: "03",
        title: "TRANSPARENCY",
        description:
          "Clear quotations and transparent processes help minimize unexpected costs.",
      },
      {
        number: "04",
        title: "RESPONSIBILITY",
        description:
          "We support our clients throughout construction and after project handover.",
      },
    ],

    capabilityLabel: "TIN HAI PHAT CAPABILITIES",
    capabilityTitle: "COMPREHENSIVE SOLUTIONS FOR EVERY PROJECT",
    capabilities: [
      "Architectural Design",
      "Turnkey Construction",
      "Structural Construction",
      "Finishing Works",
      "Renovation & Remodeling",
      "Interior Design & Build",
    ],

    ctaLabel: "START YOUR PROJECT",
    ctaTitle: "PLANNING A CONSTRUCTION PROJECT?",
    ctaDescription:
      "Talk with Tin Hai Phat to receive professional advice on design solutions, estimated costs and a suitable implementation plan.",
    ctaButton: "GET A CONSULTATION",
  },
};

export default function AboutPage() {
  const { language } = useLanguage();

  const content = pageContent[language];

  return (
    <main className="bg-white">
      <Header />

      {/* HERO */}
      <section className="relative min-h-[560px] overflow-hidden bg-[#0b1118] pt-[72px] text-white lg:min-h-[650px] lg:pt-[76px]">
        <img
          src="/images/about-tin-hai-phat.jpg"
          alt="Tin Hai Phat Construction"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071018]/95 via-[#071018]/65 to-[#071018]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071018]/75 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[488px] max-w-[1440px] items-center px-5 lg:min-h-[574px] lg:px-8">
          <div className="max-w-[720px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7a53a]">
              {content.heroLabel}
            </p>

            <h1 className="mt-5 text-[40px] font-extrabold uppercase leading-[1.05] sm:text-[52px] lg:text-[64px]">
              {content.heroTitle1}
              <br />
              <span className="text-[#d7a53a]">
                {content.heroTitle2}
              </span>
            </h1>

            <p className="mt-7 max-w-[620px] text-[14px] leading-7 text-white/75 sm:text-[16px] sm:leading-8">
              {content.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="bg-white px-5 py-16 text-[#111820] lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9932e]">
              {content.storyLabel}
            </p>

            <h2 className="mt-4 text-[30px] font-extrabold uppercase leading-[1.15] sm:text-4xl lg:text-[44px]">
              {content.storyTitle}
            </h2>

            <div className="mt-6 h-[3px] w-14 bg-[#d7a53a]" />
          </div>

          <div className="space-y-5 text-[14px] leading-8 text-black/60 sm:text-[15px]">
            <p>{content.storyParagraph1}</p>
            <p>{content.storyParagraph2}</p>
            <p>{content.storyParagraph3}</p>
          </div>
        </div>
      </section>

      {/* VISION MISSION */}
      <section className="bg-[#f5f5f3] px-5 py-16 text-[#111820] lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-5 md:grid-cols-2">
          <article className="border-t-[3px] border-[#d7a53a] bg-white p-8 lg:p-10">
            <span className="text-[11px] font-extrabold tracking-[0.18em] text-[#c9932e]">
              01
            </span>

            <h2 className="mt-5 text-[22px] font-extrabold uppercase">
              {content.vision}
            </h2>

            <p className="mt-5 text-[14px] leading-7 text-black/55">
              {content.visionText}
            </p>
          </article>

          <article className="border-t-[3px] border-[#d7a53a] bg-white p-8 lg:p-10">
            <span className="text-[11px] font-extrabold tracking-[0.18em] text-[#c9932e]">
              02
            </span>

            <h2 className="mt-5 text-[22px] font-extrabold uppercase">
              {content.mission}
            </h2>

            <p className="mt-5 text-[14px] leading-7 text-black/55">
              {content.missionText}
            </p>
          </article>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#0b1118] px-5 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7a53a]">
              TIN HAI PHAT
            </p>

            <h2 className="mt-3 text-[30px] font-extrabold uppercase sm:text-4xl">
              {content.values}
            </h2>

            <div className="mx-auto mt-5 h-[3px] w-14 bg-[#d7a53a]" />
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
            {content.valueItems.map((item) => (
              <article
                key={item.number}
                className="min-h-[240px] bg-[#101923] p-7"
              >
                <span className="text-[12px] font-extrabold tracking-[0.15em] text-[#d7a53a]">
                  {item.number}
                </span>

                <h3 className="mt-8 text-[15px] font-extrabold uppercase">
                  {item.title}
                </h3>

                <p className="mt-4 text-[13px] leading-7 text-white/55">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BOARD */}
      <BoardOfDirectors />

      {/* CAPABILITIES */}
      <section className="bg-white px-5 py-16 text-[#111820] lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9932e]">
              {content.capabilityLabel}
            </p>

            <h2 className="mt-4 text-[30px] font-extrabold uppercase leading-[1.15] sm:text-4xl">
              {content.capabilityTitle}
            </h2>

            <div className="mt-6 h-[3px] w-14 bg-[#d7a53a]" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {content.capabilities.map((item, index) => (
              <div
                key={item}
                className="flex min-h-[70px] items-center gap-4 border border-black/10 px-5 py-4"
              >
                <span className="text-[11px] font-extrabold text-[#c9932e]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-[13px] font-extrabold uppercase">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#d7a53a] px-5 py-14 text-[#0b1118] lg:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] opacity-60">
              {content.ctaLabel}
            </p>

            <h2 className="mt-3 text-[27px] font-extrabold uppercase leading-[1.15] sm:text-[34px]">
              {content.ctaTitle}
            </h2>

            <p className="mt-4 max-w-[720px] text-[14px] leading-7 opacity-70">
              {content.ctaDescription}
            </p>
          </div>

          <a
            href="/#contact"
            className="inline-flex shrink-0 items-center justify-center bg-[#0b1118] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-white hover:text-[#0b1118]"
          >
            {content.ctaButton} →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}