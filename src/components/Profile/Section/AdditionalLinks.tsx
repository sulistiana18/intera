"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

type LinkItem = {
  id: number;
  type: string;
  label: string;
  url: string;
};

export default function AdditionalLinksSection() {
  const [showModal, setShowModal] = useState(false);

  const [linkType, setLinkType] = useState("Portfolio");
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");

  const [links, setLinks] = useState<LinkItem[]>([]);

  const handleAddLink = () => {
    if (!label.trim() || !url.trim()) {
      alert("Label dan Link wajib diisi");
      return;
    }

    setLinks((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: linkType,
        label,
        url,
      },
    ]);

    setLabel("");
    setUrl("");
    setLinkType("Portfolio");
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setLinks((prev) => prev.filter((item) => item.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "LinkedIn":
        return "logos:linkedin-icon";
      case "GitHub":
        return "logos:github-icon";
      case "Twitter/X":
        return "ri:twitter-x-fill";
      case "Portfolio":
        return "solar:global-linear";
      default:
        return "solar:link-bold";
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Icon
              icon="solar:link-bold"
              className="text-blue-900 text-base"
            />
            Tautan Tambahan / Jejaring Sosial
          </h3>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800 transition cursor-pointer"
          >
            <Icon icon="solar:add-circle-bold" className="text-base" />
            Add Link
          </button>
        </div>

        {/* EMPTY STATE */}
        {links.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
            <Icon
              icon="solar:link-bold"
              className="mx-auto text-4xl text-slate-300"
            />

            <p className="mt-3 text-sm font-medium text-slate-500">
              Belum ada tautan tambahan
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Tambahkan LinkedIn, GitHub, Portfolio, atau tautan lainnya.
            </p>
          </div>
        )}

        {/* LIST LINKS */}
        <div className="space-y-3">
          {links.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 p-4 hover:border-blue-200 hover:bg-blue-50/30 transition"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                  <Icon
                    icon={getIcon(item.type)}
                    className="text-lg"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-800">
                    {item.label}
                  </p>

                  <p className="text-xs text-slate-500">
                    {item.type}
                  </p>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline break-all"
                  >
                    {item.url}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition cursor-pointer"
              >
                <Icon
                  icon="solar:trash-bin-trash-bold"
                  className="text-lg"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200">
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h4 className="font-bold text-slate-800">
                Tambah Tautan
              </h4>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 hover:bg-slate-100 transition"
              >
                <Icon
                  icon="solar:close-circle-bold"
                  className="text-xl text-slate-500"
                />
              </button>
            </div>

            {/* BODY */}
            <div className="space-y-5 p-6">
              {/* TYPE */}
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Jenis Tautan
                </label>

                <select
                  value={linkType}
                  onChange={(e) => setLinkType(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-900"
                >
                  <option>Portfolio</option>
                  <option>LinkedIn</option>
                  <option>GitHub</option>
                  <option>Twitter/X</option>
                  <option>Lainnya</option>
                </select>
              </div>

              {/* LABEL */}
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Label
                </label>

                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Contoh: Portfolio UI/UX"
                  className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-900"
                />
              </div>

              {/* URL */}
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Link
                </label>

                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-900"
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
              >
                Batal
              </button>

              <button
                onClick={handleAddLink}
                className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-bold text-white hover:bg-emerald-700 transition"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}