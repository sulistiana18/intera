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

  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const intervalBlink = setInterval(() => {
      setBlink((prev) => !prev);
    }, 800);

    return () => clearInterval(intervalBlink);
  }, []);

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
      className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFF] to-white"
    >
      <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#0B3D91]/5 blur-[160px]" />

      <div className="relative z-10 container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 pt-5">

        {/* MOBILE */}
        <div className="flex flex-col gap-10 lg:hidden">

          <div className="flex justify-center relative scale-[0.95]">
            <div className="absolute h-[350px] w-[350px] rounded-full bg-[#0B3D91]/10 blur-[100px]" />
            <Image
              src={getDataPath("/images/banner/intera-1.gif")}
              alt="hero image"
              width={600}
              height={400}
              priority
              className="relative z-10 drop-shadow-[0_30px_60px_rgba(11,61,145,0.20)]"
            />
          </div>

          <div className="text-midnight_text flex flex-col gap-6">

            <div>
              <h1 className="text-4xl font-bold tracking-tight leading-[1.05]">
                Pertamina Internship
              </h1>

              <h2 className="text-xl font-semibold text-[#0B3D91] mt-2 tracking-wide">
                Build Your Future Career
              </h2>
            </div>

            <p className="text-black/60 text-lg leading-relaxed">
              Gain real industry experience, learn directly from professionals, and grow your skills in a real working environment.
            </p>

            {/* CARD */}
            <div className="flex items-center gap-6 px-6 py-5 rounded-2xl 
              bg-white/70 backdrop-blur-xl border border-[#0B3D91]/10 
              shadow-[0_20px_60px_rgba(11,61,145,0.08)] w-fit">

              <div className="flex items-center gap-3">
                <div className="bg-[#E8F1FF] p-3 rounded-full">
                  <Icon icon="solar:calendar-bold" className="text-[#0B3D91] text-xl" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Next Batch</p>
                  <p className="font-semibold text-black">
                    {batch?.name} <span className="text-black/60">
                      ({batch && getMonthName(batch.startMonth)})
                    </span>
                  </p>
                </div>
              </div>

              <div className="w-px h-10 bg-gray-200/70" />

              <div className="flex items-center gap-3">
                <div className="bg-[#FFECEC] p-3 rounded-full">
                  <Icon icon="solar:clock-circle-bold" className="text-[#E31E24] text-xl" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Registration closes</p>
                  <p
                    className="font-bold tracking-wide blink-urgent"
                    style={{
                      color: blink ? "#000000" : "#E31E24"
                    }}
                  >
                    {daysLeft !== null ? `${daysLeft} days left` : "-"}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:grid grid-cols-12 items-center gap-10">

          <div className="col-span-6 flex flex-col gap-6">

            <div className="text-midnight_text">
              <h1 className="text-6xl font-bold tracking-tight leading-[1.05]">
                Pertamina Internship
              </h1>

              <h2 className="text-2xl font-semibold text-[#0B3D91] mt-2 tracking-wide">
                Build Your Future Career
              </h2>
            </div>

            <p className="text-black/60 text-lg leading-relaxed max-w-md mt-3">
              Gain real industry experience, learn directly from professionals, and grow your skills in a real working environment.
            </p>

            <div className="mt-6">
              <div className="flex items-center gap-6 px-6 py-5 rounded-2xl 
              bg-white/70 backdrop-blur-xl border border-[#0B3D91]/10 
              shadow-[0_20px_60px_rgba(11,61,145,0.08)] w-fit">

                <div className="flex items-center gap-3">
                  <div className="bg-[#E8F1FF] p-3 rounded-full">
                    <Icon icon="solar:calendar-bold" className="text-[#0B3D91] text-xl" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Next Batch</p>
                    <p className="font-semibold text-black">
                      {batch?.name} <span className="text-black/60">
                        ({batch && getMonthName(batch.startMonth)})
                      </span>
                    </p>
                  </div>
                </div>

                <div className="w-px h-10 bg-gray-200/70" />

                <div className="flex items-center gap-3">
                  <div className="bg-[#FFECEC] p-3 rounded-full">
                    <Icon icon="solar:clock-circle-bold" className="text-[#E31E24] text-xl" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Registration closes</p>
                    <p className="font-bold tracking-wide animate-pulse text-red-600">
                      {daysLeft !== null ? `${daysLeft} days left` : "-"}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div className="col-span-6 flex justify-center relative scale-[0.95]">

            <div className="absolute h-[350px] w-[350px] rounded-full bg-[#0B3D91]/10 blur-[100px]" />

            <Image
              src={getDataPath("/images/banner/intera-1.gif")}
              alt="hero image"
              width={600}
              height={400}
              priority
              className="relative z-10 drop-shadow-[0_30px_60px_rgba(11,61,145,0.20)]"
            />

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;