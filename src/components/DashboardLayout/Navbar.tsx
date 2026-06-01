"use client";

import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User, LogOut } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setEmail(user?.email ?? null);
    };

    getUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const segments = pathname.split("/").filter(Boolean);
  let title = segments[segments.length - 1] ?? "Dashboard";
  if (title === "apply") title = "Apply KP";

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 h-16 flex items-center">

      <div className="w-full flex items-center justify-between px-6">

        {/* LEFT */}
        <div className="flex flex-col justify-center leading-tight">
          <div className="text-[11px] text-slate-400">
            Pages / {title}
          </div>
          <div className="text-sm font-semibold text-slate-900">
            {title}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* USER */}
          <div className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-md bg-white">
            <User size={14} className="text-slate-500" />
            <span className="text-xs text-slate-600 max-w-[160px] truncate">
              {email ?? "User"}
            </span>
          </div>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="
              flex items-center gap-2 px-3 py-1.5
              text-xs font-medium
              text-white bg-slate-900
              border border-slate-900
              rounded-md
              hover:bg-white hover:text-slate-900
              transition-colors duration-200
            "
          >
            <LogOut size={14} />
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}