import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import { useState } from "react";
import usePlaylistsStore from "@/stores/playlistsStore";
import useAuthStore from "@/stores/authStore";
import { toast } from "sonner";
import { Button } from "./ui/button";

const CreatePlaylistDialog =({open,onOpenChange}:{open:boolean,onOpenChange:(open:boolean)=>void})=>{
    const [playlistName,setPlaylistName]=useState('');
    const{authUser}=useAuthStore();
    const {createPlaylist,isCreatingPlaylist}=usePlaylistsStore();
    
    const handlePlaylistCreation=async ()=>{
        if(authUser){
            await createPlaylist(authUser.id,playlistName);
        }else{
            toast.error('User not found');
        }
        onOpenChange(false);
        setPlaylistName('');
    }

    return(
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Create New Playlist</AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter the name of the playlist you want to create.
                    </AlertDialogDescription>
                    <Input 
                        value={playlistName}
                        className="text-white"
                        onChange={(e)=>setPlaylistName(e.target.value)}
                        placeholder="Playlist name" 
                    />
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row gap-2 bg-[#1DB954]">
                    <AlertDialogCancel onClick={()=>onOpenChange(false)} className="text-white">
                        Cancel
                    </AlertDialogCancel>
                    <Button onClick={handlePlaylistCreation} className="text-white">
                        {isCreatingPlaylist?
                            <span className="loading loading-ring loading-sm"></span>
                            :
                            'Create'
                        }
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CreatePlaylistDialog;