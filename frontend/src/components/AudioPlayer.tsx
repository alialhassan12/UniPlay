import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import useAudioStore from "@/stores/audioStore";
import { Cross, Music, X } from "lucide-react";
import { Button } from "./ui/button";

const CustomAudioPlayer = () => {
    const { selectedAudio,setSelectedAudio } = useAudioStore();

    if (!selectedAudio) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-t border-white/5 px-4 py-3 animate-in slide-in-from-bottom duration-500">
            <div className="max-w-[1400px] mx-auto flex items-center gap-8">
                {/* Track Info */}
                <div className="flex items-center gap-4 w-[30%] min-w-0">
                    <div className="w-14 h-14 bg-emerald-500/20 rounded-lg flex items-center justify-center shrink-0 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
                        <Music className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-white font-bold truncate hover:underline cursor-pointer">
                            {selectedAudio.title}
                        </span>
                        <span className="text-white/50 text-xs truncate uppercase tracking-tighter">
                            Audio Track
                        </span>
                    </div>
                </div>

                {/* Player Controls */}
                <div className="flex-1 max-w-[600px]">
                    <AudioPlayer
                        src={selectedAudio.audio_url}
                        autoPlay={true}
                        showSkipControls={false}
                        showJumpControls={false}
                        customAdditionalControls={[]}
                        layout="horizontal"
                        className="custom-h5-player"
                    />
                </div>

                {/* Additional Controls (Placeholder for Volume etc) */}
                <div className="w-[30%] justify-end items-center gap-4 hidden md:flex">
                    <Button 
                        variant="ghost"
                        size="icon" 
                        className="text-white/50 hover:text-white hover:bg-white/5 rounded-full"
                        onClick={()=>setSelectedAudio(null)}
                        >
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CustomAudioPlayer;
