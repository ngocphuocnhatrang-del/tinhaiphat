"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";

const pageContent = {
  vi: {
    heroLabel: "QUY TRÌNH TÍN HẢI PHÁT",
    heroTitle1: "RÕ RÀNG",
    heroTitle2: "TỪ ĐẦU ĐẾN CUỐI",
    heroDescription:
      "Mỗi dự án được triển khai theo quy trình minh bạch, kiểm soát rõ từng giai đoạn từ tiếp nhận nhu cầu đến bàn giao công trình.",

    sectionLabel: "QUY TRÌNH CHUYÊN NGHIỆP",
    sectionTitle: "7 BƯỚC TRIỂN KHAI CÔNG TRÌNH",

    steps: [
      {
        number: "01",
        title: "TIẾP NHẬN NHU CẦU",
        description:
          "Trao đổi về loại công trình, diện tích, ngân sách, thời gian dự kiến và mong muốn của khách hàng.",
        details: [
          "Xác định nhu cầu sử dụng",
          "Ghi nhận ngân sách dự kiến",
          "Tư vấn sơ bộ hình thức triển khai",
        ],
      },
      {
        number: "02",
        title: "KHẢO SÁT HIỆN TRẠNG",
        description:
          "Đội ngũ kỹ thuật khảo sát thực tế, đo đạc và đánh giá điều kiện thi công tại công trình.",
        details: [
          "Đo đạc hiện trạng",
          "Kiểm tra hạ tầng kỹ thuật",
          "Đánh giá điều kiện thi công",
        ],
      },
      {
        number: "03",
        title: "THIẾT KẾ PHƯƠNG ÁN",
        description:
          "Đề xuất phương án kiến trúc, công năng, vật liệu và giải pháp kỹ thuật phù hợp.",
        details: [
          "Bố trí mặt bằng",
          "Phối cảnh kiến trúc",
          "Điều chỉnh theo nhu cầu thực tế",
        ],
      },
      {
        number: "04",
        title: "BÁO GIÁ CHI TIẾT",
        description:
          "Lập dự toán theo từng hạng mục, vật tư và phạm vi công việc để khách hàng dễ kiểm soát ngân sách.",
        details: [
          "Khối lượng công việc",
          "Chủng loại vật tư",
          "Đơn giá từng hạng mục",
        ],
      },
      {
        number: "05",
        title: "KÝ HỢP ĐỒNG THI CÔNG",
        description:
          "Thống nhất phạm vi công việc, chi phí, tiến độ, trách nhiệm và các điều khoản bảo hành.",
        details: [
          "Phạm vi thi công",
          "Tiến độ thực hiện",
          "Điều khoản thanh toán",
        ],
      },
      {
        number: "06",
        title: "THI CÔNG XÂY DỰNG",
        description:
          "Triển khai thi công theo hồ sơ thiết kế, tiêu chuẩn kỹ thuật và kế hoạch đã thống nhất.",
        details: [
          "Kiểm soát vật tư",
          "Giám sát kỹ thuật",
          "Theo dõi tiến độ",
        ],
      },
      {
        number: "07",
        title: "NGHIỆM THU & BÀN GIAO",
        description:
          "Kiểm tra chất lượng, hoàn thiện hồ sơ nghiệm thu và bàn giao công trình cho khách hàng.",
        details: [
          "Kiểm tra chất lượng",
          "Bàn giao công trình",
          "Kích hoạt bảo hành",
        ],
      },
    ],

    controlLabel: "KIỂM SOÁT XUYÊN SUỐT",
    controlTitle: "MỖI GIAI ĐOẠN ĐỀU CÓ TIÊU CHUẨN RÕ RÀNG",
    controlItems: [
      {
        title: "KIỂM SOÁT CHẤT LƯỢNG",
        description:
          "Kiểm tra kỹ thuật, vật tư và chất lượng thi công theo từng giai đoạn.",
      },
      {
        title: "KIỂM SOÁT TIẾN ĐỘ",
        description:
          "Theo dõi tiến độ thực tế và điều chỉnh kế hoạch khi cần thiết.",
      },
      {
        title: "KIỂM SOÁT CHI PHÍ",
        description:
          "Hạn chế phát sinh ngoài phạm vi và báo rõ khi có thay đổi.",
      },
      {
        title: "BẢO HÀNH SAU BÀN GIAO",
        description:
          "Tiếp tục hỗ trợ kỹ thuật và xử lý bảo hành sau khi công trình hoàn thiện.",
      },
    ],

    ctaLabel: "BẮT ĐẦU DỰ ÁN",
    ctaTitle: "BẠN MUỐN TRAO ĐỔI VỀ CÔNG TRÌNH CỦA MÌNH?",
    ctaDescription:
      "Liên hệ Tín Hải Phát để được tư vấn quy trình, phương án và chi phí triển khai phù hợp.",
    ctaButton: "NHẬN TƯ VẤN",
  },

  en: {
    heroLabel: "TIN HAI PHAT PROCESS",
    heroTitle1: "CLEAR",
    heroTitle2: "FROM START TO FINISH",
    heroDescription:
      "Every project follows a transparent process with clear control at each stage from initial consultation to final handover.",

    sectionLabel: "PROFESSIONAL PROCESS",
    sectionTitle: "7 STEPS TO COMPLETE YOUR PROJECT",

    steps: [
      {
        number: "01",
        title: "REQUIREMENT CONSULTATION",
        description:
          "We discuss project type, area, budget, expected timeline and the client's key requirements.",
        details: [
          "Identify functional needs",
          "Review expected budget",
          "Provide initial implementation advice",
        ],
      },
      {
        number: "02",
        title: "SITE SURVEY",
        description:
          "Our technical team inspects the site, takes measurements and evaluates construction conditions.",
        details: [
          "Site measurement",
          "Technical infrastructure review",
          "Construction condition assessment",
        ],
      },
      {
        number: "03",
        title: "DESIGN PROPOSAL",
        description:
          "We develop architectural, functional, material and technical solutions suitable for the project.",
        details: [
          "Functional layout",
          "Architectural visualization",
          "Design adjustments",
        ],
      },
      {
        number: "04",
        title: "DETAILED QUOTATION",
        description:
          "A clear cost estimate is prepared by work item, materials and scope so the client can control the budget.",
        details: [
          "Work quantities",
          "Material specifications",
          "Unit pricing",
        ],
      },
      {
        number: "05",
        title: "CONSTRUCTION CONTRACT",
        description:
          "We confirm scope, cost, schedule, responsibilities, payment terms and warranty conditions.",
        details: [
          "Construction scope",
          "Implementation schedule",
          "Payment terms",
        ],
      },
      {
        number: "06",
        title: "CONSTRUCTION",
        description:
          "The project is executed according to approved drawings, technical standards and the agreed schedule.",
        details: [
          "Material control",
          "Technical supervision",
          "Progress monitoring",
        ],
      },
      {
        number: "07",
        title: "INSPECTION & HANDOVER",
        description:
          "We inspect completed works, finalize handover documentation and deliver the project to the client.",
        details: [
          "Quality inspection",
          "Project handover",
          "Warranty activation",
        ],
      },
    ],

    controlLabel: "CONTINUOUS CONTROL",
    controlTitle: "CLEAR STANDARDS AT EVERY STAGE",
    controlItems: [
      {
        title: "QUALITY CONTROL",
        description:
          "Technical, material and workmanship quality is checked throughout the project.",
      },
      {
        title: "SCHEDULE CONTROL",
        description:
          "Actual progress is monitored and the implementation plan is adjusted when required.",
      },
      {
        title: "COST CONTROL",
        description:
          "Unexpected costs are minimized and any scope changes are clearly communicated.",
      },
      {
        title: "POST-HANDOVER WARRANTY",
        description:
          "Technical support and warranty service continue after project completion.",
      },
    ],

    ctaLabel: "START YOUR PROJECT",
    ctaTitle: "READY TO DISCUSS YOUR CONSTRUCTION PROJECT?",
    ctaDescription:
      "Contact Tin Hai Phat for advice on process, project solutions and suitable implementation costs.",
    ctaButton: "GET A CONSULTATION",
  },
};

export default function ProcessPage() {
  const { language } = useLanguage();
  const content = pageContent[language];

  return (
    <main className="bg-white">
      <Header />

      {/* HERO */}
      <section className="relative min-h-[520px] overflow-hidden bg-[#0b1118] pt-[72px] text-white lg:min-h-[610px] lg:pt-[76px]">
        <img
          src="/images/tin-hai-phat-headquarters.png"
          alt="Tin Hai Phat Process"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071018]/95 via-[#071018]/68 to-[#071018]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071018]/72 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[448px] max-w-[1440px] items-center px-5 lg:min-h-[534px] lg:px-8">
          <div className="max-w-[800px]">
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

      {/* PROCESS */}
      <section className="bg-[#f5f5f3] px-5 py-16 text-[#111820] lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9932e]">
              {content.sectionLabel}
            </p>

            <h2 className="mt-4 text-[30px] font-extrabold uppercase sm:text-4xl">
              {content.sectionTitle}
            </h2>

            <div className="mx-auto mt-5 h-[3px] w-14 bg-[#d7a53a]" />
          </div>

          <div className="mt-12 space-y-4">
            {content.steps.map((step) => (
              <article
                key={step.number}
                className="grid gap-6 border border-black/10 bg-white p-6 md:grid-cols-[90px_1fr_1fr] md:items-start lg:p-8"
              >
                <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full border border-[#d7a53a]">
                  <span className="text-[14px] font-extrabold text-[#c9932e]">
                    {step.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-[16px] font-extrabold uppercase">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-[13px] leading-7 text-black/55">
                    {step.description}
                  </p>
                </div>

                <ul className="space-y-3">
                  {step.details.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[12px] leading-6 text-black/50"
                    >
                      <span className="mt-[8px] h-[5px] w-[5px] shrink-0 bg-[#d7a53a]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTROL */}
      <section className="bg-[#0b1118] px-5 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7a53a]">
              {content.controlLabel}
            </p>

            <h2 className="mt-4 text-[30px] font-extrabold uppercase sm:text-4xl">
              {content.controlTitle}
            </h2>

            <div className="mx-auto mt-5 h-[3px] w-14 bg-[#d7a53a]" />
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
            {content.controlItems.map((item, index) => (
              <article
                key={item.title}
                className="min-h-[230px] bg-[#101923] p-7"
              >
                <span className="text-[11px] font-extrabold text-[#d7a53a]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-7 text-[14px] font-extrabold uppercase">
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

            <p className="mt-4 max-w-[700px] text-[14px] leading-7 opacity-70">
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