import { Plus } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"
import CreatePlaylistDialog from "@/components/CreatePlaylistDialog";
import { useEffect, useState } from "react";
import usePlaylistsStore from "@/stores/playlistsStore";
import usePagesStore from "@/stores/pagesStore";

const Library=()=>{
    const [openCreateDialog,setOpenCreateDialog]=useState<boolean>(false);
    const {playlists,getUserPlaylists,isFetchingPlaylists,setSelectedPlaylist}=usePlaylistsStore();
    const {setCurrentPage}=usePagesStore();

    useEffect(()=>{
        getUserPlaylists();
    },[]);

    return(
        <>
            <h1 className="text-white text-2xl font-bold mb-6">Your Library</h1>
            <div className="flex flex-row flex-wrap gap-4">
                {isFetchingPlaylists && playlists.length === 0 && (
                    <>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-3 group">
                                <Skeleton className="w-48 h-48 rounded-[2rem]" />
                                <Skeleton className="w-32 h-4 mx-auto rounded-full" />
                            </div>
                        ))}
                    </>
                )}
                
                {playlists.map((playlist)=>{
                    return(
                        <div 
                            key={playlist.id} 
                            onClick={()=>{
                                setSelectedPlaylist(playlist);
                                setCurrentPage("playlist");
                            }}
                            className="flex flex-col text-center hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group"
                        >
                            <div className="w-48 h-48 bg-gradient-to-br from-[#1DB954] to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 ease-in-out mb-2 cursor-pointer">
                                <div className="w-6 h-1 bg-white rounded-full rotate-45 translate-y-1 group-hover:translate-y-1 transition-all duration-300 ease-in-out" />
                                <div className="w-4 h-1 bg-white/80 rounded-full -rotate-45 -translate-x-1 group-hover:translate-y-1 transition-all duration-300 ease-in-out" />
                            </div>
                            <p className="text-white text-sm font-bold">{playlist.name}</p>
                        </div>
                    );
                })}

                {/* create playlist */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div 
                                onClick={()=>setOpenCreateDialog(true)}
                                className="w-48 h-48 bg-gradient-to-br from-[#121212] to-[#121212] rounded-2xl flex items-center justify-center shadow-lg hover:shadow-white/20 hover:scale-105 transition-all duration-300 ease-in-out mb-2 cursor-pointer">
                                <Plus className="w-12 h-12 text-white" />
                            </div>
                            <p className="text-white text-sm font-bold">Create Playlist</p>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p className="text-black font-bold bg-[#1DB954] rounded-full px-2 py-1">Create Playlist</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div> 
            <CreatePlaylistDialog open={openCreateDialog} onOpenChange={setOpenCreateDialog} />
        </>
    );
}

export default Library;