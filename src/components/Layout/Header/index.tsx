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
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200">

        <div className="flex items-center justify-between h-16 px-6">

          {/* LOGO */}
          <Logo />

          {/* AUTH BUTTON */}
          <div className="flex items-center gap-2">

            <button
              onClick={() => setIsSignInOpen(true)}
              className="
                flex items-center gap-2 px-4 py-2
                text-sm font-medium
                text-white bg-slate-900
                border border-slate-900
                rounded-md

                hover:bg-white hover:text-slate-900
                transition-colors duration-200
                cursor-pointer
              "
            >
              <Icon icon="ic:round-log-in" className="text-base" />
              Sign In
            </button>

          </div>

        </div>
      </header>

      {/* ================= LOGIN MODAL ================= */}
      {isSignInOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <div
            ref={signInRef}
            className="relative bg-white w-full max-w-md rounded-md border border-slate-200 p-6"
          >
            <button
              onClick={() => setIsSignInOpen(false)}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-900"
            >
              <Icon icon="ic:round-close" className="text-xl" />
            </button>

            <Signin signInOpen={setIsSignInOpen} />
          </div>
        </div>
      )}

      {/* ================= SIGNUP MODAL ================= */}
      {isSignUpOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <div
            ref={signUpRef}
            className="relative bg-white w-full max-w-md rounded-md border border-slate-200 p-6"
          >
            <button
              onClick={() => setIsSignUpOpen(false)}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-900"
            >
              <Icon icon="ic:round-close" className="text-xl" />
            </button>

            <SignUp signUpOpen={setIsSignUpOpen} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;