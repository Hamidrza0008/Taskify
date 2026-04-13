"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion"; // Consistency ke liye animations add kiye hain
import {
  LayoutDashboard,
  ClipboardList,
  CheckCircle2,
  LogOut,
  Moon,
  Sun,
  User,
} from "lucide-react";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setUserEmail(decoded.email.split("@")[0]);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Yahan tum apna dark mode logic (document.documentElement.classList.add('dark')) add kar sakte ho
  };

  const isActive = (path) => pathname === path;

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-100 p-5 flex flex-col transition-all duration-300">
      
      {/* 1. LOGO SECTION */}
      <div className="flex items-center gap-3 mb-10 px-2 pt-2">
        <motion.div 
          whileHover={{ rotate: 10 }}
          className="bg-[#3B82F6] p-2 rounded-xl shadow-lg shadow-blue-100"
        >
          <CheckCircle2 size={18} className="text-white" />
        </motion.div>
        <h1 className="text-xl font-black tracking-tighter text-slate-800 italic leading-none">
          Taskify<span className="text-[#3B82F6]">.</span>
        </h1>
      </div>

      {/* 2. PROFILE SECTION (Sleek & Clean - No Free Plan) */}
      <div className="flex items-center gap-3 px-2 mb-10 group cursor-pointer hover:bg-slate-50 p-2 rounded-2xl transition-all">
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
          <div className="w-full h-full bg-blue-100 flex items-center justify-center text-[#3B82F6] font-black text-sm">
            {userEmail ? userEmail[0].toUpperCase() : <User size={16} />}
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="font-bold text-[14px] text-slate-800 truncate">
            {userEmail || "Guest User"}
          </p>
          <p className="text-[10px] font-bold text-green-500 uppercase tracking-tight">Online</p>
        </div>
      </div>

      {/* 3. NAVIGATION */}
      <div className="flex flex-col gap-1.5 flex-1">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[2px] mb-3 px-3">Main Menu</p>

        {/* DAILY PLANNER */}
        <button
          onClick={() => router.push("/homepage")}
          className={`group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200
          ${isActive("/homepage")
              ? "bg-[#3B82F6] text-white shadow-xl shadow-blue-100 scale-[0.98]"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
        >
          <LayoutDashboard size={18} />
          <span className="font-bold text-[13.5px]">Daily Planner</span>
        </button>

        {/* TASK LIBRARY */}
        <button
          onClick={() => router.push("/homepage/alltaskpage")}
          className={`group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200
          ${isActive("/homepage/alltaskpage")
              ? "bg-[#3B82F6] text-white shadow-xl shadow-blue-100 scale-[0.98]"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
        >
          <ClipboardList size={18} />
          <span className="font-bold text-[13.5px]">Task Library</span>
        </button>

        {/* DARK MODE TOGGLE (Settings ki jagah) */}
        {/* <button 
          onClick={toggleDarkMode}
          className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all group"
        >
          <div className="flex items-center gap-3">
            {isDarkMode ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} />}
            <span className="font-bold text-[13.5px]">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </div>
          <div className={`w-8 h-4 rounded-full relative transition-colors ${isDarkMode ? 'bg-amber-100' : 'bg-slate-200'}`}>
             <motion.div 
              animate={{ x: isDarkMode ? 16 : 2 }}
              className={`absolute top-1 w-2 h-2 rounded-full ${isDarkMode ? 'bg-amber-500' : 'bg-slate-400'}`} 
             />
          </div>
        </button> */}
      </div>

      {/* 4. LOGOUT */}
      <div className="pt-4 border-t border-slate-50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-slate-400 font-bold text-[13.5px] hover:bg-red-50 hover:text-red-500 transition-all group"
        >
          <LogOut size={17} className="group-hover:-translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;