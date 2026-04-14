import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import useAudioStore from "@/stores/audioStore";

const DeleteAudioAlert=({open,setOpen,audioId,audioName}:{
    open:boolean;
    setOpen:(open:boolean)=>void;
    audioId:number | undefined;
    audioName:string | undefined;
})=>{
    const {deleteAudio,isDeletingAudio,setSelectedAudio}=useAudioStore();
    
    const handleDeleteAudio=async()=>{
        await deleteAudio(audioId!);
        setOpen(false);
        setSelectedAudio(null);
    }
    
    return(
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-400 text-2xl font-bold mb-2">Delete Audio</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete <span className="text-red-400">"{audioName}"</span> ?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button 
                        onClick={handleDeleteAudio}
                        disabled={isDeletingAudio}
                        className="bg-red-400 text-black hover:bg-red-500"
                    >
                        {isDeletingAudio ?<span className="loading loading-ring loading-md"></span>: "Delete"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteAudioAlert;