"use client";

import { useRef, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Logo from "../Logo";
import Signin from "@/components/Auth/SignIn";
import SignUp from "@/components/Auth/SignUp";
import { Icon } from "@iconify/react";
import { useAuthStore } from "@/store/useAuthStore";

import { useRouter } from "next/navigation";

const menus = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "How to Apply", href: "#seleksi" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#kontak" },
  { label: "Certification", href: "/check-certif", external: true },
];

const Header = () => {
  const router = useRouter();

  const {
    isSignInOpen,
    isSignUpOpen,
    user,
    openSignIn,
    closeSignIn,
    closeSignUp,
    logout,
    loginSuccess,
  } = useAuthStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // State baru untuk mengontrol menu burger di HP
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 64; // Potong 64px (tinggi h-16 header)

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false); // Tutup menu mobile setelah klik link
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (signInRef.current && !signInRef.current.contains(event.target as Node)) {
        closeSignIn();
      }
      if (signUpRef.current && !signUpRef.current.contains(event.target as Node)) {
        closeSignUp();
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      // Tutup menu mobile jika klik di luar area menu
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeSignIn, closeSignUp]);

  useEffect(() => {
    const syncSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        loginSuccess(session.user);
      }
    };

    syncSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loginSuccess(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loginSuccess]);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4 lg:gap-12">
            
            {/* Tombol Burger - Hanya muncul di mobile (di bawah ukuran lg) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-slate-700 hover:text-red-700 transition-colors focus:outline-none"
            >
              <Icon 
                icon={isMobileMenuOpen ? "solar:close-square-linear" : "solar:hamburger-menu-linear"} 
                className="text-2xl" 
              />
            </button>

            {/* Logo - hidden di mobile, flex/block di desktop (lg:block) */}
            <div className="hidden lg:block">
              <Logo />
            </div>

            {/* MENU UTAMA (DESKTOP) */}
            <nav className="hidden lg:flex items-center gap-7">
              {menus.map((menu) =>
                menu.external ? (
                  <button
                    key={menu.href}
                    onClick={() => router.push(menu.href)}
                    className="text-[13px] font-medium text-slate-600 hover:text-red-700 transition-colors duration-200 cursor-pointer"
                  >
                    {menu.label}
                  </button>
                ) : (
                  <a
                    key={menu.href}
                    href={menu.href}
                    onClick={(e) => handleScroll(e, menu.href)}
                    className="text-[13px] font-medium text-slate-600 hover:text-red-700 transition-colors duration-200"
                  >
                    {menu.label}
                  </a>
                )
              )}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer select-none"
                >
                  <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <Icon
                    icon="solar:alt-arrow-down-linear"
                    className={`text-xs text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-100 bg-white p-2 shadow-xl z-50">
                    <div className="px-3 py-2 border-b border-slate-50 mb-1">
                      <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Akun Terdaftar</p>
                      <p className="text-xs font-semibold text-slate-700 truncate mt-0.5">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        router.push("/dashboard/profile");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700 rounded-lg transition-colors cursor-pointer"
                    >
                      <Icon icon="solar:user-bold" className="text-base" />
                      Profile
                    </button>

                    <button
                      onClick={(e) => handleScroll(e, "#tentang")}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700 rounded-lg transition-colors cursor-pointer"
                    >
                      <Icon icon="solar:pen-new-square-bold" className="text-base" />
                      Daftar Program kerja praktek
                    </button>

                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700 rounded-lg transition-colors cursor-pointer"
                    >
                      <Icon icon="solar:document-text-bold" className="text-base" />
                      Lamaran Saya
                    </button>

                    <hr className="border-slate-100 my-1" />

                    <button
                      onClick={async () => {
                        await supabase.auth.signOut();
                        logout();
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Icon icon="solar:logout-3-bold" className="text-base" />
                      Keluar Akun
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openSignIn}
                className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white bg-slate-900 border border-slate-900 rounded-md hover:bg-red-500 hover:border-red-500 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <Icon icon="ic:round-log-in" className="text-base" />
                Sign In
              </button>
            )}
          </div>

        </div>

        {/* DROPDOWN MENU MOBILE (Hanya muncul jika di bawah ukuran lg dan burger diklik) */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="lg:hidden bg-white border-b border-slate-200 shadow-lg px-6 py-4 animate-fade-in">
            <nav className="flex flex-col gap-4">
              {menus.map((menu) =>
                menu.external ? (
                  <button
                    key={menu.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push(menu.href);
                    }}
                    className="text-left text-sm font-medium text-slate-600 hover:text-red-700 transition-colors py-1.5"
                  >
                    {menu.label}
                  </button>
                ) : (
                  <a
                    key={menu.href}
                    href={menu.href}
                    onClick={(e) => handleScroll(e, menu.href)}
                    className="text-sm font-medium text-slate-600 hover:text-red-700 transition-colors py-1.5"
                  >
                    {menu.label}
                  </a>
                )
              )}
            </nav>
          </div>
        )}
      </header>

      {/* LOGIN MODAL */}
      {isSignInOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <div ref={signInRef} className="relative bg-white w-full max-w-md rounded-lg border border-slate-200 p-6 shadow-xl">
            <button onClick={closeSignIn} className="absolute top-3 right-3 text-slate-500 hover:text-slate-900">
              <Icon icon="ic:round-close" className="text-xl" />
            </button>
            <Signin signInOpen={closeSignIn} />
          </div>
        </div>
      )}

      {/* SIGNUP MODAL */}
      {isSignUpOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <div ref={signUpRef} className="relative bg-white w-full max-w-md rounded-lg border border-slate-200 p-6 shadow-xl">
            <button onClick={closeSignUp} className="absolute top-3 right-3 text-slate-500 hover:text-slate-900">
              <Icon icon="ic:round-close" className="text-xl" />
            </button>
            <SignUp signUpOpen={closeSignUp} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;