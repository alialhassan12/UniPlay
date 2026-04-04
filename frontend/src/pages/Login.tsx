import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Lock, Code, Globe, ArrowRight } from "lucide-react"

const Login = () => {
    return (
        <div className="relative flex justify-center items-center min-h-screen bg-[#0a0a0a] overflow-hidden font-sansSelection">
            {/* Mesh Gradient Background */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1DB954]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col justify-center items-center gap-8 w-full max-w-[440px] px-6">
                {/* Header / Logo Section */}
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1DB954] to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-2">
                        <div className="w-6 h-1 bg-white rounded-full rotate-45 translate-y-1" />
                        <div className="w-4 h-1 bg-white/80 rounded-full -rotate-45 -translate-x-1" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">The Midnight Gallery</h1>
                    <p className="text-[#9ca3af] text-sm font-medium tracking-wide">Universal Audio Player</p>
                </div>

                {/* Form Card */}
                <div className="w-full bg-[#161616]/80 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] shadow-2xl flex flex-col gap-6">
                    <div className="space-y-1">
                        <h2 className="text-xl font-bold text-white">Welcome Back</h2>
                        <p className="text-[#9ca3af] text-sm">Sign in to your sonic universe</p>
                    </div>

                    {/* Login Form */}
                    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/40 tracking-wider ml-1 uppercase">Email Address</label>
                            <div className="relative group">
                                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#1DB954] transition-colors" />
                                <Input 
                                    type="email"
                                    placeholder="your@email.com" 
                                    className="pl-11 h-12 bg-[#1c1c1c] border-white/5 focus-visible:bg-[#222222] text-white rounded-xl transition-all" 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-bold text-white/40 tracking-wider uppercase">Password</label>
                                <a href="#" className="text-[10px] font-bold text-[#1DB954]/60 hover:text-[#1DB954] transition-colors uppercase">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#1DB954] transition-colors" />
                                <Input 
                                    type="password"
                                    placeholder="••••••••" 
                                    className="pl-11 h-12 bg-[#1c1c1c] border-white/5 focus-visible:bg-[#222222] text-white rounded-xl transition-all" 
                                />
                            </div>
                        </div>

                        <Button className="w-full h-12 mt-2 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-base rounded-full shadow-lg shadow-[#1DB954]/20 transition-all active:scale-[0.98] group">
                            Sign In
                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-white/5"></div>
                        <span className="flex-shrink mx-4 text-[10px] text-white/20 font-bold tracking-[0.2em] uppercase">or continue with</span>
                        <div className="flex-grow border-t border-white/5"></div>
                    </div>

                    {/* Social Auth */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="h-11 bg-transparent hover:bg-white/5 text-white/90 border-white/10 rounded-xl transition-all duration-300">
                            <Globe size={18} className="mr-2 text-blue-400" />
                            Google
                        </Button>
                        <Button variant="outline" className="h-11 bg-transparent hover:bg-white/5 text-white/90 border-white/10 rounded-xl transition-all duration-300">
                            <Code size={18} className="mr-2" />
                            GitHub
                        </Button>
                    </div>

                    <div className="mt-2 text-center">
                        <p className="text-sm text-[#9ca3af]">
                            New here?{" "}
                            <a href="/register" className="text-white font-bold hover:text-[#1DB954] transition-colors">
                                Create Account
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer Section */}
                <p className="text-[10px] text-white/20 font-medium text-center max-w-[300px] leading-relaxed">
                    Designed for audiophiles. <br/>
                    The Midnight Gallery © 2026
                </p>
            </div>
        </div>
    );
}

export default Login;
