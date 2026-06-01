"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  signInOpen?: (value: boolean) => void;
};

const Signin = ({ signInOpen }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingEmail(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoadingEmail(false);

    if (error) {
      console.error("Login error:", error.message);
      return;
    }

    console.log("LOGIN SUCCESS:", data);
    if (signInOpen) signInOpen(false);
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}`,
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Welcome
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to continue to your dashboard
          </p>
        </div>

        {/* GOOGLE LOGIN */}
        <button
          onClick={handleGoogleLogin}
          disabled={loadingGoogle}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 py-2.5 rounded-xl
          hover:bg-gray-50 active:scale-[0.99] transition disabled:opacity-60 cursor-pointer"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">
            {loadingGoogle ? "Connecting..." : "Continue with Google"}
          </span>
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-gray-400">or</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        {/* EMAIL FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-500">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full border border-gray-200 p-3 rounded-xl outline-none
              focus:ring-2 focus:ring-black/10 focus:border-black transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full border border-gray-200 p-3 rounded-xl outline-none
              focus:ring-2 focus:ring-black/10 focus:border-black transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loadingEmail}
            className="w-full bg-black text-white py-3 rounded-xl font-medium
            hover:bg-gray-900 active:scale-[0.99] transition disabled:opacity-60"
          >
            {loadingEmail ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* FOOTER NOTE */}
        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Signin;