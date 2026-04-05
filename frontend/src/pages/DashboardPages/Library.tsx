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

const Library=()=>{
    const [openCreateDialog,setOpenCreateDialog]=useState<boolean>(false);
    const {playlists,getUserPlaylists,isFetchingPlaylists}=usePlaylistsStore();
    useEffect(()=>{
        getUserPlaylists();
    },[]);

    return(
        <>
            <h1 className="text-white text-2xl font-bold mb-6">Your Library</h1>
            <div className="flex flex-row flex-wrap gap-4">
                {
                    playlists.length==0 && isFetchingPlaylists &&(
                        <>
                            <Skeleton className="w-48 h-48 mb-2 rounded-2xl" />
                            <Skeleton className="w-48 h-48 mb-2 rounded-2xl" />
                            <Skeleton className="w-48 h-48 mb-2 rounded-2xl" />
                        </>
                    ) 
                }
                {playlists.map((playlist)=>{
                    return(
                        <div key={playlist.id} className="flex flex-col text-center">
                            <div className="w-48 h-48 bg-gradient-to-br from-[#1DB954] to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-2">
                                <div className="w-6 h-1 bg-white rounded-full rotate-45 translate-y-1" />
                                <div className="w-4 h-1 bg-white/80 rounded-full -rotate-45 -translate-x-1" />
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
                                className="w-48 h-48 bg-gradient-to-br from-[#121212] to-[#121212] rounded-2xl flex items-center justify-center shadow-lg hover:shadow-white/20 transition-all duration-300 ease-in-out mb-2 cursor-pointer">
                                <Plus className="w-12 h-12 text-white" />
                            </div> 
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