"use client";

import { useState, useRef, useEffect } from "react";
import Logo from "../Logo";
import Signin from "@/components/Auth/SignIn";
import SignUp from "@/components/Auth/SignUp";
import { Icon } from "@iconify/react";

const Header = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (signInRef.current && !signInRef.current.contains(event.target as Node)) {
        setIsSignInOpen(false);
      }

      if (signUpRef.current && !signUpRef.current.contains(event.target as Node)) {
        setIsSignUpOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between h-20 px-6 w-full">

          {/* LOGO */}
          <Logo />

          {/* AUTH */}
          <div className="flex items-center gap-2">

            {/* SIGN IN */}
            <button
              onClick={() => setIsSignInOpen(true)}
              className="px-4 py-2 text-sm font-medium rounded-full
              border border-[#0033A0]/50
              text-[#0033A0]
              bg-[#0033A0]/5
              hover:bg-[#0033A0]
              hover:border-[#0033A0]
              hover:text-white
              transition-all duration-200
              shadow-sm
              cursor-pointer"
            >
              Sign In
            </button>

            {/* SIGN UP */}
            <button
              onClick={() => setIsSignUpOpen(true)}
              className="px-4 py-2 text-sm font-medium rounded-full
              bg-gradient-to-r from-[#E31E24] to-[#D50000]
              text-white
              hover:from-[#c91a1f] hover:to-[#b80000]
              transition-all shadow-md hover:shadow-lg
              cursor-pointer
              "
            >
              Sign Up
            </button>

          </div>
        </div>
      </header>

      {/* ================= MODAL LOGIN ================= */}
      {isSignInOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] animate-fadeIn">
          <div
            ref={signInRef}
            className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-xl"
          >
            <button
              onClick={() => setIsSignInOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <Icon icon="ic:round-close" className="text-2xl" />
            </button>

            <Signin signInOpen={setIsSignInOpen} />
          </div>
        </div>
      )}

      {/* ================= MODAL SIGNUP ================= */}
      {isSignUpOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] animate-fadeIn">
          <div
            ref={signUpRef}
            className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-xl"
          >
            <button
              onClick={() => setIsSignUpOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <Icon icon="ic:round-close" className="text-2xl" />
            </button>

            <SignUp signUpOpen={setIsSignUpOpen} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;