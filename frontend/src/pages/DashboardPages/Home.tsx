import { useEffect, useMemo } from "react";
import { Play, Music, Clock, Heart, Sparkles, TrendingUp } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import usePlaylistsStore from "@/stores/playlistsStore";

const Home = () => {
    const { authUser } = useAuthStore();
    const { playlists, getUserPlaylists } = usePlaylistsStore();

    useEffect(() => {
        if (playlists.length === 0) {
            getUserPlaylists();
        }
    }, [getUserPlaylists, playlists.length]);

    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    }, []);

    const greetingIcon = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />;
        if (hour < 18) return <Sparkles className="w-8 h-8 text-orange-400" />;
        return <Sparkles className="w-8 h-8 text-indigo-400" />;
    }, []);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl p-8 bg-linear-to-br from-indigo-600/20 via-transparent to-transparent border border-white/5">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            {greetingIcon}
                            <h2 className="text-4xl font-black text-white tracking-tight">
                                {greeting}, {authUser?.name?.split(" ")[0] || "Friend"}
                            </h2>
                        </div>
                        <p className="text-white/50 text-lg font-medium">Ready to dive into your world of sound?</p>
                    </div>
                </div>
            </section>

            {/* Quick Access Grid */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-xl font-bold text-white">Jump back in</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {playlists.slice(0, 6).map((playlist) => (
                        <div 
                            key={playlist.id} 
                            className="group relative flex items-center gap-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all rounded-xl p-3 border border-white/5 cursor-pointer overflow-hidden shadow-2xl"
                        >
                            <div className="relative flex-shrink-0">
                                <div className="h-16 w-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                    <Music className="text-white/80 w-8 h-8" />
                                </div>
                                <button className="absolute right-[-10px] bottom-[-10px] bg-indigo-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-x-[-15px] group-hover:translate-y-[-15px] transition-all duration-300 shadow-xl hover:scale-110 hover:bg-indigo-400">
                                    <Play fill="currentColor" className="w-4 h-4 ml-0.5" />
                                </button>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-white truncate text-base">{playlist.name}</p>
                            </div>
                        </div>
                    ))}
                    {playlists.length === 0 && Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="animate-pulse flex items-center gap-4 bg-white/5 rounded-xl p-3 border border-white/5">
                            <div className="h-16 w-16 bg-white/10 rounded-lg" />
                            <div className="h-4 w-24 bg-white/10 rounded" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Suggested / Popular Section */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-400" />
                        <h3 className="text-xl font-bold text-white">Your Collections</h3>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {playlists.map((playlist) => (
                        <div key={playlist.id} className="group flex flex-col gap-3 cursor-pointer">
                            <div className="relative aspect-square bg-linear-to-br from-zinc-800 to-zinc-900 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-indigo-500/10 group-hover:-translate-y-1 border border-white/5">
                                <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-60 transition-opacity">
                                    <Music size={60} className="text-white" />
                                </div>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
                                <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <button className="bg-indigo-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-indigo-400 transition-transform">
                                        <Play fill="currentColor" size={20} className="ml-0.5" />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-base truncate group-hover:text-indigo-400 transition-colors">{playlist.name}</h4>
                                <p className="text-white/40 text-sm font-medium">Playlist • {authUser?.name}</p>
                            </div>
                        </div>
                    ))}
                    {playlists.length === 0 && Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="animate-pulse space-y-3">
                            <div className="aspect-square bg-white/5 rounded-2xl border border-white/5" />
                            <div className="h-4 w-3/4 bg-white/10 rounded" />
                            <div className="h-3 w-1/2 bg-white/10 rounded" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Extra Section: Mixes */}
            <section className="bg-linear-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                    <Music size={200} />
                </div>
                <div className="relative z-10 max-w-lg space-y-4">
                    <div className="flex items-center gap-2">
                         <Heart className="fill-white text-white" size={20} />
                         <span className="text-white/80 font-bold uppercase tracking-widest text-xs">Featured Mix</span>
                    </div>
                    <h2 className="text-3xl font-black text-white">Your Daily Melodies</h2>
                    <p className="text-white/80 text-lg leading-relaxed">
                        A personalized mix of tracks you love and new sounds to discover. Updated every 24 hours just for you.
                    </p>
                    <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-xl">
                        Listen Now
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;
