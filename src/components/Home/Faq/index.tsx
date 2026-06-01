"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQ() {
  // State untuk menyimpan ID faq yang sedang terbuka (null berarti semuanya tertutup)
  const [openId, setOpenId] = useState<number | null>(1); // Default membuka item pertama

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Berapa lama program magang ini dilaksanakan?",
      answer: "Pendaftar yang dinyatakan lolos akan mengikuti program magang secara intensif selama kurang lebih 6 bulan penuh dengan evaluasi berkala.",
    },
    {
      id: 2,
      question: "Apakah pendaftar boleh mahasiswa aktif / belum lulus?",
      answer: "Program ini dikhususkan untuk lulusan D3/D4/S1 (Fresh Graduate) yang sudah memiliki Ijazah atau minimal Surat Keterangan Lulus (SKL) saat pendaftaran dibuka.",
    },
    {
      id: 3,
      question: "Apakah ada batasan usia pendaftaran?",
      answer: "Tidak ada batasan usia asalkan pelamar memenuhi kualifikasi strata pendidikan minimum dan persyaratan berkas yang ditentukan.",
    },
    {
      id: 4,
      question: "Dimana saja wilayah magang dilaksanakan?",
      answer: "Pelaksanaan magang bertempat di wilayah operasional kerja perusahaan, yang terbagi dalam kluster Provinsi Riau dan kluster Provinsi DKI Jakarta.",
    },
    {
      id: 5,
      question: "Apakah pendaftar dapat memilih lokasi penempatan magang?",
      answer: "Ya, pelamar dapat memilih lokasi penempatan magang yang diinginkan pada saat mengisi formulir pendaftaran berdasarkan formasi lowongan yang tersedia.",
    },
    {
      id: 6,
      question: "Kenapa ada pembagian wilayah magang Riau dan DKI Jakarta?",
      answer: "Pembagian ini disesuaikan dengan kebutuhan formasi divisi operasional lapangan di Riau (teknis & eksplorasi) dan kebutuhan kantor pusat di DKI Jakarta (administrasi & strategis).",
    },
  ];

  const toggleFAQ = (id: number) => {
    // Jika item yang sama diklik, tutup item tersebut. Jika diklik item lain, buka item baru dan otomatis tutup yang lama.
    setOpenId(openId === id ? null : id);
  };

  return (
    // ID disesuaikan menjadi "faq" agar sinkron dengan smooth scroll Header
    <section id="faq" className="py-20 bg-slate-50/50 scroll-mt-16">
      <div className="mx-auto max-w-4xl px-6">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            PERTANYAAN UMUM
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 h-1 w-20 bg-amber-400 mx-auto rounded-full" />
        </div>

        {/* ACCORDION LIST */}
        <div className="flex flex-col gap-4">
          {faqData.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`w-full rounded-xl border transition-all duration-300 bg-white overflow-hidden
                  ${isOpen 
                    ? "border-sky-500 shadow-sm shadow-sky-500/10" 
                    : "border-slate-200/80 hover:border-slate-300"
                  }`}
              >
                {/* TOMBOL PERTANYAAN */}
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4 cursor-pointer group"
                >
                  <span className={`text-[15px] font-semibold tracking-wide transition-colors duration-200
                    ${isOpen ? "text-sky-900" : "text-slate-800 group-hover:text-sky-900"}`}>
                    {item.question}
                  </span>
                  
                  {/* Icon Indikator Panah yang Berputar */}
                  <div className={`p-1.5 rounded-lg transition-all duration-300 shrink-0
                    ${isOpen ? "bg-sky-50 text-sky-600 rotate-180" : "bg-slate-50 text-slate-400"}`}>
                    <Icon
                      icon="solar:alt-arrow-down-linear"
                      className="text-lg font-bold"
                    />
                  </div>
                </button>

                {/* WRAPPER JAWABAN (DENGAN ANIMASI TRANSISI GRID) */}
                <div
                  className={`grid transition-all duration-300 ease-in-out
                    ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100/70">
                      <p className="text-[13px] leading-relaxed text-slate-500 text-justify">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}