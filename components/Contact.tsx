export default function Contact() {
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
              Liên hệ Tín Hải Phát
            </p>

            <h2 className="mt-4 text-3xl font-extrabold uppercase leading-[1.15] md:text-4xl xl:text-[46px]">
              Bạn đang có
              <br />
              <span className="text-[#d7a53a]">
                kế hoạch xây dựng?
              </span>
            </h2>

            <div className="mt-6 h-[3px] w-14 bg-[#d7a53a]" />

            <p className="mt-7 max-w-[560px] text-[15px] leading-8 text-white/60">
              Hãy để Tín Hải Phát đồng hành cùng bạn từ bước khảo sát, thiết kế,
              dự toán đến thi công và bàn giao công trình hoàn thiện.
            </p>

            <div className="mt-10 space-y-6">
              <div className="border-t border-white/10 pt-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                  Hotline
                </p>

                <a
                  href="tel:0901234567"
                  className="mt-2 inline-block text-[24px] font-extrabold text-[#d7a53a]"
                >
                  0901 234 567
                </a>
              </div>

              <div className="border-t border-white/10 pt-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                  Email
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
                  Khu vực hoạt động
                </p>

                <p className="mt-2 text-[15px] font-semibold text-white/85">
                  TP.HCM và khu vực lân cận
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white p-7 text-[#111820] md:p-10 lg:p-12">
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#c9932e]">
              Nhận tư vấn miễn phí
            </p>

            <h3 className="mt-3 text-2xl font-extrabold uppercase md:text-3xl">
              Gửi yêu cầu báo giá
            </h3>

            <p className="mt-4 max-w-[560px] text-[14px] leading-7 text-black/55">
              Điền thông tin bên dưới, Tín Hải Phát sẽ liên hệ để tư vấn và
              khảo sát nhu cầu của bạn.
            </p>

            <form className="mt-8 grid gap-5">
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45">
                  Họ và tên
                </label>

                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] outline-none transition placeholder:text-black/30 focus:border-[#d7a53a]"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45">
                    Số điện thoại
                  </label>

                  <input
                    type="tel"
                    placeholder="09xx xxx xxx"
                    className="w-full border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] outline-none transition placeholder:text-black/30 focus:border-[#d7a53a]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45">
                    Khu vực xây dựng
                  </label>

                  <input
                    type="text"
                    placeholder="TP.HCM"
                    className="w-full border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] outline-none transition placeholder:text-black/30 focus:border-[#d7a53a]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45">
                  Nhu cầu
                </label>

                <select className="w-full border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] outline-none transition focus:border-[#d7a53a]">
                  <option>Xây nhà trọn gói</option>
                  <option>Thiết kế kiến trúc</option>
                  <option>Thi công phần thô</option>
                  <option>Thi công hoàn thiện</option>
                  <option>Cải tạo - sửa chữa</option>
                  <option>Thiết kế & nội thất</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45">
                  Nội dung cần tư vấn
                </label>

                <textarea
                  rows={5}
                  placeholder="Mô tả sơ bộ diện tích, số tầng, nhu cầu và thời gian dự kiến..."
                  className="w-full resize-none border border-black/10 bg-[#f7f7f5] px-4 py-4 text-[14px] leading-7 outline-none transition placeholder:text-black/30 focus:border-[#d7a53a]"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center bg-[#d7a53a] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.06em] text-[#111820] transition hover:bg-[#e6b64d]"
              >
                Gửi yêu cầu tư vấn →
              </button>
            </form>

            <p className="mt-5 text-[11px] leading-5 text-black/35">
              * Thông tin của bạn chỉ được sử dụng để liên hệ tư vấn và báo giá.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}