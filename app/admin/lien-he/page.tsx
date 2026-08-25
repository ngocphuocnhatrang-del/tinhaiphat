"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type ContactStatus =
  | "new"
  | "contacted"
  | "consulting"
  | "completed";

type ContactRequest = {
  id: number;
  full_name: string;
  phone: string;
  location: string | null;
  service: string | null;
  message: string | null;
  status: ContactStatus;
  created_at: string;
};

type FilterKey = "all" | ContactStatus;

const statusOptions: {
  value: ContactStatus;
  label: string;
}[] = [
  {
    value: "new",
    label: "MỚI",
  },
  {
    value: "contacted",
    label: "ĐÃ LIÊN HỆ",
  },
  {
    value: "consulting",
    label: "ĐANG TƯ VẤN",
  },
  {
    value: "completed",
    label: "HOÀN THÀNH",
  },
];

export default function AdminContactPage() {
  const router = useRouter();

  const [items, setItems] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [updatingId, setUpdatingId] =
    useState<number | null>(null);

  useEffect(() => {
    const loadContacts = async () => {
      setLoading(true);
      setError("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      const { data, error: loadError } = await supabase
        .from("contact_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (loadError) {
        console.error(loadError);
        setError(
          "Không thể tải danh sách yêu cầu tư vấn.",
        );
        setLoading(false);
        return;
      }

      setItems(
        (data ?? []) as ContactRequest[],
      );

      setLoading(false);
    };

    loadContacts();
  }, [router]);

  const counts = useMemo(() => {
    return {
      all: items.length,

      new: items.filter(
        (item) => item.status === "new",
      ).length,

      contacted: items.filter(
        (item) => item.status === "contacted",
      ).length,

      consulting: items.filter(
        (item) => item.status === "consulting",
      ).length,

      completed: items.filter(
        (item) => item.status === "completed",
      ).length,
    };
  }, [items]);

  const filteredItems = useMemo(() => {
    if (filter === "all") {
      return items;
    }

    return items.filter(
      (item) => item.status === filter,
    );
  }, [items, filter]);

  const handleStatusChange = async (
    id: number,
    newStatus: ContactStatus,
  ) => {
    setUpdatingId(id);
    setError("");

    const { error: updateError } = await supabase
      .from("contact_requests")
      .update({
        status: newStatus,
      })
      .eq("id", id);

    if (updateError) {
      console.error(updateError);
      setError(
        "Không thể cập nhật trạng thái.",
      );
      setUpdatingId(null);
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: newStatus,
            }
          : item,
      ),
    );

    setUpdatingId(null);
  };

  const formatDate = (value: string) => {
    return new Date(value).toLocaleString(
      "vi-VN",
      {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      },
    );
  };

  const getStatusClass = (
    status: ContactStatus,
  ) => {
    switch (status) {
      case "contacted":
        return "bg-blue-50 text-blue-700";

      case "consulting":
        return "bg-orange-50 text-orange-700";

      case "completed":
        return "bg-green-50 text-green-700";

      default:
        return "bg-[#fff4d8] text-[#9b6a00]";
    }
  };

  const getStatusLabel = (
    status: ContactStatus,
  ) => {
    return (
      statusOptions.find(
        (option) =>
          option.value === status,
      )?.label ?? "MỚI"
    );
  };

  const filters: {
    key: FilterKey;
    label: string;
    count: number;
  }[] = [
    {
      key: "all",
      label: "TẤT CẢ",
      count: counts.all,
    },
    {
      key: "new",
      label: "MỚI",
      count: counts.new,
    },
    {
      key: "contacted",
      label: "ĐÃ LIÊN HỆ",
      count: counts.contacted,
    },
    {
      key: "consulting",
      label: "ĐANG TƯ VẤN",
      count: counts.consulting,
    },
    {
      key: "completed",
      label: "HOÀN THÀNH",
      count: counts.completed,
    },
  ];

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b1118] text-white">
        <p className="text-sm text-white/60">
          Đang tải yêu cầu tư vấn...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#111820]">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-[#0b1118] px-5 py-5 text-white lg:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <div>
            <div className="text-[18px] font-extrabold tracking-[0.08em] text-[#d7a53a]">
              TÍN HẢI PHÁT
            </div>

            <div className="mt-1 text-[9px] tracking-[0.3em] text-white/50">
              ADMIN · CONTACT REQUESTS
            </div>
          </div>

          <a
            href="/admin"
            className="inline-flex items-center justify-center border border-white/15 px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-white/70 transition hover:border-[#d7a53a] hover:text-[#d7a53a]"
          >
            ← Dashboard
          </a>
        </div>
      </header>

      {/* CONTENT */}
      <section className="px-5 py-8 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9932e]">
              Khách hàng
            </p>

            <h1 className="mt-2 text-[28px] font-extrabold uppercase">
              Yêu cầu tư vấn
            </h1>

            <p className="mt-2 text-[13px] text-black/50">
              Theo dõi và xử lý khách hàng gửi yêu cầu từ website.
            </p>
          </div>

          {/* FILTERS */}
          <div className="mt-7 flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() =>
                  setFilter(item.key)
                }
                className={`px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.05em] transition ${
                  filter === item.key
                    ? "bg-[#111820] text-white"
                    : "border border-black/10 bg-white text-black/50 hover:border-[#d7a53a]"
                }`}
              >
                {item.label} ({item.count})
              </button>
            ))}
          </div>

          {error && (
            <div className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
              {error}
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="mt-6 border border-black/10 bg-white p-10 text-center">
              <p className="text-[13px] text-black/40">
                Chưa có yêu cầu tư vấn trong mục này.
              </p>
            </div>
          )}

          {filteredItems.length > 0 && (
            <div className="mt-6 overflow-hidden border border-black/[0.07] bg-white">
              <table className="w-full table-fixed border-collapse">
                <thead className="bg-[#111820] text-white">
                  <tr className="text-left text-[9px] font-extrabold uppercase tracking-[0.08em]">
                    <th className="w-[14%] px-4 py-4">
                      Khách hàng
                    </th>

                    <th className="w-[12%] px-4 py-4">
                      Điện thoại
                    </th>

                    <th className="w-[13%] px-4 py-4">
                      Khu vực
                    </th>

                    <th className="w-[15%] px-4 py-4">
                      Nhu cầu
                    </th>

                    <th className="w-[20%] px-4 py-4">
                      Nội dung
                    </th>

                    <th className="w-[14%] px-4 py-4">
                      Trạng thái
                    </th>

                    <th className="w-[12%] px-4 py-4">
                      Thao tác
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-black/[0.06] align-top"
                    >
                      <td className="px-4 py-5 text-[12px] font-extrabold">
                        {item.full_name}
                      </td>

                      <td className="px-4 py-5">
                        <a
                          href={`tel:${item.phone}`}
                          className="text-[12px] font-bold text-[#c9932e]"
                        >
                          {item.phone}
                        </a>
                      </td>

                      <td className="px-4 py-5 text-[12px] text-black/55">
                        {item.location || "—"}
                      </td>

                      <td className="px-4 py-5 text-[12px] text-black/55">
                        {item.service || "—"}
                      </td>

                      <td className="px-4 py-5">
                        <p className="line-clamp-3 break-words text-[12px] leading-6 text-black/55">
                          {item.message || "—"}
                        </p>

                        <p className="mt-2 text-[9px] text-black/30">
                          {formatDate(
                            item.created_at,
                          )}
                        </p>
                      </td>

                      <td className="px-4 py-5">
                        <span
                          className={`inline-flex px-3 py-1.5 text-[9px] font-extrabold uppercase ${getStatusClass(
                            item.status,
                          )}`}
                        >
                          {getStatusLabel(
                            item.status,
                          )}
                        </span>

                        <select
                          value={item.status}
                          disabled={
                            updatingId === item.id
                          }
                          onChange={(e) =>
                            handleStatusChange(
                              item.id,
                              e.target
                                .value as ContactStatus,
                            )
                          }
                          className="mt-2 w-full border border-black/10 bg-[#fafafa] px-2 py-2 text-[9px] font-bold outline-none focus:border-[#d7a53a] disabled:opacity-50"
                        >
                          {statusOptions.map(
                            (option) => (
                              <option
                                key={option.value}
                                value={
                                  option.value
                                }
                              >
                                {option.label}
                              </option>
                            ),
                          )}
                        </select>
                      </td>

                      <td className="px-4 py-5">
                        <a
                          href={`tel:${item.phone}`}
                          className="inline-flex w-full items-center justify-center bg-[#d7a53a] px-3 py-2.5 text-[9px] font-extrabold uppercase text-[#111820] transition hover:bg-[#e6b64d]"
                        >
                          ☎ Gọi khách
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}