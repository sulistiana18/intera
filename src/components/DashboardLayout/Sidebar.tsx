"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  History,
  User,
  Settings,
  Shield,
} from "lucide-react";

/* ================= TYPES ================= */
type MenuItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

export default function Sidebar() {
  const pathname = usePathname();

  /* ================= MENU MAHASISWA ================= */
  const mahasiswaMenu: MenuItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Program", href: "/dashboard", icon: FileText },
    { label: "Pengajuan Saya", href: "/dashboard", icon: History },
    { label: "Profile", href: "/dashboard", icon: User },
  ];

  /* ================= MENU ADMIN ================= */
  const adminMenu: MenuItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Pengguna", href: "/dashboard", icon: Settings },
    { label: "Program", href: "/dashboard", icon: FileText },
    { label: "Pengajuan", href: "/dashboard", icon: History },
    { label: "Laporan", href: "/dashboard", icon: Shield },
  ];

  /* ================= RENDER MENU ================= */
  const renderMenu = (menu: MenuItem[]) =>
    menu.map((item) => {
      const isActive = pathname === item.href;
      const Icon = item.icon;

      return (
        <Link
          key={item.href}
          href={item.href}
          className={`
            relative flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
            transition-colors duration-200

            ${
              isActive
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }
          `}
        >
          {/* ACTIVE INDICATOR */}
          <span
            className={`
              absolute left-0 top-0 bottom-0 w-[4px]
              ${isActive ? "bg-white" : "bg-transparent"}
            `}
          />

          {/* ICON */}
          <Icon size={18} />

          {/* LABEL */}
          <span>{item.label}</span>
        </Link>
      );
    });

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-white border-r border-slate-200 flex flex-col">

      {/* HEADER */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <div>
          <h1 className="text-sm font-bold text-slate-900">
            INTERA SYSTEM
          </h1>
          <p className="text-[11px] text-slate-500">
            Internship Management
          </p>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-3 py-4 space-y-6">

        {/* MAHASISWA */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
            Mahasiswa
          </p>
          <div className="space-y-1">
            {renderMenu(mahasiswaMenu)}
          </div>
        </div>

        {/* ADMIN */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
            Admin
          </p>
          <div className="space-y-1">
            {renderMenu(adminMenu)}
          </div>
        </div>

      </nav>

      {/* FOOTER */}
      <div className="px-6 py-4 border-t border-slate-200">
        <p className="text-[11px] text-slate-500">
          Internal system access
        </p>
      </div>

    </aside>
  );
}