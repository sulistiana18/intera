"use client";

import DashboardLayout from "@/components/DashboardLayout/Layout";
import AvailableProgram from "@/components/Program/AvailableProgram";

export default function ProgramPage() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-6">
        <AvailableProgram />
      </div>
    </DashboardLayout>
  );
}