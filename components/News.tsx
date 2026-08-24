const articles = [
  {
    date: "24",
    month: "08",
    title: "Chi phí xây nhà trọn gói tại TP.HCM gồm những gì?",
    excerpt:
      "Tìm hiểu các yếu tố ảnh hưởng đến đơn giá xây nhà trọn gói tại TP.HCM và cách kiểm soát ngân sách hiệu quả.",
    image: "/images/news-1.jpg",
  },
  {
    date: "20",
    month: "08",
    title: "Xây nhà 2 tầng 100m² cần chuẩn bị ngân sách bao nhiêu?",
    excerpt:
      "Phân tích diện tích xây dựng, phần móng, phần mái, vật tư và mức hoàn thiện để dự toán chi phí sát thực tế.",
    image: "/images/news-2.jpg",
  },
  {
    date: "16",
    month: "08",
    title: "Kinh nghiệm chọn nhà thầu xây dựng uy tín tại TP.HCM",
    excerpt:
      "Những tiêu chí cần kiểm tra trước khi ký hợp đồng nhằm hạn chế phát sinh chi phí, chậm tiến độ và rủi ro thi công.",
    image: "/images/news-3.jpg",
  },
  {
    date: "12",
    month: "08",
    title: "Thi công phần thô và xây nhà trọn gói khác nhau thế nào?",
    excerpt:
      "So sánh phạm vi công việc, vật tư, chi phí và trách nhiệm giữa hai hình thức thi công phổ biến hiện nay.",
    image: "/images/news-4.jpg",
  },
];

export default function News() {
  return (
    <section
      id="news"
      className="bg-[#f5f5f3] px-5 py-20 text-[#111820] lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* HEADING */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#c9932e]">
              Góc chia sẻ
            </p>

            <h2 className="mt-3 text-3xl font-extrabold uppercase md:text-4xl">
              Tin tức & kiến thức xây dựng
            </h2>

            <div className="mt-5 h-[3px] w-14 bg-[#d7a53a]" />
          </div>

          <p className="max-w-[560px] text-[14px] leading-7 text-black/55 md:text-right">
            Cập nhật kiến thức thực tế về thiết kế, thi công, chi phí và kinh
            nghiệm xây dựng dành cho chủ đầu tư tại TP.HCM.
          </p>
        </div>

        {/* ARTICLES */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group overflow-hidden border border-black/[0.06] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]"
            >
              {/* IMAGE */}
              <div className="relative h-[240px] overflow-hidden bg-[#d9d9d9]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                
              </div>

              {/* CONTENT */}
              <div className="flex min-h-[290px] flex-col p-6">
                <h3 className="text-[16px] font-extrabold leading-7">
                  {article.title}
                </h3>

                <p className="mt-4 text-[13px] leading-7 text-black/55">
                  {article.excerpt}
                </p>

                <a
                  href="#contact"
                  className="mt-auto pt-6 text-[11px] font-extrabold uppercase tracking-[0.07em] text-[#c9932e]"
                >
                  Xem bài viết →
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* VIEW ALL */}
        <div className="mt-10 text-center">
          <a
            href="#news"
            className="inline-flex items-center border border-[#111820] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.06em] transition hover:border-[#d7a53a] hover:bg-[#d7a53a]"
          >
            Xem tất cả bài viết →
          </a>
        </div>
      </div>
    </section>
  );
}