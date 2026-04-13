"use client"
import { useRouter } from "next/navigation";
import { Plus, ChevronRight, CalendarDays } from "lucide-react"; 
import { motion } from "framer-motion"; // Animation ke liye

const TaskHeader = ({ selectedDate }) => {
  const router = useRouter();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Date ko thoda sundar format mein dikhane ke liye (e.g., April 13)
  const displayDate = selectedDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between  px-2 py-1"
    >
      {/* Title & Date Section */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 group cursor-pointer">
          <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">
            Today's Tasks
          </h2>
          <motion.div
            whileHover={{ x: 3 }}
            className="text-blue-500"
          >
            <ChevronRight size={22} strokeWidth={3} />
          </motion.div>
        </div>
        
        {/* Chota Date Indicator */}
        <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[11px] uppercase tracking-[0.15em] ml-0.5">
          <CalendarDays size={12} className="text-blue-400" />
          <span>{displayDate}</span>
        </div>
      </div>

      {/* Action Button (Premium Glow Effect) */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => router.push(`/homepage/addtaskpage?date=${formatDate(selectedDate)}`)}
        className="relative group overflow-hidden bg-[#3B82F6] text-white pl-3 pr-6 py-2.5 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all"
      >
        {/* Button Background Shine Animation */}
        <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 ease-in-out" />
        
        <div className="bg-white/20 rounded-lg p-1">
          <Plus size={18} strokeWidth={3} />
        </div>
        <span className="tracking-tight">New Task</span>
      </motion.button>
    </motion.div>
  );
};

export default TaskHeader;