"use client";
import { useState, useEffect } from "react";
import {
  Plus,
  ListChecks,
  CheckCircle2,
  Clock,
  ChevronRight,
  Inbox,
  LayoutGrid,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const AllTasksPage = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getData = async () => {
      const t = localStorage.getItem("token");
      const res = await fetch("/api/tasks", {
        headers: { Authorization: `Bearer ${t}` },
      });
      const data = await res.json();
      if (res.ok) setTasks(data);
    };
    getData();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === "done") return task.status === "done";
    if (filter === "pending") return task.status !== "done";
    return true;
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FBFCFE]">
      
      {/* 1. MINIMAL HEADER */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black text-slate-900 tracking-tight italic">
              All <span className="text-blue-500">Tasks</span>
            </h1>
            <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md uppercase tracking-wider">
              {filteredTasks.length}
            </span>
          </div>

          <button
            onClick={() => router.push("/homepage/addtaskpage")}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all shadow-md"
          >
            <Plus size={14} strokeWidth={3} />
            New Task
          </button>
        </div>
      </div>

      <div className="w-full px-6 py-6 space-y-6">
        
        {/* 2. COMPACT CONTROLS */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Minimal Search */}
          <div className="relative w-full sm:max-w-xs group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
            <input 
              type="text"
              placeholder="Filter tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 py-2.5 pl-9 pr-4 rounded-xl outline-none text-xs font-bold text-slate-700 focus:bg-white focus:border-blue-200 transition-all"
            />
          </div>

          {/* Minimal Tabs */}
          <div className="flex gap-1 bg-slate-100/50 p-1 rounded-xl">
            {["all", "pending", "done"].map((id) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all
                ${filter === id ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* 3. TASK LIST (Full Width) */}
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => {
                const isDone = task.status === "done";
                return (
                  <motion.div
                    layout
                    key={task.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => router.push(`/homepage/addtaskpage?id=${task.id}`)}
                    className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Status Icon */}
                      <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors
                        ${isDone ? "bg-emerald-50 text-emerald-500" : "bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500"}`}>
                        {isDone ? <CheckCircle2 size={18} strokeWidth={2.5} /> : <Clock size={18} strokeWidth={2.5} />}
                      </div>

                      <div className="flex flex-col min-w-0">
                        <h3 className={`font-bold text-sm tracking-tight truncate transition-all
                          ${isDone ? "text-slate-300 line-through" : "text-slate-800"}`}>
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                           <span className="text-[9px] font-bold text-slate-400 uppercase">
                             {task.due_date ? new Date(task.due_date).toDateString().slice(4, 10) : "No Date"}
                           </span>
                           <span className="w-1 h-1 bg-slate-200 rounded-full" />
                           <span className={`text-[9px] font-black uppercase tracking-tighter
                              ${isDone ? "text-emerald-500" : "text-blue-500"}`}>
                              {task.category || "General"}
                           </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all px-2">
                      <ChevronRight size={16} strokeWidth={3} />
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 flex flex-col items-center text-center"
              >
                <Inbox size={32} className="text-slate-200 mb-3" />
                <h3 className="font-bold text-slate-800 text-sm italic">Clean list!</h3>
                <p className="text-slate-400 text-[10px] uppercase tracking-[2px]">No matching tasks</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AllTasksPage;