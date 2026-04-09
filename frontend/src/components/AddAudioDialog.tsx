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
import { Music, Link, Plus, Sparkles, Loader2 } from "lucide-react";
import useAudioStore from "@/stores/audioStore";
import usePlaylistsStore from "@/stores/playlistsStore";
import { toast } from "sonner";
import { useDropzone } from 'react-dropzone';
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress"

const AddAudioDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const [audioFields, setAudioFields] = useState<{
        title: string;
        url: string;
    }>({
        title: "",
        url: ""
    });
    const [uploadOption,setUploadOption]=useState<boolean>(false);
    const [uploadedFile,setUploadedFile]=useState<File | null>(null);

    const { addAudio, isAddingAudio,uploadAudioFile,isUploadingAudioFile,uploadProgress } = useAudioStore();
    const { selectedPLaylist } = usePlaylistsStore();

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: {
            'audio/*': ['.mp3', '.wav', '.m4a', '.aac', '.ogg', '.flac','.webm']
        },
        onDrop: (acceptedFiles) => {
            setUploadedFile(acceptedFiles[0]);
        }
    });


    // handlers
    const handleAddAudioLink = async () => {
        try {
            await addAudio({
                playlist_id: selectedPLaylist!.id,
                title: audioFields.title,
                audio_url: audioFields.url,
            });
            setAudioFields({ title: "", url: "" });
            onOpenChange(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUploadAudioFile=async(file:File)=>{
        await uploadAudioFile({
            playlist_id: selectedPLaylist!.id,
            title: audioFields.title,
            audio_file: file,
        });
        setAudioFields({ title: "", url:""});
        setUploadedFile(null);
        onOpenChange(false);
    }

    const handleAddAudio=()=>{
        // check first for selected playlist
        if (!selectedPLaylist) {
            toast.error("Please select a playlist first");
            return;
        }
        // check for upload option
        if(uploadOption){
            // check for title
            if (!audioFields.title.trim()) {
                toast.error("Title is required");
                return;
            }
            // check for uploaded file
            if(!uploadedFile){
                toast.error("Please upload a file");
                return;
            }
            // call upload audio file handler
            handleUploadAudioFile(uploadedFile);
        }else{
            // check for title and url
            if (!audioFields.title.trim() || !audioFields.url.trim()) {
                toast.error("All fields are required");
                return;
            }
            // call add audio link handler
            handleAddAudioLink();
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-0 max-w-md w-[95%]">
                <div className="bg-linear-to-br from-emerald-500/20 to-transparent p-8">
                    <AlertDialogHeader className="mb-6">
                        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                            <Sparkles className="w-8 h-8 text-black" />
                        </div>
                        <AlertDialogTitle className="text-white text-3xl font-black mb-1">Add New Track</AlertDialogTitle>
                        <AlertDialogDescription className="text-white/50 text-sm leading-relaxed">
                            Paste a Link and give it a name. We'll handle the rest for you.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="flex flex-col gap-5">
                        {/* song title field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-white/60 text-xs font-bold uppercase tracking-widest pl-1">Track Name</label>
                            <div className="relative group">
                                <Music className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-emerald-500 transition-colors" />
                                <Input 
                                    value={audioFields.title}
                                    disabled={isUploadingAudioFile || isAddingAudio}
                                    className="bg-white/5 border-white/10 h-12 pl-11 text-white placeholder:text-white/20 focus:border-emerald-500/50 rounded-2xl transition-all"
                                    onChange={(e) => setAudioFields({ ...audioFields, title: e.target.value })}
                                    placeholder="e.g. My Favorite Song" 
                                />
                            </div>
                        </div>
                        
                        {/* audio url field */}
                        <div className={`flex flex-col gap-2 ${uploadOption?'hidden':''}`}>
                            <label className="text-white/60 text-xs font-bold uppercase tracking-widest pl-1">Audio URL</label>
                            <div className="relative group">
                                <Link className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-emerald-500 transition-colors" />
                                <Input 
                                    value={audioFields.url}
                                    disabled={isUploadingAudioFile || isAddingAudio}
                                    className="bg-white/5 border-white/10 h-12 pl-11 text-white placeholder:text-white/20 focus:border-emerald-500/50 rounded-2xl transition-all"
                                    onChange={(e) => setAudioFields({ ...audioFields, url: e.target.value })}
                                    placeholder="Enter URL (YouTube, SoundCloud, etc)" 
                                />
                            </div>
                        </div>

                        {/* upload option */}
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                disabled={isUploadingAudioFile || isAddingAudio} 
                                id="uploadOption" 
                                checked={uploadOption} 
                                onCheckedChange={()=>setUploadOption(!uploadOption)} 
                            />
                            <label
                                htmlFor="uploadOption"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Upload Audio File
                            </label>
                        </div>
                        {/* Drag upload file */}
                        <div
                            {...getRootProps()}
                            style={{
                                border: '2px dashed #ccc',
                                padding: '40px',
                                textAlign: 'center',
                                borderRadius: '10px',
                                cursor: 'pointer'
                            }}
                            className={`${uploadOption?'':'hidden'}`}
                            >
                            <input {...getInputProps()} disabled={isUploadingAudioFile || isAddingAudio} />
                            {
                                isDragActive
                                ? <p>Drop files here...</p>
                                : <p>Drag & drop files here, or click to select</p>
                            }
                        </div>
                    </div>
                </div>

                {isUploadingAudioFile || isAddingAudio
                ?(
                    <div className="flex flex-col px-6">
                        <div className="flex justify-between items-center p-2">
                            <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Uploading in progress</span>
                            <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="mb-3" />
                    </div>
                )
                :(
                    <AlertDialogFooter className="p-6 bg-white/5 flex flex-row items-center gap-3 space-x-0">
                        <AlertDialogCancel 
                            onClick={() => onOpenChange(false)} 
                            className="flex-1 bg-transparent border-white/10 text-white hover:bg-white/5 h-12 rounded-2xl transition-all font-bold"
                        >
                            Cancel
                        </AlertDialogCancel>
                        <button 
                            onClick={handleAddAudio}
                            disabled={isAddingAudio || isUploadingAudioFile}
                            className="flex-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-900/50 text-black h-12 rounded-2xl transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
                        >
                            <Plus className="w-5 h-5" />
                            Add to Playlist
                        </button>
                    </AlertDialogFooter>
                )}
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AddAudioDialog;
