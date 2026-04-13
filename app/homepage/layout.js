"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/Components/Sidebar";

export default function HomeLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/loginpage");
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="h-full">
        <Sidebar />
      </div>

      {/* Dynamic Content */}
      <div className="flex-1 h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}