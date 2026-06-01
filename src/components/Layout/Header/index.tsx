"use client";

import { useState, useRef, useEffect } from "react";
import Logo from "../Logo";
import Signin from "@/components/Auth/SignIn";
import SignUp from "@/components/Auth/SignUp";
import { Icon } from "@iconify/react";

const menus = [
  { label: "Home", href: "#home" },
  { label: "Tentang", href: "#about" }, // 💡 Pastikan id di komponen About sudah berganti dari "about" ke "tentang"
  { label: "Tahapan Seleksi", href: "#seleksi" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontak", href: "#kontak" },
];

const Header = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);

  // 🛠️ MODIFIKASI 1: Fungsi Handler untuk Smooth Scroll dengan Offset Tinggi Header
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); // Mencegah perilaku lompat instan bawaan browser
    
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    
    if (element) {
      // Mengambil posisi elemen relatif terhadap viewport ditambah posisi gulir saat ini
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      
      // Mengurangi tinggi header (16 = h-16 atau sekitar 64px) agar judul section tidak tertutup navbar fixed
      const offsetPosition = elementPosition - 64; 

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth", // Memberikan transisi bergulir halus
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        signInRef.current &&
        !signInRef.current.contains(event.target as Node)
      ) {
        setIsSignInOpen(false);
      }

      if (
        signUpRef.current &&
        !signUpRef.current.contains(event.target as Node)
      ) {
        setIsSignUpOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-12">
            <Logo />

            {/* MENU */}
            <nav className="hidden lg:flex items-center gap-7">
              {menus.map((menu) => (
                <a
                  key={menu.href}
                  href={menu.href}
                  // 🛠️ MODIFIKASI 2: Pasang event onClick pembaca fungsi handleScroll
                  onClick={(e) => handleScroll(e, menu.href)}
                  className="
                    text-[13px]
                    font-medium
                    text-slate-600
                    hover:text-red-700
                    transition-colors
                    duration-200
                  "
                >
                  {menu.label}
                </a>
              ))}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSignInOpen(true)}
              className="
                flex items-center gap-2
                px-4 py-2
                text-[13px]
                font-medium
                text-white
                bg-slate-900
                border border-slate-900
                rounded-md
                hover:bg-red-500
                hover:text-white
                transition-colors
                duration-200
                cursor-pointer
              "
            >
              <Icon
                icon="ic:round-log-in"
                className="text-base"
              />
              Sign In
            </button>
          </div>

        </div>
      </header>

      {/* LOGIN MODAL */}
      {isSignInOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <div
            ref={signInRef}
            className="
              relative
              bg-white
              w-full
              max-w-md
              rounded-lg
              border
              border-slate-200
              p-6
              shadow-xl
            "
          >
            <button
              onClick={() => setIsSignInOpen(false)}
              className="
                absolute
                top-3
                right-3
                text-slate-500
                hover:text-slate-900
              "
            >
              <Icon
                icon="ic:round-close"
                className="text-xl"
              />
            </button>

            <Signin signInOpen={setIsSignInOpen} />
          </div>
        </div>
      )}

      {/* SIGNUP MODAL */}
      {isSignUpOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <div
            ref={signUpRef}
            className="
              relative
              bg-white
              w-full
              max-w-md
              rounded-lg
              border
              border-slate-200
              p-6
              shadow-xl
            "
          >
            <button
              onClick={() => setIsSignUpOpen(false)}
              className="
                absolute
                top-3
                right-3
                text-slate-500
                hover:text-slate-900
              "
            >
              <Icon
                icon="ic:round-close"
                className="text-xl"
              />
            </button>

            <SignUp signUpOpen={setIsSignUpOpen} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;