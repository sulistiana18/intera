"use client";

import Logo from "../Logo"; // Pastikan path Logo kamu sesuai
import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    // ID disesuaikan menjadi "kontak" agar sinkron dengan fungsi smooth scroll Header
    <footer id="kontak" className="bg-slate-900 text-slate-300 pt-16 border-t border-slate-800 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-6 pb-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          
          {/* KOLOM 1: LOGO & DESKRIPSI (4 Kolom) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white p-2 rounded-lg inline-block w-fit">
              <Logo />
            </div>
            <h3 className="text-white font-bold text-lg mt-2">
              Work Internship Program
            </h3>
            <p className="text-xs uppercase tracking-wider text-red-500 font-semibold">
              Regional Office – Singapore Sector
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-sm font-semibold text-white">
                Intera Hub Singapore Pte. Ltd.
              </p>
              <p className="text-xs leading-relaxed text-slate-400">
                10 Marina Boulevard, Tower 2, Marina Bay Financial Centre, Singapore 018983
              </p>
            </div>
          </div>

          {/* KOLOM 2: MAPS INTERAKTIF SINGAPURA (4 Kolom) */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
              <Icon icon="solar:map-point-bold-duotone" className="text-amber-500 text-lg" />
              Singapore Office Location
            </h4>
            <div className="w-full h-44 rounded-2xl overflow-hidden border border-slate-700/60 shadow-lg group">
              {/* 🛠️ URL MAPS SUDAH DIGANTI KE MARINA BAY SINGAPURA */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8199222625345!2d103.85150827588383!3d1.2818076617812557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f131!3m3!1m2!1s0x31da190ec60fec7d%3A0x6bba843343ef02cf!2sMarina%20Bay%20Financial%20Centre!5e0!3m2!1sid!2sid!4v1717228800000!5m2!1sid!2sid"
                className="w-full h-full border-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* KOLOM 3: HUBUNGI KAMI CARD (4 Kolom) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm mb-1 flex items-center gap-2">
              <Icon icon="solar:letter-opened-bold-duotone" className="text-sky-500 text-lg" />
              Contact Us
            </h4>
            
            {/* Kartu Telepon (Kode Negara Singapura +65) */}
            <a 
              href="tel:+6285712144624" 
              className="flex items-center gap-4 bg-slate-800/50 border border-slate-700/40 p-4 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition group"
            >
              <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition duration-300">
                <Icon icon="solar:phone-calling-bold" className="text-xl" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Hotline Office</p>
                <p className="text-sm font-semibold text-white mt-0.5">+62 857 1214 4624</p>
              </div>
            </a>

            {/* Kartu Email */}
            <a 
              href="mailto:tianasulis.st@gmail.com" 
              className="flex items-center gap-4 bg-slate-800/50 border border-slate-700/40 p-4 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition group"
            >
              <div className="p-2.5 rounded-lg bg-red-500/10 text-red-400 group-hover:bg-red-500 group-hover:text-white transition duration-300">
                <Icon icon="solar:letter-bold" className="text-xl" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Official Email</p>
                <p className="text-sm font-semibold text-white mt-0.5">hrd@intera.id</p>
              </div>
            </a>
          </div>

        </div>
      </div>

      {/* BOTTOM SECTION: COPYRIGHT */}
      <div className="bg-slate-950 py-6 border-t border-slate-800/50 text-center">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>
            © {new Date().getFullYear()} Intera Hub Singapore. All rights reserved.
          </p>
          <p>
            Developed by{" "}
            <a href="https://sulistiana.site" className="text-amber-500 hover:underline" target="_blank">
              Intera Tech Dev Team
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}