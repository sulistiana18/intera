"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Icon } from "@iconify/react";
import DashboardLayout from "@/components/DashboardLayout/Layout";

// 💡 Import semua sub-section form dari folder Section/
import ProfileSection from "./Section/Profile";
import PengalamanSection from "./Section/Experience";
import PendidikanSection from "./Section/Education";
import SkillsOrgSection from "./Section/SkillsOrg";
import ProjectSection from "./Section/Project";
import TrainingSection from "./Section/Training";
import AdditionalLinksSection from "./Section/AdditionalLinks";

const profileMenus = [
    { id: "profil", label: "Profil", icon: "solar:user-bold" },
    { id: "pengalaman", label: "Pengalaman Kerja", icon: "solar:case-bold" },
    { id: "pendidikan", label: "Pendidikan", icon: "solar:backpack-bold" },
    { id: "keahlian", label: "Keahlian & Organisasi", icon: "solar:star-bold" },
    { id: "proyek", label: "Proyek", icon: "solar:folder-open-bold" },
    { id: "pelatihan", label: "Pelatihan", icon: "solar:document-text-bold" },
    { id: "tautan", label: "Tautan Tambahan", icon: "solar:link-bold" },
];

export default function ProfileHub() {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState("profil");

    // State namaLengkap ditaruh di level Hub agar teks di Banner Atas 
    // ikut berubah secara real-time saat form di dalam ProfileSection diketik
    const [namaLengkap, setNamaLengkap] = useState(
        user?.user_metadata?.full_name ||
        user?.user_metadata?.name ||
        ""
    );

    // Fungsi helper untuk merender form secara dinamis sesuai tab menu yang diklik
    const renderContent = () => {
        switch (activeTab) {
            case "profil":
                return <ProfileSection namaLengkap={namaLengkap} setNamaLengkap={setNamaLengkap} />;
            case "pengalaman":
                return <PengalamanSection />;
            case "pendidikan":
                return <PendidikanSection />;
            case "keahlian":
                return <SkillsOrgSection />;
            case "proyek":
                return <ProjectSection />;
            case "pelatihan":
                return <TrainingSection />;
            case "tautan":
                return <AdditionalLinksSection />;
            default:
                return (
                    /* Tampilan default (Placeholder) untuk tab yang belum dibuatkan file form-nya */
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-sm">
                        <div className="max-w-sm mx-auto py-10 flex flex-col items-center gap-3">
                            <div className="p-4 bg-slate-50 text-slate-400 rounded-full">
                                <Icon icon="solar:folder-open-linear" className="text-4xl" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-700 mt-2 capitalize">Form {activeTab} Eksperimen</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Kamu sedang berada di area simulasi tab menu <b>{activeTab}</b>. Tampilan ini berpindah murni menggunakan React State.
                            </p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-12">

                {/* TOP BANNER PELAMAR */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="shrink-0">
                                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 border-2 border-slate-900 shadow-sm flex items-center justify-center text-white font-black text-2xl">
                                    {namaLengkap.charAt(0).toUpperCase() || "U"}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">{namaLengkap || "Tanpa Nama"}</h2>
                                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                                    <Icon icon="solar:map-point-bold" className="text-slate-400 text-sm" />
                                    <span>Banyumas, Jawa Tengah</span>
                                </div>
                            </div>
                        </div>

                        <div className="shrink-0">
                            <button className="flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-950 transition shadow-sm cursor-pointer">
                                <Icon icon="solar:upload-track-bold" className="text-base" />
                                Upload CV ATS
                            </button>
                        </div>
                    </div>

                    {/* PROGRESS KELENGKAPAN PROFIL */}
                    <div className="mt-6 pt-5 border-t border-slate-100">
                        <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                            <span className="text-emerald-600 flex items-center gap-1">
                                <Icon icon="solar:check-circle-bold" className="text-base" />
                                Kelengkapan Profil
                            </span>
                            <span className="text-emerald-600">100% Sempurna</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full w-full" />
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1.5">Profil Anda sudah lengkap!</p>
                    </div>
                </div>

                {/* PROFILE TAB NAVIGATION MENU */}
                <div className="w-full overflow-x-auto no-scrollbar border-b border-slate-200 bg-white rounded-xl p-1 shadow-sm border flex gap-1">
                    {profileMenus.map((menu) => {
                        const isActive = activeTab === menu.id;
                        return (
                            <button
                                key={menu.id}
                                type="button"
                                onClick={() => setActiveTab(menu.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer
                  ${isActive ? "bg-blue-900 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}
                            >
                                <Icon icon={menu.icon} className="text-sm" />
                                {menu.label}
                            </button>
                        );
                    })}
                </div>

                {/* AREA FORM DINAMIS (Merender isi switch case di atas) */}
                <div>{renderContent()}</div>

            </div>
        </DashboardLayout>
    );
}