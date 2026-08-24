const services = [
  {
    number: "01",
    icon: "✎",
    title: "THIẾT KẾ KIẾN TRÚC",
    description:
      "Thiết kế sáng tạo, tối ưu công năng và chi phí xây dựng.",
  },
  {
    number: "02",
    icon: "⌂",
    title: "XÂY NHÀ TRỌN GÓI",
    description:
      "Chìa khóa trao tay, đồng hành từ thiết kế đến bàn giao.",
  },
  {
    number: "03",
    icon: "▦",
    title: "THI CÔNG PHẦN THÔ",
    description:
      "Thi công đúng kỹ thuật, đảm bảo kết cấu và chất lượng công trình.",
  },
  {
    number: "04",
    icon: "▰",
    title: "THI CÔNG HOÀN THIỆN",
    description:
      "Hoàn thiện tỉ mỉ, đúng tiến độ và cam kết chất lượng.",
  },
  {
    number: "05",
    icon: "↻",
    title: "CẢI TẠO - SỬA CHỮA",
    description:
      "Nâng cấp không gian sống, tối ưu công năng và giá trị sử dụng.",
  },
  {
    number: "06",
    icon: "▱",
    title: "THIẾT KẾ & NỘI THẤT",
    description:
      "Thiết kế và thi công nội thất đồng bộ, sang trọng và tiện nghi.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-[#f5f5f3] px-4 py-14 text-[#111820] sm:px-5 sm:py-16 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#c9932e] sm:text-[12px] sm:tracking-[0.3em]">
            Tín Hải Phát Construction
          </p>

          <h2 className="text-[28px] font-extrabold uppercase leading-[1.1] tracking-[-0.02em] sm:text-3xl md:text-4xl">
            Dịch vụ của chúng tôi
          </h2>

          <div className="mx-auto mt-4 h-[3px] w-12 bg-[#d7a53a] sm:mt-5 sm:w-14" />

          <p className="mx-auto mt-5 max-w-[720px] text-[13px] leading-6 text-black/60 sm:mt-6 sm:text-[15px] sm:leading-7">
            Cung cấp giải pháp toàn diện từ thiết kế, thi công đến hoàn thiện
            công trình, đảm bảo chất lượng, tiến độ và giá trị bền vững.
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {services.map((service) => (
            <article
              key={service.number}
              className="group relative flex min-h-[240px] flex-col overflow-hidden border border-black/[0.06] bg-white px-5 py-5 shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-2 hover:border-[#d7a53a]/50 hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)] sm:min-h-[285px] sm:px-6 sm:py-6 xl:min-h-[330px] xl:py-7"
            >
              <span className="absolute right-4 top-4 text-[10px] font-bold tracking-[0.15em] text-black/20 sm:right-5 sm:text-[11px]">
                {service.number}
              </span>

              <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full border border-[#d7a53a]/50 text-[23px] font-light text-[#c9932e] transition duration-300 group-hover:bg-[#d7a53a] group-hover:text-white sm:h-[58px] sm:w-[58px] sm:text-[27px] xl:h-[62px] xl:w-[62px] xl:text-[29px]">
                {service.icon}
              </div>

              <h3 className="mt-5 text-[13px] font-extrabold leading-5 sm:mt-6 sm:min-h-[46px] sm:text-[14px] sm:leading-6 xl:mt-7 xl:min-h-[52px]">
                {service.title}
              </h3>

              <p className="mt-2 text-[12px] leading-5 text-black/55 sm:mt-3 sm:text-[13px] sm:leading-6">
                {service.description}
              </p>

              <a
                href="#contact"
                className="mt-auto flex items-center gap-2 pt-4 text-[10px] font-bold uppercase tracking-[0.08em] text-[#c9932e] sm:pt-6 sm:text-[11px]"
              >
                Xem chi tiết
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>

              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#d7a53a] transition-all duration-300 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}