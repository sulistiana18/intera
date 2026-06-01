"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/");
        return;
      }

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">

      {/* SIDEBAR FIXED */}
      <Sidebar />

      {/* CONTENT WRAPPER (INI KUNCI FIX) */}
      <div className="ml-64 flex flex-col min-h-screen">

        {/* TOPBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="flex-1 px-6 py-6">
          {children}
        </main>

      </div>
    </div>
  );
}