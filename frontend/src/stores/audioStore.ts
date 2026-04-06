import {create} from 'zustand';
import type { Audio } from '@/types/audio';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';

interface audioStore{
    audios:Audio[];
    setAudios:(audios:Audio[])=>void;
    addAudio:({playlist_id,title,audio_url}:{playlist_id:number,title:string,audio_url:string})=>void;
    isAddingAudio:boolean;
    getAudios:(playlist_id:number)=>void;
    isGettingAudios:boolean;
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
            const response=await axiosInstance.post('/audio/add',{playlist_id,title,audio_url});
            set((state)=>({audios:[...state.audios,response.data.audio]}));
            toast.success("Audio added successfully!");
        } catch (error:any) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        } finally{
            set({isAddingAudio:false});
        }
    },
    isGettingAudios:false,
    getAudios:async(playlist_id:number)=>{
        set({isGettingAudios:true});
        try{
            const response=await axiosInstance.get(`/audio/${playlist_id}`);
            set({audios:response.data.audios});
        }catch(error:any){
            console.log(error);
            toast.error(error?.response?.data?.message);
        } finally{
            set({isGettingAudios:false});
        }
    }
}));

export default useAudioStore;