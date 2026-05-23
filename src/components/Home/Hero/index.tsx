"use client";
import { getDataPath, getImgPath } from "@/utils/util";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

/* =========================
   HELPERS
========================= */

const getMonthName = (month: number) => {
  const months = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
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

/* =========================
   COMPONENT
========================= */

const Hero = () => {
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
      id="home-section"
      className="relative overflow-hidden bg-[#FAFBFF]"
    >

      {/* 🌫️ VERY SOFT TOP BLUE AMBIENT (NO HARD GLOW) */}
      <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#0B3D91]/10 blur-[200px]" />

      {/* 🌫️ LEFT MICRO BLUE HINT */}
      <div className="pointer-events-none absolute left-[-150px] top-40 h-[450px] w-[450px] rounded-full bg-[#00A3E0]/8 blur-[180px]" />

      {/* 🌫️ RIGHT MICRO BLUE HINT */}
      <div className="pointer-events-none absolute right-[-150px] top-20 h-[500px] w-[500px] rounded-full bg-[#1E5EFF]/6 blur-[200px]" />

      {/* 🌫️ BOTTOM TRANSITION LAYER (BLENDS TO WHITE PAGE BELOW) */}
      <div className="pointer-events-none absolute bottom-[-250px] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#0B3D91]/5 blur-[220px]" />

      {/* 🌫️ ULTRA SOFT WHITE LIFT (REMOVES HARSH CONTRAST) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[#FAFBFF]" />

      <div className="relative z-10 container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 pt-5">

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10">

          {/* LEFT SIDE */}
          <div className="col-span-6 flex flex-col gap-6">

            {/* TITLE */}
            <h1 className="text-midnight_text text-4xl sm:text-5xl font-semibold leading-tight">
              Join Pertamina Internship & Build Your Future Career
            </h1>

            {/* SUBTITLE */}
            <p className="text-black/70 text-lg">
              Gain real industry experience, learn directly from professionals, and grow your skills in a real working environment.
            </p>

            {/* INFO CARD */}
            <div className="flex">
              <div className="bg-white backdrop-blur-xl border border-white rounded-2xl shadow-[0_20px_60px_rgba(11,61,145,0.10)] px-6 py-5 flex items-center gap-8">

                {/* NEXT BATCH */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#E8F1FF] p-3 rounded-full">
                    <Icon icon="solar:calendar-bold" className="text-[#0B3D91] text-xl" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Next Batch</p>
                    <p className="font-semibold text-black whitespace-nowrap">
                      {batch?.name} ({batch && getMonthName(batch.startMonth)})
                    </p>
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="w-px h-10 bg-gray-200" />

                {/* COUNTDOWN */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#FFECEC] p-3 rounded-full">
                    <Icon icon="solar:clock-circle-bold" className="text-red-500 text-xl" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Registration closes in
                    </p>

                    <p className="font-semibold text-lg text-black whitespace-nowrap blink-urgent">
                      {daysLeft !== null ? `${daysLeft} DAYS LEFT` : "-"}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-6 flex justify-center relative">

            {/* IMAGE GLOW FRAME */}
            <div className="absolute h-[420px] w-[420px] rounded-full bg-[#0B3D91]/20 blur-[120px]" />

            <Image
              src={getDataPath("/images/banner/intera-1.gif")}
              alt="hero image"
              width={600}
              height={400}
              priority
              className="relative z-10 drop-shadow-[0_30px_60px_rgba(11,61,145,0.25)]"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;