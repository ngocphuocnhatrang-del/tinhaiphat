"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";

const articleImages = [
  "/images/news-1.jpg",
  "/images/news-2.jpg",
  "/images/news-3.jpg",
  "/images/news-4.jpg",
];

const pageContent = {
  vi: {
    heroLabel: "TIN TỨC TÍN HẢI PHÁT",
    heroTitle1: "KIẾN THỨC",
    heroTitle2: "XÂY DỰNG THỰC TẾ",
    heroDescription:
      "Chia sẻ kinh nghiệm về thiết kế, thi công, chi phí và những vấn đề quan trọng trước khi bắt đầu một công trình.",

    featuredLabel: "BÀI VIẾT NỔI BẬT",
    featuredTitle:
      "CHI PHÍ XÂY NHÀ TRỌN GÓI TẠI TP.HCM GỒM NHỮNG GÌ?",
    featuredDescription:
      "Tìm hiểu những yếu tố ảnh hưởng đến chi phí xây dựng, cách đọc báo giá và những khoản cần dự trù trước khi ký hợp đồng thi công.",
    featuredButton: "ĐỌC BÀI VIẾT",

    sectionLabel: "GÓC CHIA SẺ",
    sectionTitle: "TIN TỨC & KIẾN THỨC XÂY DỰNG",

    categories: [
      "TẤT CẢ",
      "CHI PHÍ XÂY DỰNG",
      "KINH NGHIỆM",
      "THIẾT KẾ",
      "THI CÔNG",
    ],

    articles: [
      {
        title: "Chi phí xây nhà trọn gói tại TP.HCM gồm những gì?",
        excerpt:
          "Các yếu tố ảnh hưởng đến đơn giá xây nhà trọn gói và cách kiểm soát ngân sách hiệu quả.",
        category: "CHI PHÍ XÂY DỰNG",
        date: "24.08.2026",
      },
      {
        title: "Xây nhà 2 tầng 100m² cần chuẩn bị ngân sách bao nhiêu?",
        excerpt:
          "Phân tích móng, mái, diện tích xây dựng, vật tư và mức hoàn thiện để dự toán sát thực tế.",
        category: "CHI PHÍ XÂY DỰNG",
        date: "20.08.2026",
      },
      {
        title: "Kinh nghiệm chọn nhà thầu xây dựng uy tín tại TP.HCM",
        excerpt:
          "Những tiêu chí nên kiểm tra trước khi ký hợp đồng để hạn chế phát sinh và chậm tiến độ.",
        category: "KINH NGHIỆM",
        date: "16.08.2026",
      },
      {
        title: "Thi công phần thô và xây nhà trọn gói khác nhau thế nào?",
        excerpt:
          "So sánh phạm vi công việc, vật tư, trách nhiệm và chi phí giữa hai hình thức thi công phổ biến.",
        category: "THI CÔNG",
        date: "12.08.2026",
      },
    ],

    readMore: "XEM BÀI VIẾT",

    knowledgeLabel: "KIẾN THỨC DÀNH CHO CHỦ ĐẦU TƯ",
    knowledgeTitle: "CHUẨN BỊ TỐT TRƯỚC KHI XÂY DỰNG",
    knowledgeDescription:
      "Một công trình tốt bắt đầu từ việc hiểu đúng nhu cầu, chi phí, hồ sơ thiết kế và trách nhiệm của từng bên.",
    knowledgeItems: [
      "Cách tính diện tích xây dựng",
      "Cách đọc bảng báo giá",
      "Lựa chọn vật tư hoàn thiện",
      "Kiểm soát phát sinh",
      "Theo dõi tiến độ thi công",
      "Nghiệm thu & bảo hành",
    ],

    ctaLabel: "CẦN TƯ VẤN THỰC TẾ?",
    ctaTitle: "TRAO ĐỔI TRỰC TIẾP VỚI TÍN HẢI PHÁT",
    ctaDescription:
      "Nếu bạn đang chuẩn bị xây nhà hoặc cải tạo công trình, chúng tôi có thể tư vấn phương án và chi phí phù hợp.",
    ctaButton: "NHẬN TƯ VẤN",
  },

  en: {
    heroLabel: "TIN HAI PHAT NEWS",
    heroTitle1: "PRACTICAL",
    heroTitle2: "CONSTRUCTION INSIGHTS",
    heroDescription:
      "Practical guidance on design, construction, costs and the key decisions every property owner should understand before building.",

    featuredLabel: "FEATURED ARTICLE",
    featuredTitle:
      "WHAT IS INCLUDED IN TURNKEY CONSTRUCTION COSTS IN HO CHI MINH CITY?",
    featuredDescription:
      "Understand the factors that affect construction costs, how to read a quotation and which expenses should be planned before signing a contract.",
    featuredButton: "READ ARTICLE",

    sectionLabel: "INSIGHTS",
    sectionTitle: "CONSTRUCTION NEWS & KNOWLEDGE",

    categories: [
      "ALL",
      "CONSTRUCTION COSTS",
      "EXPERIENCE",
      "DESIGN",
      "CONSTRUCTION",
    ],

    articles: [
      {
        title:
          "What is included in turnkey construction costs in Ho Chi Minh City?",
        excerpt:
          "The main factors that affect turnkey construction pricing and how to manage your budget effectively.",
        category: "CONSTRUCTION COSTS",
        date: "24.08.2026",
      },
      {
        title:
          "How much should you budget for a 100m² two-story house?",
        excerpt:
          "A practical breakdown of foundation, roofing, floor area, materials and finishing levels.",
        category: "CONSTRUCTION COSTS",
        date: "20.08.2026",
      },
      {
        title:
          "How to choose a reliable construction contractor in Ho Chi Minh City",
        excerpt:
          "Key criteria to review before signing a contract to reduce unexpected costs and delays.",
        category: "EXPERIENCE",
        date: "16.08.2026",
      },
      {
        title:
          "Structural construction vs. turnkey construction: what is the difference?",
        excerpt:
          "A comparison of scope, materials, responsibilities and costs between two common construction approaches.",
        category: "CONSTRUCTION",
        date: "12.08.2026",
      },
    ],

    readMore: "READ ARTICLE",

    knowledgeLabel: "KNOWLEDGE FOR PROPERTY OWNERS",
    knowledgeTitle: "PREPARE WELL BEFORE YOU BUILD",
    knowledgeDescription:
      "A successful project starts with a clear understanding of requirements, costs, design documentation and responsibilities.",
    knowledgeItems: [
      "How construction area is calculated",
      "How to read a quotation",
      "Choosing finishing materials",
      "Managing unexpected costs",
      "Monitoring construction progress",
      "Inspection & warranty",
    ],

    ctaLabel: "NEED PRACTICAL ADVICE?",
    ctaTitle: "TALK DIRECTLY WITH TIN HAI PHAT",
    ctaDescription:
      "If you are planning a new home or renovation, we can help you evaluate suitable solutions and estimated costs.",
    ctaButton: "GET A CONSULTATION",
  },
};

export default function NewsPage() {
  const { language } = useLanguage();
  const content = pageContent[language];

  return (
    <main className="bg-white">
      <Header />

      {/* HERO */}
      <section className="relative min-h-[520px] overflow-hidden bg-[#0b1118] pt-[72px] text-white lg:min-h-[610px] lg:pt-[76px]">
        <img
          src="/images/news-1.jpg"
          alt="Tin Hai Phat Construction News"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071018]/95 via-[#071018]/68 to-[#071018]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071018]/70 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[448px] max-w-[1440px] items-center px-5 lg:min-h-[534px] lg:px-8">
          <div className="max-w-[820px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7a53a]">
              {content.heroLabel}
            </p>

            <h1 className="mt-5 text-[38px] font-extrabold uppercase leading-[1.05] sm:text-[52px] lg:text-[62px]">
              {content.heroTitle1}
              <br />

              <span className="text-[#d7a53a]">
                {content.heroTitle2}
              </span>
            </h1>

            <p className="mt-7 max-w-[680px] text-[14px] leading-7 text-white/75 sm:text-[16px] sm:leading-8">
              {content.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-white px-5 py-16 text-[#111820] lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] overflow-hidden border border-black/10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[360px]">
            <img
              src="/images/news-1.jpg"
              alt={content.featuredTitle}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9932e]">
              {content.featuredLabel}
            </p>

            <h2 className="mt-4 text-[25px] font-extrabold uppercase leading-[1.25] sm:text-[30px]">
              {content.featuredTitle}
            </h2>

            <div className="mt-5 h-[3px] w-12 bg-[#d7a53a]" />

            <p className="mt-6 text-[14px] leading-7 text-black/55">
              {content.featuredDescription}
            </p>

            <a
              href="#articles"
              className="mt-7 inline-flex w-fit items-center bg-[#111820] px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-[#d7a53a] hover:text-[#111820]"
            >
              {content.featuredButton} →
            </a>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section
        id="articles"
        className="bg-[#f5f5f3] px-5 py-16 text-[#111820] lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9932e]">
              {content.sectionLabel}
            </p>

            <h2 className="mt-4 text-[30px] font-extrabold uppercase sm:text-4xl">
              {content.sectionTitle}
            </h2>

            <div className="mx-auto mt-5 h-[3px] w-14 bg-[#d7a53a]" />
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {content.categories.map((category, index) => (
              <button
                key={category}
                type="button"
                className={`px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.06em] ${
                  index === 0
                    ? "bg-[#d7a53a] text-[#111820]"
                    : "border border-black/10 bg-white text-black/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {content.articles.map((article, index) => (
              <article
                key={article.title}
                className="group overflow-hidden bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
              >
                <div className="h-[230px] overflow-hidden">
                  <img
                    src={articleImages[index]}
                    alt={article.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex min-h-[310px] flex-col p-6">
                  <div className="flex items-center justify-between gap-3 text-[9px] font-bold uppercase tracking-[0.08em]">
                    <span className="text-[#c9932e]">
                      {article.category}
                    </span>

                    <span className="text-black/30">
                      {article.date}
                    </span>
                  </div>

                  <h3 className="mt-4 text-[16px] font-extrabold leading-7">
                    {article.title}
                  </h3>

                  <p className="mt-4 text-[13px] leading-7 text-black/55">
                    {article.excerpt}
                  </p>

                  <a
                    href="/lien-he"
                    className="mt-auto pt-6 text-[11px] font-extrabold uppercase tracking-[0.07em] text-[#c9932e]"
                  >
                    {content.readMore} →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* KNOWLEDGE */}
      <section className="bg-[#0b1118] px-5 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7a53a]">
              {content.knowledgeLabel}
            </p>

            <h2 className="mt-4 text-[30px] font-extrabold uppercase leading-[1.15] sm:text-4xl">
              {content.knowledgeTitle}
            </h2>

            <div className="mt-6 h-[3px] w-14 bg-[#d7a53a]" />

            <p className="mt-6 max-w-[520px] text-[14px] leading-7 text-white/55">
              {content.knowledgeDescription}
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {content.knowledgeItems.map((item, index) => (
              <div
                key={item}
                className="flex min-h-[90px] items-center gap-4 bg-[#101923] px-6 py-5"
              >
                <span className="text-[11px] font-extrabold text-[#d7a53a]">
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