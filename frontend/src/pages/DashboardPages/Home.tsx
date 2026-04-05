const Home=()=>{
    return(
        <div className="max-w-4xl">
                            <h2 className="text-3xl font-bold text-white mb-6">Good evening</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="group relative flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-all rounded-lg overflow-hidden cursor-pointer p-4 border border-white/5">
                                        <div className="h-16 w-16 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded shadow-lg group-hover:scale-105 transition-transform" />
                                        <span className="font-bold text-white">Daily Mix {i}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
    );
}

export default Home;