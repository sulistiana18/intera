"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

export default function SkillsOrgSection() {
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>(["Python", "SQL", "Tableau", "Power BI", "Excel"]);
  const [orgName, setOrgName] = useState("");
  const [role, setRole] = useState("");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="space-y-6">
      {/* SECTION KEAHLIAN */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2">
          <Icon icon="solar:star-bold" className="text-blue-900 text-base" />
          Keahlian / Skills
        </h3>

        <div className="space-y-4">
          <form onSubmit={handleAddSkill} className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
            <label className="text-xs font-bold text-slate-600">Tambah Keahlian</label>
            <div className="md:col-span-3 flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Contoh: Data Visualization, Python, dsb."
                className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none focus:border-blue-900"
              />
              <button type="submit" className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-lg transition cursor-pointer">
                Tambah
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
            <div className="md:col-start-2 md:col-span-3 flex flex-wrap gap-2 pt-2">
              {skills.map((skill, index) => (
                <span key={index} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill(skill)} className="text-slate-400 hover:text-red-500 cursor-pointer">
                    <Icon icon="solar:close-circle-bold" className="text-sm" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION ORGANISASI */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2">
          <Icon icon="solar:users-group-two-rounded-bold" className="text-blue-900 text-base" />
          Pengalaman Organisasi
        </h3>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
            <label className="text-xs font-bold text-slate-600">Nama Organisasi</label>
            <div className="md:col-span-3">
              <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="Contoh: Himpunan Mahasiswa Sistem Informasi" className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
            <label className="text-xs font-bold text-slate-600">Jabatan / Peran</label>
            <div className="md:col-span-3">
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Contoh: Kepala Divisi Hubungan Luar" className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
            <div className="md:col-start-2 md:col-span-3 flex justify-end">
              <button type="button" onClick={() => alert("Data Organisasi Disimpan!")} className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer">
                Simpan Organisasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}