"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

export default function PengalamanSection() {
  const [perusahaan, setPerusahaan] = useState("");
  const [posisi, setPosisi] = useState("");
  const [tipeIkatan, setTipeIkatan] = useState("kerja praktek");
  const [deskripsi, setDeskripsi] = useState("");

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Icon icon="solar:case-bold" className="text-blue-900 text-base" />
        Riwayat Pengalaman Kerja / kerja praktek
      </h3>

      <div className="space-y-5">
        {/* NAMA PERUSAHAAN */}
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600">Nama Perusahaan <span className="text-red-500">*</span></label>
          <div className="md:col-span-3">
            <input type="text" value={perusahaan} onChange={(e) => setPerusahaan(e.target.value)} placeholder="Contoh: PT Pertamina (Persero)" className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none focus:border-blue-900" />
          </div>
        </div>

        {/* JABATAN */}
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600">Posisi / Jabatan <span className="text-red-500">*</span></label>
          <div className="md:col-span-3">
            <input type="text" value={posisi} onChange={(e) => setPosisi(e.target.value)} placeholder="Contoh: UI/UX Designer Intern" className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none focus:border-blue-900" />
          </div>
        </div>

        {/* TIPE PEKERJAAN */}
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600">Tipe Ikatan <span className="text-red-500">*</span></label>
          <div className="md:col-span-3">
            <select value={tipeIkatan} onChange={(e) => setTipeIkatan(e.target.value)} className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none focus:border-blue-900">
              <option value="kerja praktek">kerja praktek (Internship)</option>
              <option value="Kontrak">Kontrak</option>
              <option value="Fulltime">Karyawan Tetap</option>
              <option value="Freelance">Lepas Waktu (Freelance)</option>
            </select>
          </div>
        </div>

        {/* DESKRIPSI TUGAS */}
        <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600 mt-2">Deskripsi Pekerjaan</label>
          <div className="md:col-span-3">
            <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} rows={4} placeholder="Ceritakan jobdesk atau pencapaian yang kamu raih selama bekerja..." className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none focus:border-blue-900 resize-none" />
          </div>
        </div>

        {/* ACTIONS BUTTON */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div className="md:col-start-2 md:col-span-3 flex justify-end">
            <button type="button" onClick={() => alert(`Pengalaman Kerja di ${perusahaan || 'Perusahaan'} Berhasil Ditambahkan!`)} className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition cursor-pointer">
              Tambah Pengalaman
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}