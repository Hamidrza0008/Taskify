"use client"

import { useState } from "react";
import { motion } from "framer-motion"; 
import { User, Mail, Lock, ArrowRight, Sparkles } from "lucide-react"; 
import { useRouter } from "next/navigation";


const Register = () => {
    const router = useRouter();
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({ email, password })
        })
        const data = await res.json();
        console.log(data.message);
        setEmail("")
        setPassword("")
    }

    // Same Animation Variants for consistency
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
        <div className="h-screen w-full flex items-center justify-center p-4 relative overflow-hidden font-sans bg-[#F8FAFF]">
            
            {/* --- Animated Background Blobs (Same as Login) --- */}
            <motion.div 
                animate={{ scale: [1, 1.1, 1], x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60"
            />
            <motion.div 
                animate={{ scale: [1, 1.2, 1], x: [0, -30, 0], y: [0, 20, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60"
            />

            {/* Register Card (Width fixed to 420px like Login) */}
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
                        Create your account
                    </div>
                </motion.div>

                {/* Main Card - Padding set to p-10 to match Login */}
                <div className="bg-white/90 backdrop-blur-xl p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/20">
                    
                    <div className="flex flex-col items-center mb-8">
                        <motion.div 
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            className="bg-[#3B82F6] h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200 mb-4"
                        >
                            <span className="text-3xl font-black">+</span>
                        </motion.div>
                        <h1 className="text-3xl font-black text-[#1E293B] tracking-tight text-center">Join Us</h1>
                        <p className="text-gray-400 text-sm mt-2 font-medium text-center">Start organizing your dreams today.</p>
                    </div>

                    <div className="space-y-4"> {/* Space reduced from 5 to 4 to handle extra field height */}
                        
                        {/* Name Field */}
                        <motion.div variants={itemVariants} className="group">
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1 group-focus-within:text-blue-500">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500" size={18} />
                                <input 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text" 
                                    placeholder="Hamid Raza"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-[#1E293B] focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-400 outline-none transition-all"
                                />
                            </div>
                        </motion.div>

                        {/* Email Field */}
                        <motion.div variants={itemVariants} className="group">
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1 group-focus-within:text-blue-500">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500" size={18} />
                                <input 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email" 
                                    placeholder="name@example.com"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-[#1E293B] focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-400 outline-none transition-all"
                                />
                            </div>
                        </motion.div>

                        {/* Password Field */}
                        <motion.div variants={itemVariants} className="group">
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1 group-focus-within:text-blue-500">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500" size={18} />
                                <input 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password" 
                                    placeholder="••••••••"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-[#1E293B] focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-400 outline-none transition-all"
                                />
                            </div>
                        </motion.div>

                        {/* Button */}
                        <motion.div variants={itemVariants} className="pt-2">
                            <motion.button 
                                onClick={handleRegister} 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group w-full bg-[#1E293B] text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-black flex items-center justify-center gap-2 transition-all"
                            >
                                <span>Create Account</span>
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Footer */}
                    <motion.p variants={itemVariants} className="text-center text-[13px] text-gray-400 mt-6 font-medium">
                        Already have an account? 
                        <span onClick={() => router.push("/loginpage")} className="text-[#3B82F6] font-bold cursor-pointer hover:underline ml-1">Log in</span>
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;