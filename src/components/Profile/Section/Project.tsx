"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

export default function ProjectSection() {
  const [projectName, setProjectName] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Icon icon="solar:folder-open-bold" className="text-blue-900 text-base" />
        Portofolio Proyek / Penelitian
      </h3>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600">Nama Proyek <span className="text-red-500">*</span></label>
          <div className="md:col-span-3">
            <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Contoh: Pengembangan Dashboard Manajemen Rekrutmen" className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none focus:border-blue-900" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600">Tautan Proyek (URL)</label>
          <div className="md:col-span-3">
            <input type="url" value={projectLink} onChange={(e) => setProjectLink(e.target.value)} placeholder="Contoh: https://github.com/username/project-repo" className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none focus:border-blue-900" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600 mt-2">Deskripsi Proyek</label>
          <div className="md:col-span-3">
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Jelaskan teknologi yang digunakan, fitur, atau kontribusimu dalam proyek ini..." className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none focus:border-blue-900 resize-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div className="md:col-start-2 md:col-span-3 flex justify-end">
            <button type="button" onClick={() => alert("Proyek Berhasil Ditambahkan!")} className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition cursor-pointer">
              Tambah Proyek
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}