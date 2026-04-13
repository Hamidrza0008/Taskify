"use client"
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const handleToggle = () => {
    document.documentElement.classList.toggle("dark");

    const isDarkNow = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDarkNow);

    localStorage.setItem("theme", isDarkNow ? "dark" : "light");
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 dark:hover:bg-gray-800 hover:text-slate-800 dark:hover:text-white transition-all"
    >
      <div className="flex items-center gap-3">
        {isDarkMode ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} />}
        <span className="font-bold text-[13.5px]">
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </span>
      </div>

      <div className={`w-8 h-4 rounded-full ${isDarkMode ? "bg-amber-100" : "bg-slate-200"}`}>
        <motion.div
          animate={{ x: isDarkMode ? 16 : 2 }}
          className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-amber-500" : "bg-slate-400"}`}
        />
      </div>
    </button>
  );
}