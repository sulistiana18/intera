"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

export default function TrainingSection() {
  const [trainingName, setTrainingName] = useState("");
  const [institution, setInstitution] = useState("");
  const [credentialId, setCredentialId] = useState("");

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Icon icon="solar:document-text-bold" className="text-blue-900 text-base" />
        Riwayat Pelatihan / Sertifikasi Profesional
      </h3>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600">Nama Pelatihan / Kursus <span className="text-red-500">*</span></label>
          <div className="md:col-span-3">
            <input type="text" value={trainingName} onChange={(e) => setTrainingName(e.target.value)} placeholder="Contoh: Sertifikasi Data Analyst Profesional" className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none focus:border-blue-900" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600">Institusi Penyelenggara <span className="text-red-500">*</span></label>
          <div className="md:col-span-3">
            <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="Contoh: Google / Coursera / Dicoding" className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none focus:border-blue-900" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600">Nomor Kredensial / Sertifikat</label>
          <div className="md:col-span-3">
            <input type="text" value={credentialId} onChange={(e) => setCredentialId(e.target.value)} placeholder="Contoh: CERT-12345XYZ" className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none focus:border-blue-900" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div className="md:col-start-2 md:col-span-3 flex justify-end">
            <button type="button" onClick={() => alert("Data Pelatihan Disimpan!")} className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition cursor-pointer">
              Simpan Pelatihan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}