"use client";

import { Icon } from "@iconify/react";

export default function SelectionSteps() {
  const steps = [
    {
      step: "01",
      title: "Administrasi",
      desc: "Validasi berkas kelengkapan, kesesuaian jurusan, IPK minimum, serta dokumen pendukung yang diunggah pelamar.",
      icon: "solar:document-text-bold-duotone",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      step: "02",
      title: "Tes Kompetensi",
      desc: "Ujian berbasis komputer (CBT) untuk mengukur kemampuan teknis sesuai bidang formasi dan potensi akademik.",
      icon: "solar:laptop-minimalistic-bold-duotone",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      step: "03",
      title: "Wawancara",
      desc: "Eksplorasi mendalam mengenai kecocokan budaya kerja, motivasi, serta konfirmasi kompetensi teknis bersama user.",
      icon: "solar:users-group-two-rounded-bold-duotone",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      step: "04",
      title: "Medical Check-Up",
      desc: "Pemeriksaan kesehatan menyeluruh untuk memastikan kondisi fisik prima sebelum memulai program magang.",
      icon: "solar:heart-pulse-bold-duotone",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    // 💡 ID disesuaikan menjadi "seleksi" agar sinkron dengan fungsi smooth scroll Header
    <section id="seleksi" className="py-20 bg-slate-50 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            ALUR SELEKSI
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Tahapan Seleksi Program
          </h2>
          <p className="mt-4 text-base text-slate-500 leading-relaxed">
            Kenali rangkaian proses evaluasi untuk bergabung dalam program Internship & Research. Pastikan Anda mempersiapkan diri di setiap fasenya.
          </p>
        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
          
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative group bg-white border border-slate-200/80 rounded-2xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Garis Penghubung Alur (Hanya muncul di desktop/layar besar dan bukan di kartu terakhir) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px border-t-2 border-dashed border-slate-300 z-10 translate-y-[-20px]" />
              )}

              <div>
                {/* BARIS ATAS CARD: NOMOR & ICON */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-extrabold text-slate-200/80 tracking-tight select-none group-hover:text-slate-300 transition-colors">
                    {item.step}
                  </span>
                  
                  <div className={`p-3 rounded-xl ${item.bgColor} ${item.color} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon icon={item.icon} className="text-3xl" />
                  </div>
                </div>

                {/* JUDUL DAN DESKRIPSI TAHAPAN */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-950 transition-colors">
                  {item.title}
                </h3>
                
                <p className="mt-3 text-[13px] leading-relaxed text-slate-500 text-justify">
                  {item.desc}
                </p>
              </div>

              {/* INDIKATOR PANEL BAWAH KARTU */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
                <span>Tahap Ke-{index + 1}</span>
                <Icon
                  icon="solar:arrow-right-linear"
                  className="text-base opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                />
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}