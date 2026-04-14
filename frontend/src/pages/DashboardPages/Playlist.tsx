import useAudioStore from "@/stores/audioStore";
import usePlaylistsStore from "@/stores/playlistsStore";
import { Clock, Music, Play, Plus, Search, MoreHorizontal, Edit, Trash, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx";
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import AddAudioDialog from "@/components/AddAudioDialog";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import RenameAudioDialog from "@/components/RenameAudioDialog";
import DeleteAudioAlert from "@/components/DeleteAudioAlert";


const Playlist = () => {
    const { selectedPLaylist } = usePlaylistsStore();
    const { 
        audios,
        getAudios,
        isGettingAudios,
        setSelectedAudio,
        isMovingAudio,
        moveToPlaylist,
        selectedAudio,
        isDeletingAudio,
        deleteAudio,
    } = useAudioStore();
    const {playlists}=usePlaylistsStore();
    const [openAddAudioDialog,setOpenAddAudioDialog]=useState(false);
    const [openRenameDialog,setOpenRenameDialog]=useState(false);
    const [openDeleteAlert,setOpenDeleteAlert]=useState(false);
    const [search,setSearch]=useState('');
    
    useEffect(()=>{
        if(selectedPLaylist){
            getAudios(selectedPLaylist.id);
        }
    },[getAudios,selectedPLaylist]);

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col gap-8 animate-in fade-in duration-700">
            {/* Playlist Header */}
            <div className="flex flex-col md:flex-row items-end gap-6 bg-linear-to-t from-[#0a0a0a] to-emerald-900/20 p-6 rounded-3xl border border-white/5 shadow-2xl">
                <div className="w-52 h-52 bg-linear-to-br from-emerald-500 to-emerald-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                    <Music className="w-24 h-24 text-white/50" />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-white/70 uppercase text-xs font-bold tracking-widest">Playlist</span>
                    {isGettingAudios && !selectedPLaylist?.name ? (
                        <Skeleton className="h-12 w-64 md:h-16 md:w-96" />
                    ) : (
                        <h1 className="text-white text-5xl md:text-7xl font-black">{selectedPLaylist?.name || "Select a Playlist"}</h1>
                    )}
                    <div className="flex items-center gap-2 text-white/60 text-sm mt-4">
                        {isGettingAudios ? (
                            <Skeleton className="h-4 w-32" />
                        ) : (
                            <>
                                <span className="font-bold text-white">{}</span>
                                <span>•</span>
                                <span>{audios.length} {audios.length === 1 ? 'audio' : 'audios'}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 px-4">
                <button className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/40">
                    <Play className="w-6 h-6 text-black fill-black ml-1" />
                </button>
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-emerald-500 transition-colors" />
                    <input 
                        type="text" 
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        placeholder="Search in playlist"
                        className="bg-white/5 border-none rounded-full py-2 pl-10 pr-4 text-sm text-white focus:ring-1 focus:ring-emerald-500 w-64 outline-none transition-all"
                    />
                    
                </div>
                {audios.length>0 &&(
                    <Button
                        onClick={()=>setOpenAddAudioDialog(true)}
                        className="bg-white text-black hover:bg-emerald-400 font-bold px-8 rounded-full transition-all flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Audio
                </Button>
                )}
            </div>

            {/* Audio List or Empty State */}
            <div className="px-4">
                {isGettingAudios ? (
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent">
                                <TableHead className="w-12"><Skeleton className="h-4 w-4" /></TableHead>
                                <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                                <TableHead><Skeleton className="h-4 w-10" /></TableHead>
                                <TableHead className="w-12"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i} className="border-none hover:bg-transparent">
                                    <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-2">
                                            <Skeleton className="h-4 w-48" />
                                            <Skeleton className="h-3 w-20" />
                                        </div>
                                    </TableCell>
                                    <TableCell><Skeleton className="h-4 w-10" /></TableCell>
                                    <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : audios.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white/5 rounded-3xl border border-dashed border-white/10">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-2">
                            <Music className="w-10 h-10 text-white/20" />
                        </div>
                        <h2 className="text-white text-xl font-bold">Your playlist is empty</h2>
                        <p className="text-white/50 text-sm max-w-xs text-center mb-4">
                            Start adding some tracks to hear your favorite music in one place.
                        </p>
                        <Button
                            onClick={()=>setOpenAddAudioDialog(true)}
                            className="bg-white text-black hover:bg-emerald-400 font-bold px-8 rounded-full transition-all flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Audio
                        </Button>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent">
                                <TableHead className="w-12 text-white/50">#</TableHead>
                                <TableHead className="text-white/50">Title</TableHead>
                                <TableHead className="text-white/50"><Clock className="w-4 h-4" /></TableHead>
                                <TableHead className="w-12 text-white/50"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* filter audios by search */}
                            {audios.filter((audio)=>audio.title.toLowerCase().includes(search.toLowerCase())).map((audio, index) => (    
                                <TableRow 
                                    key={audio.id} 
                                    onClick={()=>setSelectedAudio(audio)}
                                    className="group border-none hover:bg-white/5 transition-all cursor-pointer rounded-lg"
                                >
                                    <TableCell className="text-white/50 font-medium group-hover:text-emerald-500 transition-colors">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-white font-medium group-hover:text-emerald-400 transition-colors">{audio.title}</span>
                                            <span className="text-xs text-white/50 uppercase tracking-tighter">Audio Track</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-white/50 group-hover:text-white transition-colors">
                                        {formatDuration(audio.duration)}
                                    </TableCell>
                                    <TableCell>
                                        <Popover>
                                            <PopoverTrigger>
                                                <div className="gap-2 p-2 hover:text-white text-white/50 transition-colors cursor-pointer">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </div>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                    <PopoverHeader>
                                                        <PopoverTitle>More Options</PopoverTitle>
                                                        <PopoverDescription>Update Or Delete <span className="text-emerald-500">{audio.title}</span>.</PopoverDescription>
                                                    </PopoverHeader>
                                                    {/* edit buttons */}
                                                    <Button 
                                                        className="bg-blue-400 text-black hover:bg-blue-500 "
                                                        onClick={()=>setOpenRenameDialog(true)}
                                                        >
                                                        <Edit/>Rename
                                                    </Button>
                                                    {/* move to playlist popover */}
                                                    <Popover>
                                                        <PopoverTrigger 
                                                            className="flex justify-center items-center gap-2 h-8 rounded-[10px] bg-green-400 w-full text-black hover:bg-green-500 "
                                                        >
                                                            <Move size={18}/><span className="font-semibold">Move to playlist</span>
                                                        </PopoverTrigger>
                                                        <PopoverContent side="left">
                                                            <PopoverHeader>
                                                                <PopoverTitle>Your Playlists</PopoverTitle>
                                                                <PopoverDescription>Move <span className="text-emerald-500">{audio.title}</span> to :</PopoverDescription>
                                                            </PopoverHeader>
                                                            {playlists.map((playlist)=>{
                                                                if(playlist.id === selectedPLaylist?.id) return null;
                                                                return(
                                                                    <Button
                                                                        key={playlist.id}
                                                                        disabled={isMovingAudio}
                                                                        onClick={()=>moveToPlaylist(playlist.id,audio.id)}
                                                                    >
                                                                        {playlist.name}
                                                                        {isMovingAudio && <span className="loading loading-ring loading-md"></span>}
                                                                    </Button>
                                                                );
                                                            })}
                                                        </PopoverContent>
                                                    </Popover>
                                                    {/* delete button */}
                                                    <Button 
                                                        disabled={isDeletingAudio}
                                                        onClick={()=>setOpenDeleteAlert(true)}
                                                        className="bg-red-400 text-black hover:bg-red-500"
                                                    >
                                                        <Trash/>{isDeletingAudio ?<span className="loading loading-ring loading-md"></span>: "Delete"}
                                                    </Button>
                                            </PopoverContent>
                                            </Popover>
                                        
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
            <AddAudioDialog open={openAddAudioDialog} onOpenChange={setOpenAddAudioDialog}/>
            <RenameAudioDialog open={openRenameDialog} setOpen={setOpenRenameDialog} audioId={selectedAudio?.id}/>
            <DeleteAudioAlert open={openDeleteAlert} setOpen={setOpenDeleteAlert} audioId={selectedAudio?.id} audioName={selectedAudio?.title}/>
        </div>
    );
};

export default Playlist;
