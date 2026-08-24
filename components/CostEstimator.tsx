"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const packagePrices = {
  rough: 3800000,
  standard: 5800000,
  premium: 7500000,
};

type PackageKey = keyof typeof packagePrices;

export default function CostEstimator() {
  const { language, t } = useLanguage();

  const [area, setArea] = useState(100);
  const [floors, setFloors] = useState(2);
  const [constructionPackage, setConstructionPackage] =
    useState<PackageKey>("standard");

  const estimatedCost = useMemo(() => {
    const price = packagePrices[constructionPackage];

    const constructionArea = area * floors;
    const baseCost = constructionArea * price;

    return {
      min: baseCost * 0.95,
      max: baseCost * 1.08,
      constructionArea,
    };
  }, [area, floors, constructionPackage]);

  const formatMoney = (value: number) => {
    if (value >= 1000000000) {
      const amount = (value / 1000000000).toFixed(2);

      return language === "vi"
        ? `${amount} ${t.costEstimator.billion}`
        : `${amount} ${t.costEstimator.billion}`;
    }

    const amount = Math.round(value / 1000000).toLocaleString(
      language === "vi" ? "vi-VN" : "en-US",
    );

    return `${amount} ${t.costEstimator.million}`;
  };

  const packageLabels: Record<PackageKey, string> = {
    rough: t.costEstimator.packages.rough,
    standard: t.costEstimator.packages.standard,
    premium: t.costEstimator.packages.premium,
  };

  return (
    <section className="bg-[#0b1118] px-5 py-20 text-white lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid overflow-hidden border border-white/10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT */}
          <div className="bg-[#0d151e] p-7 md:p-10 lg:p-12">
            <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#d7a53a]">
              {t.costEstimator.eyebrow}
            </p>

            <h2 className="mt-3 text-3xl font-extrabold uppercase leading-tight md:text-4xl">
              {t.costEstimator.title}
            </h2>

            <p className="mt-5 max-w-[620px] text-[14px] leading-7 text-white/60">
              {t.costEstimator.description}
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-[12px] font-bold uppercase tracking-[0.08em] text-white/65">
                  {t.costEstimator.area}
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
                  {t.costEstimator.floors}
                </label>

                <select
                  value={floors}
                  onChange={(e) => setFloors(Number(e.target.value))}
                  className="w-full border border-white/15 bg-[#111b26] px-4 py-4 text-[15px] text-white outline-none transition focus:border-[#d7a53a]"
                >
                  {[1, 2, 3, 4, 5].map((floor) => (
                    <option key={floor} value={floor}>
                      {floor}{" "}
                      {language === "vi"
                        ? t.costEstimator.floorUnit
                        : floor === 1
                          ? "floor"
                          : "floors"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-[12px] font-bold uppercase tracking-[0.08em] text-white/65">
                  {t.costEstimator.package}
                </label>

                <select
                  value={constructionPackage}
                  onChange={(e) =>
                    setConstructionPackage(e.target.value as PackageKey)
                  }
                  className="w-full border border-white/15 bg-[#111b26] px-4 py-4 text-[15px] text-white outline-none transition focus:border-[#d7a53a]"
                >
                  {(Object.keys(packagePrices) as PackageKey[]).map((key) => (
                    <option key={key} value={key}>
                      {packageLabels[key]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-center bg-gradient-to-br from-[#172331] to-[#091019] p-7 md:p-10 lg:p-12">
            <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#d7a53a]">
              {t.costEstimator.estimatedCost}
            </p>

            <div className="mt-5 text-[38px] font-extrabold leading-tight text-[#e2ad3e] md:text-[48px]">
              {formatMoney(estimatedCost.min)}

              <span className="mx-3 text-white/30">–</span>

              {formatMoney(estimatedCost.max)}
            </div>

            <div className="mt-7 border-t border-white/10 pt-6">
              <div className="flex justify-between gap-5 text-sm">
                <span className="text-white/50">
                  {t.costEstimator.estimatedArea}
                </span>

                <span className="font-bold text-white">
                  {estimatedCost.constructionArea.toLocaleString(
                    language === "vi" ? "vi-VN" : "en-US",
                  )}{" "}
                  m²
                </span>
              </div>

              <div className="mt-4 flex justify-between gap-5 text-sm">
                <span className="text-white/50">
                  {t.costEstimator.referencePrice}
                </span>

                <span className="font-bold text-white">
                  {packagePrices[constructionPackage].toLocaleString(
                    language === "vi" ? "vi-VN" : "en-US",
                  )}{" "}
                  {t.costEstimator.currencyUnit}
                </span>
              </div>
            </div>

            <p className="mt-7 text-[12px] leading-6 text-white/40">
              {t.costEstimator.note}
            </p>

            <a
              href="#contact"
              className="mt-8 inline-flex w-fit items-center gap-3 bg-[#d7a53a] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.05em] text-[#0b1118] transition hover:bg-[#e6b64d]"
            >
              {t.costEstimator.quote} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}