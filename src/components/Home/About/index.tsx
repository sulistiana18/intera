"use client";

import { getDataPath } from "@/utils/util";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function About() {
  const benefits = [
    { id: 1, label: "Uang Saku", icon: "solar:wallet-money-bold" },
    { id: 2, label: "BPJS Kesehatan", icon: "solar:home-hospital-bold" },
    { id: 3, label: "BPJS Ketenagakerjaan", icon: "solar:case-minimalistic-bold" },
    { id: 4, label: "Surat Keterangan Magang", icon: "solar:document-text-bold" },
  ];

  const requirements = [
    "Harus kelahiran atau berdomisili atau lulusan perguruan tinggi Riau untuk lokasi magang di Provinsi Riau",
    "Kelahiran, domisili dan asal perguruan tinggi tidak dibatasi untuk lokasi magang di Provinsi DKI Jakarta",
    "Sudah lulus D3/D4/S1 (tidak ada batasan umur)",
    "Memiliki Ijazah/SKL (Surat Keterangan Lulus)",
    "Memiliki IPK minimal 3.00 (untuk lulusan luar)",
    "Lulusan perguruan tinggi dengan minimal akreditasi B atau Baik Sekali",
    "Lulusan program studi yang sesuai dengan formasi yang dibutuhkan",
    "Bersedia ditempatkan diseluruh wilayah kerja PT. Pertamina Hulu Rokan, sesuai lokasi magang yang dipilih (Riau/Jakarta)",
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* 🛠️ MODIFIKASI 1: Mengubah lg:items-start menjadi lg:items-stretch agar tinggi kolom kiri & kanan sama rata */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch">
          
          {/* KOLOM KIRI: TENTANG & BENEFIT */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
            <div>
              <h2 className="text-2xl font-bold text-sky-900 lg:text-3xl">
                Tentang Program
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-slate-500 text-justify">
                Program ini bertujuan untuk memberikan pengalaman kerja kepada
                para mahasiswa aktif D3/D4/S1 perguruan tinggi. Hal ini merupakan wujud kepedulian
                Perusahaan terhadap mahasiswa pendidikan tinggi untuk dapat membangun kompetensi, 
                memperluas wawasan dan mendapatkan pengalaman nyata di dunia kerja.
              </p>
            </div>

            {/* Gambar Banner Utama */}
            <div className="relative overflow-hidden rounded-2xl aspect-[2/1] lg:aspect-auto">
              <Image
                src={getDataPath("/images/banner/internship-2.jpg")}
                alt="img"
                width={700}
                height={350}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Kartu Informasi Penting */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 flex gap-4 items-start">
              <Icon
                icon="solar:chat-square-warning-bold"
                className="text-amber-500 text-3xl shrink-0 mt-0.5"
              />
              <div>
                <h4 className="font-bold text-slate-800 text-[15px]">
                  Informasi Penting
                </h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Proses rekrutmen/pendaftaran program hanya dilakukan melalui
                  website resmi{" "}
                  <a href="https://intera-ashy.vercel.app/" className="text-red-600 font-semibold hover:underline">
                    intera.id
                  </a>{" "}
                  dan tanpa dipungut biaya.
                </p>
              </div>
            </div>

            {/* Bagian Benefit Program */}
            <div className="mt-2">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                Benefit Program
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.id}
                    className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 rounded-xl bg-sky-600 p-4 text-white hover:bg-sky-700 transition"
                  >
                    <Icon icon={benefit.icon} className="text-2xl shrink-0" />
                    <span className="text-xs font-semibold leading-tight text-center sm:text-left">
                      {benefit.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: KETENTUAN PENDAFTARAN (TIMELINE STYLE) */}
          {/* 🛠️ MODIFIKASI 2: Menambahkan h-full agar card abu-abu mengikuti tinggi grid, menggunakan flex flex-col */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-100 bg-slate-50/50 p-6 lg:p-8 h-full flex flex-col">
            <div className="shrink-0">
              <h3 className="relative text-lg font-bold text-sky-800 pb-2 inline-block">
                Ketentuan Pendaftaran
                <span className="absolute bottom-0 left-0 h-0.5 w-24 bg-amber-400" />
              </h3>
            </div>

            {/* Wrapper Lini Masa */}
            {/* 🛠️ MODIFIKASI 3: Menggunakan flex-1 untuk menghabiskan sisa space yang kosong secara presisi */}
            <div className="mt-8 relative flex-1 flex flex-col justify-between">
              {/* Garis Vertikal Putus-putus Tengah */}
              <div className="absolute left-[13px] top-3 bottom-3 w-px border-l-2 border-dashed border-amber-400 z-0" />

              {requirements.map((req, index) => (
                <div key={index} className="relative z-10 flex gap-5 pb-4 last:pb-0 items-start">
                  {/* Penanda Lingkaran Centang */}
                  <div className="bg-slate-50 rounded-full p-0.5 shrink-0 shadow-sm">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="text-amber-500 text-2xl"
                    />
                  </div>

                  {/* Konten Teks & Tombol Khusus */}
                  <div className="flex flex-col gap-2 pt-0.5 w-full">
                    <p className="text-[13px] font-medium leading-relaxed text-slate-600">
                      {req}
                    </p>
                    
                    {/* Sisipkan Tombol Formasi setelah poin ke-7 (index 6) */}
                    {index === 6 && (
                      <button className="w-fit mt-1 rounded-lg bg-amber-500 px-5 py-2 text-xs font-bold text-white hover:bg-amber-600 transition shadow-sm">
                        Lihat formasi
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}