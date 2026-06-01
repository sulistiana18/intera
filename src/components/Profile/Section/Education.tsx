"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

export default function PendidikanSection() {
  const [jenjang, setJenjang] = useState("S1");
  const [kampus, setKampus] = useState("");
  const [prodi, setProdi] = useState("");
  const [ipk, setIpk] = useState("");

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Icon icon="solar:backpack-bold" className="text-blue-900 text-base" />
        Riwayat Pendidikan Formal
      </h3>

      <div className="space-y-5">
        {/* JENJANG PENDIDIKAN */}
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600">Jenjang Pendidikan <span className="text-red-500">*</span></label>
          <div className="md:col-span-3">
            <select value={jenjang} onChange={(e) => setJenjang(e.target.value)} className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none focus:border-blue-900">
              <option value="S1">S1 (Sarjana)</option>
              <option value="D4">D4 (Diploma 4)</option>
              <option value="D3">D3 (Diploma 3)</option>
              <option value="S2">S2 (Magister)</option>
            </select>
          </div>
        </div>

        {/* NAMA PERGURUAN TINGGI */}
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600">Nama Perguruan Tinggi <span className="text-red-500">*</span></label>
          <div className="md:col-span-3">
            <input type="text" value={kampus} onChange={(e) => setKampus(e.target.value)} placeholder="Contoh: Universitas Gadjah Mada" className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none focus:border-blue-900" />
          </div>
        </div>

        {/* PROGRAM STUDI */}
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600">Program Studi <span className="text-red-500">*</span></label>
          <div className="md:col-span-3">
            <input type="text" value={prodi} onChange={(e) => setProdi(e.target.value)} placeholder="Contoh: Sistem Informasi / Teknik Industri" className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none focus:border-blue-900" />
          </div>
        </div>

        {/* IPK */}
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600">IPK / GPA <span className="text-red-500">*</span></label>
          <div className="md:col-span-3">
            <input type="text" maxLength={4} value={ipk} onChange={(e) => setIpk(e.target.value)} placeholder="Contoh: 3.75" className="w-full sm:w-1/3 text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none focus:border-blue-900" />
          </div>
        </div>

        {/* ACTIONS BUTTON */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div className="md:col-start-2 md:col-span-3 flex justify-end">
            <button type="button" onClick={() => alert(`Data Pendidikan di ${kampus || 'Kampus'} Berhasil Disimpan!`)} className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition cursor-pointer">
              Simpan Pendidikan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}