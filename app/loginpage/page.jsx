"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Animations
import { Mail, Lock, ArrowRight, LogIn, Sparkles } from "lucide-react"; // Icons

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const hanldeLogin = async () => {
        console.log(email, password)
        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password })
        })

        const data = await res.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            router.push("/homepage");
        } else {
            alert(data.message);
        }
        setEmail("")
        setPassword("")
    }

    // Animation Variants (Consistency ke liye same rakhe hain)
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.5, staggerChildren: 0.1 } 
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center p-4 relative overflow-hidden font-sans bg-[#F8FAFF] selection:bg-blue-100">

            {/* --- Animated Background Blobs (Moving slowly) --- */}
            <motion.div 
                animate={{ 
                    scale: [1, 1.1, 1],
                    x: [0, 30, 0],
                    y: [0, -20, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60"
            />
            <motion.div 
                animate={{ 
                    scale: [1, 1.2, 1],
                    x: [0, -30, 0],
                    y: [0, 20, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60"
            />

            {/* Login Card Container */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 w-full max-w-[420px]"
            >
                {/* Top Badge */}
                <motion.div variants={itemVariants} className="flex justify-center mb-6">
                    <div className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-blue-100 shadow-sm flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
                        <Sparkles size={14} />
                        Welcome Back to Taskify
                    </div>
                </motion.div>

                <div className="bg-white/90 backdrop-blur-xl p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/20">

                    {/* Logo Section */}
                    <div className="flex flex-col items-center mb-8">
                        <motion.div 
                            whileHover={{ scale: 1.1, rotate: -10 }}
                            className="bg-[#3B82F6] h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200 mb-4"
                        >
                            <LogIn size={28} />
                        </motion.div>
                        <h1 className="text-3xl font-black text-[#1E293B] tracking-tight text-center">Sign In</h1>
                        <p className="text-gray-400 text-sm mt-2 font-medium text-center">Manage your dreams, one task at a time.</p>
                    </div>

                    {/* Form UI */}
                    <div className="space-y-5">

                        {/* Email Field */}
                        <motion.div variants={itemVariants} className="group">
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-blue-500 transition-colors">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-4 text-sm text-[#1E293B] placeholder:text-gray-300 focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-400 outline-none transition-all duration-300"
                                />
                            </div>
                        </motion.div>

                        {/* Password Field */}
                        <motion.div variants={itemVariants} className="group">
                            <div className="flex items-center justify-between mb-2 ml-1">
                                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-blue-500 transition-colors">Password</label>
                                <a href="#" className="text-[#3B82F6] font-bold text-[11px] hover:underline transition-all">Forgot?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-4 text-sm text-[#1E293B] placeholder:text-gray-300 focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-400 outline-none transition-all duration-300"
                                />
                            </div>
                        </motion.div>

                        {/* Remember Me */}
                        <motion.div variants={itemVariants} className="flex items-center gap-2 pt-1 ml-1">
                            <input type="checkbox" id="remember" className="accent-[#3B82F6] h-4 w-4 rounded-md border-gray-300 cursor-pointer" />
                            <label htmlFor="remember" className="text-gray-500 text-[13px] font-medium cursor-pointer select-none">Remember me for 30 days</label>
                        </motion.div>

                        {/* Login Button */}
                        <motion.div variants={itemVariants} className="pt-4">
                            <motion.button 
                                onClick={hanldeLogin} 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group w-full bg-[#3B82F6] text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-100 hover:bg-[#2563EB] flex items-center justify-center gap-2 transition-all relative overflow-hidden"
                            >
                                <span className="relative z-10">Sign In</span>
                                <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={18} />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Footer */}
                    <motion.p variants={itemVariants} className="text-center text-[13px] text-gray-400 mt-8 font-medium">
                        Don't have an account? 
                        <span 
                            onClick={() => router.push("/registerpage")}
                            className="text-[#3B82F6] font-bold cursor-pointer hover:text-blue-700 ml-1 transition-colors underline-offset-4 hover:underline"
                        >
                            Sign Up
                        </span>
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;