import {create} from 'zustand';
import type { Audio } from '@/types/audio';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';

interface audioStore{
    audios:Audio[];
    setAudios:(audios:Audio[])=>void;
    selectedAudio:Audio | null;
    setSelectedAudio:(audio:Audio | null)=>void;
    addAudio:({playlist_id,title,audio_url}:{playlist_id:number,title:string,audio_url:string})=>void;
    isAddingAudio:boolean;
    getAudios:(playlist_id:number)=>void;
    isGettingAudios:boolean;
    uploadAudioFile:({playlist_id,title,audio_file}:{playlist_id:number,title:string,audio_file:File})=>void;
    isUploadingAudioFile:boolean;
    uploadProgress:number;
    moveToPlaylist:(playlist_id:number,id:number)=>void;
    isMovingAudio:boolean;
    renameAudio:(title:string,id:number)=>void;
    isRenamingAudio:boolean;
    deleteAudio:(id:number)=>void;
    isDeletingAudio:boolean;
    downloadAudio:(id:number,title:string)=>void;
    isDownloadingAudio:boolean;
}

const useAudioStore=create<audioStore>((set)=>({
    audios:[],
    setAudios:(audios:Audio[])=>set({audios}),

    isAddingAudio:false,
    addAudio:async ({playlist_id,title,audio_url}:{
        playlist_id:number,
        title:string,
        audio_url:string
    })=>{
        set({isAddingAudio:true});
        try {
            const response=await axiosInstance.post('/audio/add',{playlist_id,title,audio_url},{
                onUploadProgress(progressEvent) {
                    if(!progressEvent.total) return;
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total));
                    set({uploadProgress:percentCompleted});
                },
            });
            set((state)=>({audios:[...state.audios,response.data.audio]}));
            toast.success("Audio added successfully!");
        } catch (error:any) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        } finally{
            set({isAddingAudio:false});
            set({uploadProgress:0});
        }
    },
    
    isGettingAudios:false,
    getAudios:async(playlist_id:number)=>{
        set({isGettingAudios:true});
        set({audios:[]});
        try{
            const response=await axiosInstance.get(`/audio/${playlist_id}`);
            set({audios:response.data.audios});
        }catch(error:any){
            console.log(error);
            set({audios:[]});
            toast.error(error?.response?.data?.message);
        } finally{
            set({isGettingAudios:false});
        }
    },
    
    selectedAudio:null,
    setSelectedAudio:(audio:Audio | null)=>set({selectedAudio:audio}),

    isUploadingAudioFile:false,
    uploadProgress:0,
    uploadAudioFile:async({playlist_id,title,audio_file}:{
        playlist_id:number,
        title:string,
        audio_file:File
    })=>{
        set({isUploadingAudioFile:true});
        try {
            // create form data to send file for laravel so it can process it
            const formData = new FormData();
            formData.append('playlist_id', playlist_id.toString());
            formData.append('title', title);
            formData.append('audio_file', audio_file);

            const response=await axiosInstance.post('/audio/upload', formData,{
                onUploadProgress(progressEvent) {
                    if(!progressEvent.total) return;
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total));
                    set({uploadProgress:percentCompleted});
                },
            });
            set((state)=>({audios:[...state.audios,response.data.audio]}));
            toast.success("Audio uploaded successfully!");
        } catch (error:any) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        } finally{
            set({isUploadingAudioFile:false});
            set({uploadProgress:0});
        }
    },

    isMovingAudio:false,
    moveToPlaylist:async (playlist_id:number,id:number)=>{
        set({isMovingAudio:true});
        try {
            const response=await axiosInstance.post(`/audio/move/to/${id}`,{playlist_id});
            set((state)=>({audios:state.audios.filter(audio=>audio.id !== response.data.audio.id)}));
            toast.success(response.data.message);
        } catch (error:any) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        } finally{
            set({isMovingAudio:false});
        }
    },

    isRenamingAudio:false,
    renameAudio:async(title:string,id:number)=>{
        set({isRenamingAudio:true});
        try {
            const response=await axiosInstance.post(`/audio/rename/${id}`,{title});
            set((state)=>({audios:state.audios.map(audio=>audio.id === response.data.audio.id ? response.data.audio : audio)}));
            toast.success(response.data.message);
        } catch (error:any) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        } finally{
            set({isRenamingAudio:false});
        }
    },

    isDeletingAudio:false,
    deleteAudio:async(id:number)=>{
        set({isDeletingAudio:true});
        try{
            const response=await axiosInstance.delete(`/audio/delete/${id}`);
            set((state)=>({audios:state.audios.filter(audio=>audio.id !== id)}));
            toast.success(response.data.message);
        }catch(error:any){
            console.log(error);
            toast.error(error?.response?.data?.message);
        }finally{
            set({isDeletingAudio:false});
        }
    },

    isDownloadingAudio:false,
    downloadAudio:async(id:number,title:string)=>{
        set({isDownloadingAudio:true});
        try{
            const response=await axiosInstance.get(`/audio/download/${id}`,
                // this is important to get the file as blob
                {responseType:'blob'}
            );
            // Create a URL for the downloaded blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            
            // Use the track title for the filename
            link.setAttribute('download', `${title}.mp3`); 
            
            document.body.appendChild(link);
            link.click();
            
            // Cleanup
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        }catch(error:any){
            console.log(error);
            toast.error(error?.response?.data?.message);
        }finally{
            set({isDownloadingAudio:false});
        }
    }
}));

export default useAudioStore;