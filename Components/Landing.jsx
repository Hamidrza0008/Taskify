"use client"

import React from 'react';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight, Zap } from "lucide-react";

const LandingPage = () => {
  const router = useRouter();

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFF] flex flex-col overflow-x-hidden font-sans selection:bg-blue-100 selection:text-blue-600">
      
      {/* 1. Navbar */}
      <nav className="w-full px-6 md:px-12 py-6 flex items-center justify-between z-50 fixed top-0 bg-[#F8FAFF]/80 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="bg-[#3B82F6] h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
            <CheckCircle2 size={24} />
          </div>
          <span className="text-2xl font-black tracking-tight text-[#1E293B]">Taskify</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 md:gap-8"
        >
          <button onClick={() => router.push("/loginpage")} className="font-semibold text-gray-500 hover:text-[#3B82F6] transition-all">Log In</button>
          <button 
            onClick={() => router.push("/registerpage")} 
            className="px-6 py-2.5 bg-[#1E293B] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95"
          >
            Join for Free
          </button>
        </motion.div>
      </nav>

      {/* 2. Main Hero Section */}
      <main className="flex-1 flex flex-col items-center pt-32 text-center px-4 relative overflow-hidden">
        
        {/* Background Decorative Blobs */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-200/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
        <div className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-purple-200/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-sm mb-6">
            <Sparkles size={16} />
            <span>Productivity redefined</span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-[90px] font-black text-[#1E293B] leading-[0.95] tracking-tighter mb-8">
            MANAGE WORK <br /> 
            <span className="text-[#3B82F6]">LIKE MAGIC.</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Taskify is the easiest way to take down daily tasks, track progress, and crush your goals. 
            <span className="text-[#1E293B] font-bold"> Simple, fast, and incredibly useful.</span>
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button onClick={() => router.push("/registerpage")}  className="group px-10 py-5 bg-[#3B82F6] text-white font-bold rounded-2xl text-lg shadow-2xl shadow-blue-200 hover:bg-[#2563EB] transition-all flex items-center gap-2">
              Start Your Journey <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            {/* <button className="px-10 py-5 bg-white text-[#1E293B] font-bold rounded-2xl text-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-all">
              See How It Works
            </button> */}
          </motion.div>

          {/* New Quote Section */}
          <motion.div variants={fadeInUp} className="mb-20">
            <div className="inline-block p-[1px] rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 shadow-xl">
              <div className="bg-white px-8 py-4 rounded-2xl italic text-gray-600 font-medium">
                "Productivity is being able to do things that you were never able to do before."
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 3. Dashboard Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative w-full max-w-6xl px-4"
        >
           <div className="bg-white p-2 md:p-4 rounded-t-[40px] shadow-[0_-20px_50px_-10px_rgba(59,130,246,0.2)] border-t border-x border-gray-100 overflow-hidden">
             <div className="relative group overflow-hidden rounded-t-[30px] bg-[#F3F7FF] aspect-video">
               <img 
                 src="https://cdn.dribbble.com/userupload/10574163/file/original-4f65345731776b9f27d427d6b38c2263.png" 
                 alt="Taskify Dashboard" 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFF] via-transparent to-transparent opacity-60"></div>
             </div>
           </div>
           
           {/* Floating Floating Feature Card */}
           <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -top-10 -right-4 hidden lg:flex bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 items-center gap-4"
           >
              <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <Zap fill="currentColor" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-800">Fast Syncing</p>
                <p className="text-xs text-gray-400">Everything up to date.</p>
              </div>
           </motion.div>
        </motion.div>
      </main>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;