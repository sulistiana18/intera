"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import DashboardLayout from "@/components/DashboardLayout/Layout";

export default function DashboardPage() {
  useEffect(() => {
    const syncProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      // cek apakah profile sudah ada
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      // kalau belum ada → insert ke profiles
      if (!profile) {
        await supabase.from("profiles").insert({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || "",
          role: "mahasiswa",
          is_completed: false,
        });
      }
    };

    syncProfile();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">
        Welcome to Intera 🚀
      </h1>

      <p className="text-gray-600 mt-2">
        Ini dashboard utama mahasiswa
      </p>
    </DashboardLayout>
  );
}