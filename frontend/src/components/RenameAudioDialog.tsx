import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "./ui/input"
import { useState } from "react"
import useAudioStore from "@/stores/audioStore"
import { Button } from "./ui/button";

interface renameAudioInterface{
    open:boolean;
    setOpen:(open:boolean)=>void;
    audioId:number;
}


const RenameAudioDialog = ({open,setOpen,audioId}:renameAudioInterface) => {
    const { renameAudio, isRenamingAudio } = useAudioStore();
    const [title, setTitle] = useState('');
    const [error,setError]=useState<string>('');
    
    const handleRename=async(title:string,audioId:number)=>{
        if(title.trim() === ''){
            setError('Title is required');
            return;
        }
        await renameAudio(title,audioId);
        setOpen(false);
        setTitle('');
        setError('');
    }
    
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Rename Audio</AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter new title for the audio
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Input 
                    value={title}
                    disabled={isRenamingAudio}
                    placeholder="Enter new title"
                    onChange={(e)=>setTitle(e.target.value)}
                    onFocus={()=>setError('')}
                    className={error ? 'border-red-500' : ''}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isRenamingAudio}>Cancel</AlertDialogCancel>
                    <Button 
                        onClick={()=>handleRename(title,audioId)}
                        disabled={isRenamingAudio}
                    >
                        {isRenamingAudio 
                        ? 
                            <>
                                <span className="loading loading-ring loading-md"></span>
                            </> 
                        : 
                            'Rename'
                        }
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default RenameAudioDialog;