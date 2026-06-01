"use client";

import { Icon } from "@iconify/react";

type HistoryItem = {
  id: string;
  functionName: string;
  status: "pending" | "accepted" | "rejected";
  appliedAt: string;
  location?: string;
};

// 🔥 contoh data (nanti dari Supabase)
const history: HistoryItem[] = [
  {
    id: "1",
    functionName: "Human Resources",
    status: "pending",
    appliedAt: "2026-06-01",
    location: "Head Office",
  },
];

const statusStyle = {
  pending: "bg-amber-50 text-amber-600",
  accepted: "bg-emerald-50 text-emerald-600",
  rejected: "bg-red-50 text-red-600",
};

const statusLabel = {
  pending: "Menunggu",
  accepted: "Diterima",
  rejected: "Ditolak",
};

export default function ProgramHistory() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Riwayat Pendaftaran
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Daftar program KP yang pernah kamu ajukan
        </p>
      </div>

      {/* EMPTY STATE */}
      {history.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
          <Icon
            icon="solar:document-text-broken"
            className="text-5xl text-slate-300 mx-auto"
          />
          <h3 className="mt-4 text-sm font-semibold text-slate-700">
            Belum ada riwayat
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Kamu belum pernah mendaftar program KP
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              {/* TOP */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-slate-800">
                    {item.functionName}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {item.location}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    statusStyle[item.status]
                  }`}
                >
                  {statusLabel[item.status]}
                </span>
              </div>

              {/* INFO */}
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <Icon icon="solar:calendar-bold" className="text-base" />
                Diajukan: {item.appliedAt}
              </div>

              {/* ACTION */}
              <div className="mt-4 flex gap-2">
                <button className="text-xs font-semibold px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-red-600 transition">
                  Lihat Detail
                </button>

                {item.status === "pending" && (
                  <button className="text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
                    Batalkan
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}