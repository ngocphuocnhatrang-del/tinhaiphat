"use client";

import { useMemo, useState } from "react";

const packages = {
  rough: {
    label: "Thi công phần thô",
    price: 3800000,
  },
  standard: {
    label: "Trọn gói tiêu chuẩn",
    price: 5800000,
  },
  premium: {
    label: "Trọn gói cao cấp",
    price: 7500000,
  },
};

export default function CostEstimator() {
  const [area, setArea] = useState(100);
  const [floors, setFloors] = useState(2);
  const [constructionPackage, setConstructionPackage] =
    useState<keyof typeof packages>("standard");

  const estimatedCost = useMemo(() => {
    const selectedPackage = packages[constructionPackage];

    const constructionArea = area * floors;

    const baseCost = constructionArea * selectedPackage.price;

    const min = baseCost * 0.95;
    const max = baseCost * 1.08;

    return {
      min,
      max,
      constructionArea,
    };
  }, [area, floors, constructionPackage]);

  const formatMoney = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(2)} tỷ`;
    }

    return `${Math.round(value / 1000000).toLocaleString("vi-VN")} triệu`;
  };

  return (
    <section className="bg-[#0b1118] px-5 py-20 text-white lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid overflow-hidden border border-white/10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-[#0d151e] p-7 md:p-10 lg:p-12">
            <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#d7a53a]">
              Công cụ dự toán nhanh
            </p>

            <h2 className="mt-3 text-3xl font-extrabold uppercase leading-tight md:text-4xl">
              Ước tính chi phí xây dựng
            </h2>

            <p className="mt-5 max-w-[620px] text-[14px] leading-7 text-white/60">
              Nhập thông tin cơ bản để tham khảo chi phí dự kiến cho công trình
              của bạn.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-[12px] font-bold uppercase tracking-[0.08em] text-white/65">
                  Diện tích mỗi tầng
                </label>

                <div className="relative">
                  <input
                    type="number"
                    min={20}
                    value={area}
                    onChange={(e) =>
                      setArea(Math.max(20, Number(e.target.value)))
                    }
                    className="w-full border border-white/15 bg-[#111b26] px-4 py-4 pr-14 text-[15px] text-white outline-none transition focus:border-[#d7a53a]"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white/45">
                    m²
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[12px] font-bold uppercase tracking-[0.08em] text-white/65">
                  Số tầng
                </label>

                <select
                  value={floors}
                  onChange={(e) => setFloors(Number(e.target.value))}
                  className="w-full border border-white/15 bg-[#111b26] px-4 py-4 text-[15px] text-white outline-none transition focus:border-[#d7a53a]"
                >
                  <option value={1}>1 tầng</option>
                  <option value={2}>2 tầng</option>
                  <option value={3}>3 tầng</option>
                  <option value={4}>4 tầng</option>
                  <option value={5}>5 tầng</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-[12px] font-bold uppercase tracking-[0.08em] text-white/65">
                  Gói thi công
                </label>

                <select
                  value={constructionPackage}
                  onChange={(e) =>
                    setConstructionPackage(
                      e.target.value as keyof typeof packages,
                    )
                  }
                  className="w-full border border-white/15 bg-[#111b26] px-4 py-4 text-[15px] text-white outline-none transition focus:border-[#d7a53a]"
                >
                  {Object.entries(packages).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-gradient-to-br from-[#172331] to-[#091019] p-7 md:p-10 lg:p-12">
            <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#d7a53a]">
              Chi phí dự kiến
            </p>

            <div className="mt-5 text-[38px] font-extrabold leading-tight text-[#e2ad3e] md:text-[48px]">
              {formatMoney(estimatedCost.min)}
              <span className="mx-3 text-white/30">–</span>
              {formatMoney(estimatedCost.max)}
            </div>

            <div className="mt-7 border-t border-white/10 pt-6">
              <div className="flex justify-between gap-5 text-sm">
                <span className="text-white/50">Diện tích xây dựng dự kiến</span>
                <span className="font-bold text-white">
                  {estimatedCost.constructionArea.toLocaleString("vi-VN")} m²
                </span>
              </div>

              <div className="mt-4 flex justify-between gap-5 text-sm">
                <span className="text-white/50">Đơn giá tham khảo</span>
                <span className="font-bold text-white">
                  {packages[
                    constructionPackage
                  ].price.toLocaleString("vi-VN")}{" "}
                  đ/m²
                </span>
              </div>
            </div>

            <p className="mt-7 text-[12px] leading-6 text-white/40">
              * Chi phí trên chỉ mang tính tham khảo. Giá thực tế phụ thuộc vào
              thiết kế, kết cấu, vật tư, vị trí thi công và điều kiện công trình.
            </p>

            <a
              href="#contact"
              className="mt-8 inline-flex w-fit items-center gap-3 bg-[#d7a53a] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.05em] text-[#0b1118] transition hover:bg-[#e6b64d]"
            >
              Nhận báo giá chi tiết →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}