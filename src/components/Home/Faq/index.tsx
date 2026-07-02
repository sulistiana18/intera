"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { useAuthStore } from "@/store/useAuthStore"; // 💡 Integrasi store untuk CTA banner

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQ() {
  // State untuk menyimpan ID faq yang sedang terbuka (null berarti semuanya tertutup)
  const [openId, setOpenId] = useState<number | null>(1); // Default membuka item pertama
  const { user, openSignIn } = useAuthStore(); // 🐻 Baca state auth untuk tombol daftar

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Berapa lama program kerja praktek ini dilaksanakan?",
      answer: "Pendaftar yang dinyatakan lolos akan mengikuti program kerja praktek selama kurang lebih 2 bulan penuh.",
    },
    {
      id: 2,
      question: "Siapa saja yang boleh mendaftar program kerja praktek?",
      answer: "Program ini dikhususkan bagi mahasiswa aktif jenjang D3, D4, atau S1 minimal semester 5 dari perguruan tinggi yang terakreditasi.",
    },
    {
      id: 3,
      question: "Apa saja tipe program yang tersedia di Intera?",
      answer: "Intera menyediakan 2 tipe program kerja praktek dan penelitian tugas akhir.",
    },
    {
      id: 4,
      question: "Apa itu kerja praktek?",
      answer: "Kerja praktek adalah salah satu bentuk kegiatan praktik industri yang memberikan kesempatan untuk mendapatkan pengalaman kerja, berkarya, dan berperan aktif dalam project yang diselenggarakan oleh perusahaan.",
    },
    {
      id: 5,
      question: "Apakah itu Penelitian Tugas Akhir?",
      answer: "Penelitian Tugas Akhir adalah kegiatan penelitian yang dilakukan oleh mahasiswa untuk menyelesaikan tugas akhir mereka, biasanya dalam bentuk skripsi atau thesis.",
    },
    {
      id: 6,
      question: "Kapan saja periode Kerja Praktek berlangsung?",
      answer: "Periode Kerja Praktek biasanya berlangsung 4 kali dalam 1 tahun, yaitu pada bulan Januari-Februari, April-Mei, Juli-Agustus, dan Oktober-November. Pendaftar dapat memilih periode yang sesuai dengan jadwal akademik mereka.",
    },
    // 🛠️ TAMBAHAN ITEM BARU DARI GAMBAR BARU:
    {
      // pertanyaan apakah boleh mendaftar lebih dari1 kali
      id: 7,
      question: "Apakah pelamar dapat mendaftar lebih dari satu periode?",
      answer: "Setiap pelamar hanya dapat mendaftar untuk satu periode dalam satu waktu. Namun, jika Anda belum berhasil atau gagal lolos pada periode sebelumnya, Anda diperbolehkan untuk mendaftar kembali di periode selanjutnya.",
    },
    {
      id: 8,
      question: "Apakah satu orang dapat mendaftar lebih dari satu kali dalam 1 periode pendaftaran yang sama?",
      answer: "Setiap pelamar hanya diperbolehkan mendaftar untuk 1 posisi formasi jabatan saja dalam satu periode gelombang rekrutmen yang aktif.",
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
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

                {/* WRAPPER JAWABAN */}
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

        {/* 🛠️ TAMBAHAN CTA BANNER KUNING DI BAGIAN BAWAH */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-amber-400 to-amber-500 p-8 md:p-10 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Aksen Hiasan Belakang */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-black text-slate-100 tracking-tight">
              Ayo tunggu apa lagi?
            </h3>
            <p className="text-sm md:text-base font-bold text-slate-800 mt-1">
              Raih kesempatan kerja praktek di Perusahaan Ternama
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            {user ? (
              <button
                onClick={() => alert("Membuka formulir pendaftaran program...")}
                className="flex items-center gap-2 px-6 py-3 text-xs md:text-sm font-bold text-white bg-sky-600 rounded-xl hover:bg-sky-700 transition-all shadow-md cursor-pointer group"
              >
                Daftar Program Sekarang
                <Icon icon="solar:arrow-right-linear" className="text-base transition-transform group-hover:translate-x-1" />
              </button>
            ) : (
              <button
                onClick={openSignIn}
                className="flex items-center gap-2 px-6 py-3 text-xs md:text-sm font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-md cursor-pointer group"
              >
                Daftar Program Sekarang
                <Icon icon="solar:arrow-right-linear" className="text-base transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}