"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";

const pageContent = {
  vi: {
    heroLabel: "DỊCH VỤ TÍN HẢI PHÁT",
    heroTitle1: "GIẢI PHÁP",
    heroTitle2: "XÂY DỰNG TOÀN DIỆN",
    heroDescription:
      "Từ thiết kế kiến trúc đến thi công hoàn thiện, Tín Hải Phát cung cấp giải pháp đồng bộ cho từng nhu cầu xây dựng.",

    sectionLabel: "DỊCH VỤ CHUYÊN NGHIỆP",
    sectionTitle: "GIẢI PHÁP CHO MỌI CÔNG TRÌNH",
    sectionDescription:
      "Mỗi dịch vụ được triển khai theo quy trình rõ ràng, kiểm soát chất lượng chặt chẽ và phù hợp với nhu cầu thực tế của khách hàng.",

    services: [
      {
        number: "01",
        title: "THIẾT KẾ KIẾN TRÚC",
        description:
          "Thiết kế phương án kiến trúc tối ưu công năng, thẩm mỹ và chi phí đầu tư.",
        items: [
          "Khảo sát hiện trạng",
          "Bố trí mặt bằng công năng",
          "Thiết kế phối cảnh 3D",
          "Hồ sơ kỹ thuật thi công",
          "Tư vấn vật liệu và giải pháp",
        ],
      },
      {
        number: "02",
        title: "XÂY NHÀ TRỌN GÓI",
        description:
          "Giải pháp chìa khóa trao tay từ thiết kế, xin phép, thi công đến bàn giao.",
        items: [
          "Khảo sát & tư vấn",
          "Thiết kế kiến trúc",
          "Lập dự toán chi tiết",
          "Thi công phần thô",
          "Thi công hoàn thiện",
          "Nghiệm thu & bàn giao",
        ],
      },
      {
        number: "03",
        title: "THI CÔNG PHẦN THÔ",
        description:
          "Thi công kết cấu đúng kỹ thuật, đảm bảo độ bền và chất lượng công trình.",
        items: [
          "Móng và kết cấu",
          "Cột, dầm, sàn",
          "Xây tô tường",
          "Hệ thống điện nước âm",
          "Kiểm soát kỹ thuật thi công",
        ],
      },
      {
        number: "04",
        title: "THI CÔNG HOÀN THIỆN",
        description:
          "Hoàn thiện công trình đồng bộ, thẩm mỹ và đúng tiêu chuẩn kỹ thuật.",
        items: [
          "Ốp lát",
          "Sơn nước",
          "Trần và hệ hoàn thiện",
          "Thiết bị điện nước",
          "Cửa và phụ kiện",
          "Hoàn thiện nội ngoại thất",
        ],
      },
      {
        number: "05",
        title: "CẢI TẠO - SỬA CHỮA",
        description:
          "Cải tạo và nâng cấp không gian để tối ưu công năng và giá trị sử dụng.",
        items: [
          "Khảo sát hiện trạng",
          "Đề xuất phương án cải tạo",
          "Gia cố kết cấu",
          "Cải tạo mặt bằng",
          "Nâng cấp điện nước",
          "Hoàn thiện lại không gian",
        ],
      },
      {
        number: "06",
        title: "THIẾT KẾ & NỘI THẤT",
        description:
          "Giải pháp nội thất đồng bộ từ ý tưởng, thiết kế đến thi công hoàn thiện.",
        items: [
          "Thiết kế concept",
          "Bố trí công năng nội thất",
          "Phối cảnh 3D",
          "Lựa chọn vật liệu",
          "Sản xuất và lắp đặt",
          "Hoàn thiện nội thất",
        ],
      },
    ],

    whyLabel: "VÌ SAO CHỌN TÍN HẢI PHÁT",
    whyTitle: "ĐỒNG HÀNH TỪ Ý TƯỞNG ĐẾN BÀN GIAO",
    whyItems: [
      {
        title: "MINH BẠCH CHI PHÍ",
        description:
          "Báo giá theo từng hạng mục, giúp khách hàng kiểm soát ngân sách rõ ràng.",
      },
      {
        title: "KIỂM SOÁT CHẤT LƯỢNG",
        description:
          "Giám sát kỹ thuật và vật tư xuyên suốt quá trình triển khai.",
      },
      {
        title: "CAM KẾT TIẾN ĐỘ",
        description:
          "Kế hoạch thực hiện cụ thể và kiểm soát tiến độ theo từng giai đoạn.",
      },
      {
        title: "BẢO HÀNH SAU BÀN GIAO",
        description:
          "Tiếp tục đồng hành và hỗ trợ kỹ thuật sau khi công trình hoàn thiện.",
      },
    ],

    processLabel: "QUY TRÌNH TRIỂN KHAI",
    processTitle: "TỪ NHU CẦU ĐẾN CÔNG TRÌNH HOÀN THIỆN",
    processItems: [
      "Tiếp nhận nhu cầu",
      "Khảo sát công trình",
      "Đề xuất phương án",
      "Báo giá & hợp đồng",
      "Thi công",
      "Nghiệm thu & bàn giao",
    ],

    ctaLabel: "TƯ VẤN DỊCH VỤ",
    ctaTitle: "BẠN ĐANG CẦN GIẢI PHÁP XÂY DỰNG PHÙ HỢP?",
    ctaDescription:
      "Liên hệ Tín Hải Phát để được tư vấn phương án, phạm vi công việc và ngân sách phù hợp với công trình của bạn.",
    ctaButton: "NHẬN TƯ VẤN",
  },

  en: {
    heroLabel: "TIN HAI PHAT SERVICES",
    heroTitle1: "COMPREHENSIVE",
    heroTitle2: "CONSTRUCTION SOLUTIONS",
    heroDescription:
      "From architectural design to complete construction delivery, Tin Hai Phat provides integrated solutions for every building need.",

    sectionLabel: "PROFESSIONAL SERVICES",
    sectionTitle: "SOLUTIONS FOR EVERY PROJECT",
    sectionDescription:
      "Each service follows a clear process with strict quality control and practical solutions tailored to each client's needs.",

    services: [
      {
        number: "01",
        title: "ARCHITECTURAL DESIGN",
        description:
          "Architectural solutions optimized for functionality, aesthetics and investment efficiency.",
        items: [
          "Site survey",
          "Functional layout planning",
          "3D architectural visualization",
          "Construction drawings",
          "Material and technical consulting",
        ],
      },
      {
        number: "02",
        title: "TURNKEY CONSTRUCTION",
        description:
          "A complete turnkey solution from design and permits to construction and handover.",
        items: [
          "Survey & consultation",
          "Architectural design",
          "Detailed cost estimation",
          "Structural construction",
          "Finishing works",
          "Inspection & handover",
        ],
      },
      {
        number: "03",
        title: "STRUCTURAL CONSTRUCTION",
        description:
          "Professional structural construction focused on durability and technical quality.",
        items: [
          "Foundation and structure",
          "Columns, beams and slabs",
          "Wall construction and plastering",
          "Concealed MEP systems",
          "Technical quality control",
        ],
      },
      {
        number: "04",
        title: "FINISHING WORKS",
        description:
          "Complete finishing solutions with attention to detail, aesthetics and technical standards.",
        items: [
          "Tiling",
          "Painting",
          "Ceilings and finishing systems",
          "Electrical and plumbing fixtures",
          "Doors and accessories",
          "Interior and exterior finishing",
        ],
      },
      {
        number: "05",
        title: "RENOVATION & REMODELING",
        description:
          "Upgrading existing spaces to improve functionality, comfort and long-term value.",
        items: [
          "Existing condition survey",
          "Renovation proposal",
          "Structural reinforcement",
          "Layout remodeling",
          "MEP upgrades",
          "Space refinishing",
        ],
      },
      {
        number: "06",
        title: "INTERIOR DESIGN & BUILD",
        description:
          "Integrated interior solutions from concept development to complete installation.",
        items: [
          "Interior concept design",
          "Functional layout",
          "3D visualization",
          "Material selection",
          "Fabrication and installation",
          "Final interior finishing",
        ],
      },
    ],

    whyLabel: "WHY TIN HAI PHAT",
    whyTitle: "FROM THE FIRST IDEA TO FINAL HANDOVER",
    whyItems: [
      {
        title: "TRANSPARENT COSTS",
        description:
          "Detailed quotations help clients clearly control their project budget.",
      },
      {
        title: "QUALITY CONTROL",
        description:
          "Technical supervision and material control throughout the project.",
      },
      {
        title: "SCHEDULE COMMITMENT",
        description:
          "Clear implementation planning and progress control at every stage.",
      },
      {
        title: "AFTER-SALES WARRANTY",
        description:
          "Ongoing technical support after the project has been completed and handed over.",
      },
    ],

    processLabel: "IMPLEMENTATION PROCESS",
    processTitle: "FROM REQUIREMENT TO COMPLETED PROJECT",
    processItems: [
      "Requirement consultation",
      "Site survey",
      "Solution proposal",
      "Quotation & contract",
      "Construction",
      "Inspection & handover",
    ],

    ctaLabel: "SERVICE CONSULTATION",
    ctaTitle: "LOOKING FOR THE RIGHT CONSTRUCTION SOLUTION?",
    ctaDescription:
      "Contact Tin Hai Phat for professional advice on scope, implementation and budget for your project.",
    ctaButton: "GET A CONSULTATION",
  },
};

export default function ServicesPage() {
  const { language } = useLanguage();
  const content = pageContent[language];

  return (
    <main className="bg-white">
      <Header />

      {/* HERO */}
      <section className="relative min-h-[560px] overflow-hidden bg-[#0b1118] pt-[72px] text-white lg:min-h-[650px] lg:pt-[76px]">
        <img
          src="/images/tin-hai-phat-headquarters.png"
          alt="Tin Hai Phat Construction"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071018]/95 via-[#071018]/65 to-[#071018]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071018]/70 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[488px] max-w-[1440px] items-center px-5 lg:min-h-[574px] lg:px-8">
          <div className="max-w-[780px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7a53a]">
              {content.heroLabel}
            </p>

            <h1 className="mt-5 text-[38px] font-extrabold uppercase leading-[1.06] sm:text-[52px] lg:text-[62px]">
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

      {/* SERVICES INTRO */}
      <section className="bg-[#f5f5f3] px-5 py-16 text-[#111820] lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-[820px] text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9932e]">
              {content.sectionLabel}
            </p>

            <h2 className="mt-4 text-[30px] font-extrabold uppercase leading-[1.15] sm:text-4xl">
              {content.sectionTitle}
            </h2>

            <div className="mx-auto mt-5 h-[3px] w-14 bg-[#d7a53a]" />

            <p className="mt-6 text-[14px] leading-7 text-black/55">
              {content.sectionDescription}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {content.services.map((service) => (
              <article
                key={service.number}
                className="group border border-black/[0.07] bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:border-[#d7a53a]/50"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[12px] font-extrabold tracking-[0.16em] text-[#c9932e]">
                    {service.number}
                  </span>

                  <span className="text-[26px] font-light text-[#d7a53a]/35 transition group-hover:text-[#d7a53a]">
                    +
                  </span>
                </div>

                <h3 className="mt-6 text-[17px] font-extrabold uppercase">
                  {service.title}
                </h3>

                <p className="mt-4 text-[13px] leading-7 text-black/55">
                  {service.description}
                </p>

                <div className="mt-6 border-t border-black/10 pt-5">
                  <ul className="space-y-3">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[12px] leading-5 text-black/55"
                      >
                        <span className="mt-[7px] h-[5px] w-[5px] shrink-0 bg-[#d7a53a]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-[#0b1118] px-5 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="flex flex-col justify-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7a53a]">
                {content.whyLabel}
              </p>

              <h2 className="mt-4 text-[30px] font-extrabold uppercase leading-[1.15] sm:text-4xl">
                {content.whyTitle}
              </h2>

              <div className="mt-6 h-[3px] w-14 bg-[#d7a53a]" />
            </div>

            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
              {content.whyItems.map((item, index) => (
                <article
                  key={item.title}
                  className="min-h-[210px] bg-[#101923] p-7"
                >
                  <span className="text-[11px] font-extrabold text-[#d7a53a]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-6 text-[14px] font-extrabold uppercase">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-[13px] leading-7 text-white/55">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-white px-5 py-16 text-[#111820] lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9932e]">
              {content.processLabel}
            </p>

            <h2 className="mt-4 text-[30px] font-extrabold uppercase sm:text-4xl">
              {content.processTitle}
            </h2>

            <div className="mx-auto mt-5 h-[3px] w-14 bg-[#d7a53a]" />
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {content.processItems.map((item, index) => (
              <div
                key={item}
                className="flex min-h-[95px] items-center gap-5 border border-black/10 px-6 py-5"
              >
                <span className="text-[12px] font-extrabold text-[#c9932e]">
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
            href="/lien-he"
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