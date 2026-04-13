"use client"
import { useEffect, useState } from "react";
import { Check, Pencil, Trash2, Calendar, Star, Inbox } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const TaskList = ({ selectedDate }) => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  const [token, setToken] = useState(null);

  const doneCount = tasks.filter(t => t.status === "done").length;
  const totalCount = tasks.length;
  const score = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Date ko readable banane ke liye (e.g., 13 April)
  const readableDate = selectedDate ? selectedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' }) : "Today";

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
  }, []);

  useEffect(() => {
    if (!token) return;
    const fetchTasks = async () => {
      const dateParam = selectedDate ? `?date=${formatDate(selectedDate)}` : "";
      const res = await fetch(`/api/tasks${dateParam}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setTasks(data);
    };
    fetchTasks();
  }, [token, selectedDate]);

  const handleToggle = async (id) => {
    const res = await fetch("/api/tasks", {
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ id: id }),
      method: "PATCH"
    });
    const data = await res.json();
    setTasks((prev) => prev.map((task) => task.id === id ? { ...task, status: data.status } : task));
  };

  const deleteTask = async (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ id })
    });
  };

  return (
    <div className="w-full px-2">
      
      {/* 1. COMPACT HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-black text-slate-800 tracking-tighter uppercase italic">
            To-Do <span className="text-blue-500">List</span>
          </h3>
          {totalCount > 0 && (
            <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100/50">
              <Star size={10} className="text-blue-500 fill-blue-500" />
              <span className="text-[10px] font-black text-blue-600">{score}%</span>
            </div>
          )}
        </div>

        <div className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl uppercase tracking-widest border border-slate-100">
          {totalCount} Items
        </div>
      </div>

      {/* 2. SLIM PROGRESS BAR */}
      <div className="w-full h-1.5 bg-slate-100 rounded-full mb-6 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8 }}
          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
        />
      </div>

      {/* 3. TASK CARDS / EMPTY STATE */}
      <div className="flex flex-col gap-2.5 pb-10 min-h-[200px]">
        <AnimatePresence mode="popLayout">
          {tasks.length > 0 ? (
            tasks.map((task) => {
              const isDone = task.status === "done";
              return (
                <motion.div
                  layout
                  key={task.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className={`group relative p-3.5 rounded-[18px] border transition-all duration-200 ${
                    isDone 
                      ? "bg-slate-50/50 border-slate-100 opacity-70" 
                      : "bg-white border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-blue-500/5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <button
                        onClick={() => handleToggle(task.id)}
                        className={`w-6 h-6 shrink-0 rounded-lg border-2 flex items-center justify-center transition-all ${
                          isDone 
                            ? "bg-emerald-500 border-emerald-500" 
                            : "bg-white border-slate-200 group-hover:border-blue-400"
                        }`}
                      >
                        {isDone && <Check size={14} strokeWidth={4} className="text-white" />}
                      </button>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-[15px] font-bold truncate leading-tight transition-all ${
                            isDone ? "text-slate-400 line-through" : "text-slate-800"
                          }`}>
                            {task.title}
                          </h4>
                        </div>
                        {task.description && (
                          <p className="text-[12px] text-slate-400 truncate max-w-md mt-0.5">
                            {task.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => router.push(`/homepage/addtaskpage?id=${task.id}`)}
                        className="p-1.5 hover:bg-blue-50 rounded-lg text-slate-300 hover:text-blue-500"
                      >
                        <Pencil size={14} />
                      </button>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-slate-300 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            /* EMPTY STATE MESSAGE */
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mb-4 border border-slate-100">
                <Inbox size={28} className="text-slate-200" />
              </div>
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-tighter italic">
                No Tasks for <span className="text-blue-500">{readableDate}</span>
              </h4>
              <p className="text-[11px] text-slate-400 font-bold mt-1 uppercase tracking-widest">
                Enjoy your free time or add a new goal!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskList;