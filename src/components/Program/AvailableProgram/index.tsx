"use client";

import { Icon } from "@iconify/react";

type FunctionQuota = {
  id: string;
  functionName: string;
  quota: number;
  filled: number;
  location?: string;
};

const functions: FunctionQuota[] = [
  {
    id: "1",
    functionName: "Engineering",
    quota: 20,
    filled: 15,
    location: "Head Office / Remote",
  },
  {
    id: "2",
    functionName: "Human Resources",
    quota: 10,
    filled: 10,
    location: "Head Office",
  },
  {
    id: "3",
    functionName: "Finance & Accounting",
    quota: 8,
    filled: 3,
    location: "Head Office",
  },
  {
    id: "4",
    functionName: "Design & Multimedia",
    quota: 5,
    filled: 2,
    location: "Hybrid",
  },
];

export default function AvailableProgram() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Available KP Functions
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Pilih fungsi penempatan kerja praktik sesuai kuota yang tersedia
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {functions.map((fn) => {
          const isFull = fn.filled >= fn.quota;
          const remaining = fn.quota - fn.filled;
          const percent = Math.round((fn.filled / fn.quota) * 100);

          return (
            <div
              key={fn.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              {/* HEADER */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-slate-800">
                    {fn.functionName}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {fn.location}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold
                  ${
                    isFull
                      ? "bg-red-50 text-red-600"
                      : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  {isFull ? "FULL" : "AVAILABLE"}
                </span>
              </div>

              {/* QUOTA INFO */}
              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:user-bold" className="text-base" />
                  Kuota: {fn.quota}
                </div>

                <div className="flex items-center gap-2">
                  <Icon
                    icon="solar:users-group-rounded-bold"
                    className="text-base"
                  />
                  Terisi: {fn.filled} | Sisa: {remaining}
                </div>
              </div>

              {/* PROGRESS */}
              <div className="mt-4">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      isFull ? "bg-red-500" : "bg-emerald-500"
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {percent}% terisi
                </p>
              </div>

              {/* ACTION */}
              <button
                disabled={isFull}
                className={`mt-5 w-full text-xs font-semibold py-2.5 rounded-xl transition
                ${
                  isFull
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-slate-900 hover:bg-red-600 text-white"
                }`}
              >
                {isFull ? "Kuota Penuh" : "Lihat & Daftar"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}