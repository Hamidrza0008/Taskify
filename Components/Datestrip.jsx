"use client";
import { motion } from "framer-motion";

const DateStrip = ({ selectedDate = new Date(), setSelectedDate }) => {
  
  // Dates generate karne ka logic
  const getDates = () => {
    const dates = [];
    // Aaj ki date ke as-paas 7 din
    for (let i = -3; i <= 3; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const dates = getDates();

  return (
    
    <div className="w-full max-w-2xl mx-auto px-1">
      
      <div className="bg-white/80 backdrop-blur-md p-2 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex justify-between items-center gap-2">
        {dates.map((date, i) => {
          const isActive = date.toDateString() === selectedDate.toDateString();
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <button
              key={i}
              onClick={() => setSelectedDate(date)}
              className="relative flex-1 group"
            >
              {/* Active Background Animation */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-[#1E293B] rounded-[18px] shadow-lg shadow-slate-200"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center py-3">
                {/* Day Name */}
                <span className={`text-[9px] font-black uppercase tracking-[0.1em] mb-1.5 transition-colors duration-300
                  ${isActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-600"}`}>
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                
                {/* Date Number */}
                <span className={`text-base font-black transition-colors duration-300 tracking-tighter
                  ${isActive ? "text-white" : "text-slate-800 group-hover:text-blue-500"}`}>
                  {date.getDate()}
                </span>

                {/* Status Dots */}
                <div className="h-1.5 flex items-center justify-center mt-1">
                  {isToday && !isActive && (
                    <motion.div 
                      layoutId="today-dot"
                      className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                    />
                  )}
                  {isActive && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-1 h-1 bg-blue-400 rounded-full"
                    />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DateStrip;