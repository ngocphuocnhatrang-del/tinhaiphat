const strengths = [
  {
    number: "01",
    title: "CHẤT LƯỢNG",
    description: "Kiểm soát chặt chẽ từ vật tư đến từng hạng mục thi công.",
  },
  {
    number: "02",
    title: "MINH BẠCH",
    description: "Báo giá rõ ràng, quy trình minh bạch và hạn chế phát sinh.",
  },
  {
    number: "03",
    title: "ĐÚNG TIẾN ĐỘ",
    description: "Kế hoạch thi công cụ thể và cam kết tiến độ công trình.",
  },
  {
    number: "04",
    title: "BẢO HÀNH",
    description: "Đồng hành cùng khách hàng sau khi công trình được bàn giao.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-white text-[#101820]"
    >
      <div className="grid lg:grid-cols-2">
        {/* IMAGE */}
        <div className="relative min-h-[500px] lg:min-h-[720px]">
          <img
            src="/images/about-tin-hai-phat.jpg"
            alt="Tín Hải Phát Construction"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

          <div className="absolute bottom-8 left-8 border-l-[3px] border-[#d7a53a] pl-5 text-white md:bottom-12 md:left-12">
            <div className="text-[42px] font-extrabold leading-none text-[#e1ab3c]">
              10+
            </div>

            <div className="mt-2 text-[12px] font-bold uppercase tracking-[0.16em]">
              Năm kiến tạo giá trị
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex items-center px-6 py-16 md:px-12 lg:px-16 lg:py-20 xl:px-20">
          <div className="max-w-[680px]">
            <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#c9932e]">
              Về chúng tôi
            </p>

            <h2 className="mt-4 text-3xl font-extrabold uppercase leading-[1.15] md:text-4xl xl:text-[42px]">
              Tín Hải Phát
              <br />
              <span className="whitespace-nowrap text-[#c9932e]">
                Kiến tạo từ chữ tín
              </span>
            </h2>

            <div className="mt-6 h-[3px] w-14 bg-[#d7a53a]" />

            <p className="mt-7 text-[15px] leading-8 text-black/65">
              Tín Hải Phát hoạt động trong lĩnh vực thiết kế và thi công xây
              dựng, hướng đến những công trình có giá trị bền vững về chất
              lượng, công năng và thẩm mỹ.
            </p>

            <p className="mt-4 text-[15px] leading-8 text-black/65">
              Chúng tôi đồng hành cùng khách hàng từ những ý tưởng đầu tiên,
              khảo sát, thiết kế, lập dự toán đến thi công và bàn giao công
              trình hoàn thiện.
            </p>

            <div className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {strengths.map((item) => (
                <div
                  key={item.number}
                  className="border-t border-black/10 pt-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-extrabold text-[#c9932e]">
                      {item.number}
                    </span>

                    <h3 className="text-[13px] font-extrabold">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-[13px] leading-6 text-black/55">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-10 inline-flex items-center bg-[#111820] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-[#d7a53a] hover:text-[#111820]"
            >
              Tìm hiểu về Tín Hải Phát →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}