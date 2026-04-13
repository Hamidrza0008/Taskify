"use client"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Calendar, Flag, Tag, AlignLeft, Sparkles } from 'lucide-react';
import { motion } from "framer-motion";

const AddTask = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const router = useRouter();
  const selectedDate = searchParams.get("date");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Daily");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low Priority");

  const isEditId = !!editId;

  useEffect(() => {
    if (!editId || !token) return;
    const fetchTask = async () => {
      const res = await fetch(`/api/tasks/${editId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setTitle(data.title || "");
      setCategory(data.category || "Daily");
      setDescription(data.description || "");
      setPriority(data.priority || "Low Priority");
    };
    fetchTask();
  }, [editId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      category,
      description,
      due_date: selectedDate
        ? `${selectedDate} 00:00:00`
        : new Date().toISOString().slice(0, 19).replace("T", " "),
      priority,
    };

    try {
      const url = isEditId ? `/api/tasks/${editId}` : "/api/tasks";
      const method = isEditId ? "PUT" : "POST";
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(newTask),
      });
      router.push("/homepage");
      router.refresh();
    } catch (error) {
      console.log("Error ❌", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFF] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Blobs (Matching your theme) */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-purple-100/50 rounded-full blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-[32px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white"
      >
        {/* Header */}
        <div className="mb-10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2.5 rounded-2xl shadow-lg shadow-blue-100 text-white">
              <Sparkles size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-none">
                {isEditId ? "Update Task" : "New Task"}
              </h1>
              <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">Plan your day effectively</p>
            </div>
          </div>

          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title Section */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
              <AlignLeft size={14} /> Task Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="What needs to be done?"
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-700 font-bold focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all placeholder:text-slate-300"
              required
            />
          </div>

          {/* Grid for Category & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <Tag size={14} /> Category
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-700 font-bold outline-none focus:bg-white focus:border-blue-400 transition-all cursor-pointer"
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Work</option>
                  <option>Personal</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Calendar size={16} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <Flag size={14} /> Priority
              </label>
              <div className="relative">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-700 font-bold outline-none focus:bg-white focus:border-blue-400 transition-all cursor-pointer"
                >
                  <option>Low Priority</option>
                  <option>Medium Priority</option>
                  <option>High Priority 🔥</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
              <AlignLeft size={14} /> Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              placeholder="Add some details..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 text-slate-700 font-medium focus:bg-white focus:border-blue-400 outline-none transition-all resize-none placeholder:text-slate-300"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-6 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-slate-400 hover:text-slate-600 font-black text-sm uppercase tracking-widest transition-colors"
            >
              Cancel
            </button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-[20px] font-black text-sm uppercase tracking-[0.1em] shadow-xl shadow-blue-100 transition-all flex items-center gap-2"
            >
              {isEditId ? "Update Task" : "Create Task"}
            </motion.button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};

export default AddTask;