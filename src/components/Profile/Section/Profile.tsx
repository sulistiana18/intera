"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Icon } from "@iconify/react";

interface ProfileProps {
  namaLengkap: string;
  setNamaLengkap: (value: string) => void;
}

export default function ProfileSection({ namaLengkap, setNamaLengkap }: ProfileProps) {
  const { user } = useAuthStore();
  const [showKtp, setShowKtp] = useState(false);

  const [formData, setFormData] = useState({
    nomorKtp: "3302161611990002",
    jenisKelamin: "Perempuan",
    noTelp1: "0857 1214 4624",
    noTelp2: "0817 1786 8178",
    pendidikanTerakhir: "S1",
    prodi: "Sistem Informasi",
    tempatLahir: "Banyumas",
    provinsiLahir: "Jawa Tengah",
    negaraLahir: "Indonesia",
    tanggalLahir: "1999-11-16",
    tempatTinggal: "Banyumas",
    provinsiTinggal: "Jawa Tengah",
    negaraTinggal: "Indonesia",
  });

  const maskKtp = (ktp: string) => {
    if (ktp.length < 16) return ktp;
    return `${ktp.slice(0, 6)}******${ktp.slice(12)}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
      <div className="space-y-6">
        
        {/* INPUT: EMAIL */}
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-500">Email</label>
          <div className="md:col-span-3">
            <input type="email" value={user?.email || "tianasulis.st@gmail.com"} disabled className="w-full text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg p-3 bg-slate-100 outline-none cursor-not-allowed" />
          </div>
        </div>

        {/* INPUT: NAMA LENGKAP */}
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600">Nama Lengkap <span className="text-red-500">*</span></label>
          <div className="md:col-span-3">
            <input type="text" value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)} className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white focus:border-blue-900 outline-none transition" placeholder="Masukkan nama lengkap" />
          </div>
        </div>

        {/* INPUT: NOMOR KTP */}
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600">Nomor KTP <span className="text-red-500">*</span></label>
          <div className="md:col-span-3 relative">
            <input type="text" maxLength={16} value={showKtp ? formData.nomorKtp : maskKtp(formData.nomorKtp)} onChange={(e) => setFormData({...formData, nomorKtp: e.target.value})} className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white focus:border-blue-900 outline-none transition" placeholder="Masukkan 16 digit KTP" />
            <button type="button" onClick={() => setShowKtp(!showKtp)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"><Icon icon={showKtp ? "solar:eye-closed-bold" : "solar:eye-bold"} className="text-base" /></button>
          </div>
        </div>

        {/* INPUT: JENIS KELAMIN */}
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600">Jenis Kelamin <span className="text-red-500">*</span></label>
          <div className="md:col-span-3">
            <select value={formData.jenisKelamin} onChange={(e) => setFormData({...formData, jenisKelamin: e.target.value})} className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white focus:border-blue-900 outline-none transition">
              <option value="Perempuan">Perempuan</option>
              <option value="Laki-laki">Laki-laki</option>
            </select>
          </div>
        </div>

        {/* INPUT: TELEPON */}
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600">Nomor Telepon <span className="text-red-500">*</span></label>
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <Icon icon="solar:phone-calling-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
              <input type="text" value={formData.noTelp1} onChange={(e) => setFormData({...formData, noTelp1: e.target.value})} className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 pl-9 bg-white focus:border-blue-900 outline-none" placeholder="Nomor Utama" />
            </div>
            <div className="relative">
              <Icon icon="solar:phone-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
              <input type="text" value={formData.noTelp2} onChange={(e) => setFormData({...formData, noTelp2: e.target.value})} className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 pl-9 bg-white focus:border-blue-900 outline-none" placeholder="Nomor Alternatif" />
            </div>
          </div>
        </div>

        {/* INPUT: ALAMAT TINGGAL */}
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6">
          <label className="text-xs font-bold text-slate-600">Tempat Tinggal <span className="text-red-500">*</span></label>
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select value={formData.tempatTinggal} onChange={(e) => setFormData({...formData, tempatTinggal: e.target.value})} className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white focus:border-blue-900 outline-none">
              <option value="Banyumas">Banyumas</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Pekanbaru">Pekanbaru</option>
            </select>
            <input type="text" value={formData.provinsiTinggal} onChange={(e) => setFormData({...formData, provinsiTinggal: e.target.value})} className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none" placeholder="Provinsi" />
            <input type="text" value={formData.negaraTinggal} onChange={(e) => setFormData({...formData, negaraTinggal: e.target.value})} className="w-full text-xs font-medium text-slate-700 border border-slate-200 rounded-lg p-3 bg-white outline-none" placeholder="Negara" />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div className="md:col-start-2 md:col-span-3 flex justify-end">
            <button type="button" onClick={() => alert("Profil Biodata Disimpan!")} className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition cursor-pointer">
              Simpan Profil
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}