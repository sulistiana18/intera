"use client";

import { getDataPath } from "@/utils/util";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const getMonthName = (month: number) => {
  const months = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December",
  ];

  return months[month - 1];
};

const getNextBatch = (batches: any[]) => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;

  const sorted = [...batches]
    .filter((b) => b.startMonth >= currentMonth)
    .sort((a, b) => a.startMonth - b.startMonth);

  return sorted[0] || batches[0];
};

const getCloseDate = (startMonth: number) => {
  const year = new Date().getFullYear();
  return new Date(year, startMonth - 1, 0);
};

const getDaysLeft = (targetDate: Date) => {
  const now = new Date().getTime();
  const diff = targetDate.getTime() - now;

  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

export default function Hero() {
  const [batch, setBatch] = useState<any>(null);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchBatch = async () => {
      const res = await fetch(getDataPath("/data/batch-data.json"));
      const data = await res.json();

      const next = getNextBatch(data);
      const closeDate = getCloseDate(next.startMonth);

      setBatch(next);

      const update = () => {
        setDaysLeft(getDaysLeft(closeDate));
      };

      update();
      interval = setInterval(update, 1000 * 60 * 60);
    };

    fetchBatch();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/5 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-0 lg:pt-0">

        {/* MOBILE */}
        <div className="flex flex-col gap-10 lg:hidden">

          <div className="flex justify-center">
            <Image
              src={getDataPath("/images/banner/intera-v2.gif")}
              alt="Intera Hero"
              width={320}
              height={220}
              priority
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
              INTERA PROGRAM
            </p>

            <h1 className="mt-3 text-[34px] leading-[1.1] font-bold text-slate-900">
              Internship &
              <br />
              Research Program
            </h1>

            <p className="mt-3 text-base font-medium text-slate-600">
              PT Corporate Name
            </p>

            <p className="mt-5 text-[15px] leading-7 text-slate-500">
              Gain real industry experience and build your future career
              through internship and research opportunities.
            </p>

            {/* 🛠️ MOBILE WARNING CARD */}
            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                  <Icon
                    icon="solar:danger-triangle-bold"
                    className="text-amber-600 text-xl"
                  />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-amber-600/80 font-medium">
                      Next Batch
                    </p>
                    <p className="font-semibold text-[15px] text-amber-900">
                      {batch && getMonthName(batch.startMonth)}
                    </p>
                  </div>
                </div>

                <div className="w-px h-10 bg-amber-200" />

                <div className="flex items-center gap-3">
                  <Icon
                    icon="solar:clock-circle-bold"
                    className="text-amber-700 text-xl"
                  />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-amber-600/80 font-medium">
                      Registration
                    </p>
                    <p className="font-bold text-[15px] text-amber-700">
                      {daysLeft !== null ? `${daysLeft} Days Left` : "-"}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:grid grid-cols-12 items-center gap-12 py-12">

          {/* LEFT */}
          <div className="col-span-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              INTERA PROGRAM
            </p>

            <h1 className="mt-4 text-[58px] leading-[1.05] font-bold text-slate-900">
              Internship &
              <br />
              Research Program
            </h1>

            <p className="mt-4 text-xl font-medium text-slate-600">
              PT Corporate Name
            </p>

            <p className="mt-6 max-w-xl text-[15px] leading-8 text-slate-500">
              Gain real industry experience, contribute to meaningful
              projects, and develop professional competencies through
              internship and research programs designed to prepare
              future talents.
            </p>

            {/* 🛠️ DESKTOP WARNING CARD */}
            <div className="mt-10 inline-flex">
              <div className="inline-flex items-center gap-8 rounded-xl border border-amber-200 bg-amber-50 px-6 py-4 shadow-sm">

                <div className="flex items-center gap-3">
                  <Icon
                    icon="solar:danger-triangle-bold"
                    className="text-amber-600 text-2xl animate-pulse"
                  />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-amber-600/80 font-semibold">
                      Next Batch
                    </p>
                    <p className="font-bold text-[15px] text-amber-900">
                      {batch?.name}{" "}
                      <span className="text-amber-700/80 font-normal ml-1">
                        ({batch && getMonthName(batch.startMonth)})
                      </span>
                    </p>
                  </div>
                </div>

                <div className="w-px h-10 bg-amber-200" />

                <div className="flex items-center gap-3">
                  <Icon
                    icon="solar:clock-circle-bold"
                    className="text-amber-700 text-2xl"
                  />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-amber-600/80 font-semibold">
                      Registration
                    </p>
                    <p className="font-bold text-[15px] text-amber-700 animate-pulse">
                      {daysLeft !== null ? `${daysLeft} Days Left` : "-"}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="col-span-6 flex justify-center">
            <Image
              src={getDataPath("/images/banner/intera-v2.gif")}
              alt="Intera Hero"
              width={650}
              height={450}
              priority
            />
          </div>

        </div>

      </div>
    </section>
  );
}