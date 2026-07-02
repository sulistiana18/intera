"use client";

import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface CheckResponse {
  status: string;
  nama?: string;
  link?: string;
  message?: string;
}

export default function CheckCertifPage() {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [currentLink, setCurrentLink] = useState("");

  const previewRef = useRef<HTMLDivElement>(null);

  const scriptURL = "https://script.google.com/macros/s/AKfycbzxMaCrz8I8TLydk7Hc7UAcBxQ-3BpSTg0Ajq34ropeh_8iLG-KKISNDGR_UxlNoPAP0g/exec";

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !nim.trim()) {
      setErrorMsg("Harap isi Nama Lengkap dan NIM kamu.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    setCurrentLink("");

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify({ nama: nama.trim(), nim: nim.trim() }),
      });
      
      const data: CheckResponse = await response.json();

      if (data.status === "success") {
        if (!data.link || data.link.trim() === "") {
          setErrorMsg("Sertifikat belum tersedia. Silakan hubungi admin.");
          return;
        }

        setSuccessMsg(`Halo, ${data.nama}! Sertifikat kamu berhasil ditemukan.`);
        setCurrentLink(data.link);

        setTimeout(() => {
          previewRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);

      } else {
        setErrorMsg(data.message || "Data tidak ditemukan. Pastikan Nama dan NIM benar.");
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan sistem atau masalah jaringan.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!currentLink) return;

    const fileIdMatch = currentLink.match(/\/d\/(.*?)\//);

    if (fileIdMatch) {
      const fileId = fileIdMatch[1];
      const downloadURL = `https://drive.google.com/uc?export=download&id=${fileId}`;
      window.open(downloadURL, "_blank");
    } else {
      window.open(currentLink, "_blank");
    }
  };

  return (
    /* PERUBAHAN DI SINI: justify-center diubah ke justify-start, dan ditambah pt-24 (padding top) */
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-start pt-12 px-6 pb-12 select-none">
      
      {/* Tombol Kembali ke Beranda */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm transition-all"
      >
        <Icon icon="solar:arrow-left-linear" className="text-base" />
        Kembali ke Home
      </Link>

      {/* PERUBAHAN DI SINI: mt-12 diubah ke mt-6 agar jarak dengan tombol di atasnya lebih pas */}
      <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 p-8 shadow-xl mt-6">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Icon icon="solar:diploma-verified-bold" className="text-3xl" />
          </div>
          <h1 className="text-xl font-bold text-slate-800">Sertifikat Kerja Prakpek</h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-medium">Validasi dan unduh dokumen resmi kerja praktek Anda</p>
        </div>

        {/* Form Pencarian */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama Lengkap</label>
            <div className="relative">
              <Icon icon="solar:user-linear" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              <input
                type="text"
                placeholder="Masukkan Nama Lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                autoComplete="off"
                className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">NIM (Nomor Induk Mahasiswa)</label>
            <div className="relative">
              <Icon icon="solar:checklist-linear" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              <input
                type="text"
                placeholder="Masukkan Nomor Induk Mahasiswa"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                autoComplete="off"
                className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-red-600 border border-transparent disabled:bg-slate-300 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
          >
            {loading ? (
              <>
                <Icon icon="svg-spinners:180-ring" className="text-base" />
                Memeriksa data...
              </>
            ) : (
              <>
                <Icon icon="solar:minimalistic-magnifer-bold" className="text-base" />
                Cek Sertifikat
              </>
            )}
          </button>
        </form>

        {/* Informasi Error */}
        {errorMsg && (
          <div className="mt-5 flex items-start gap-3 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 text-xs">
            <Icon icon="solar:danger-circle-bold" className="text-lg flex-shrink-0" />
            <p className="font-medium mt-0.5">{errorMsg}</p>
          </div>
        )}
      </div>

      {/* Tampilan Jika Sertifikat Ditemukan (PDF Preview Area) */}
      {currentLink && (
        <div ref={previewRef} className="w-full max-w-4xl mt-8 space-y-4 animate-fade-in">
          <div className="bg-emerald-50 border border-emerald-100 px-5 py-3 rounded-xl flex items-center justify-between text-emerald-800 shadow-sm">
            <div className="flex items-center gap-2">
              <Icon icon="solar:check-circle-bold" className="text-lg text-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-wider">{successMsg}</span>
            </div>
            
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow"
            >
              <Icon icon="solar:file-download-bold" className="text-base" />
              Download Sertifikat
            </button>
          </div>

          <div className="w-full h-[75vh] bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl">
            <iframe 
              src={`${currentLink}#view=FitH`}
              className="w-full h-full border-none"
              title="Preview Sertifikat"
            />
          </div>
        </div>
      )}
    </div>
  );
}