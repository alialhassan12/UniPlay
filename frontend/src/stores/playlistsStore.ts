import {create} from 'zustand';
import type { PlayList } from '@/types/playlist';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';

interface PlaylistsStore {
    playlists: PlayList[];
    setPlaylists: (playlists:PlayList[]) => void;
    addPlaylist:(playlist:PlayList)=>void;
    createPlaylist:(user_id:number,name:string)=>void;
    isCreatingPlaylist:boolean;
    getUserPlaylists:()=>void;
    isFetchingPlaylists:boolean;
}

const usePlaylistsStore = create<PlaylistsStore>((set) => ({
    playlists: [],
    setPlaylists: (playlists:PlayList[]) => set({ playlists }),
    addPlaylist:(playlist:PlayList)=>set((state)=>({playlists:[...state.playlists,playlist]})),
    
    isCreatingPlaylist:false,
    createPlaylist:async(user_id:number,name:string)=>{
        set({isCreatingPlaylist:true});
        try {
            const response = await axiosInstance.post('/playlist/create', { user_id, name });
            const newPlaylist = response.data;
            set((state)=>({playlists:[...state.playlists,newPlaylist]}));   
            toast.success('Playlist created successfully');
        } catch (error:any) {
            console.error('Error creating playlist:', error);
            toast.error(error.response.data.message);
        } finally{
            set({isCreatingPlaylist:false});
        }
    },
    isFetchingPlaylists:false,
    getUserPlaylists:async()=>{
        set({isFetchingPlaylists:true});
        try {
            const response = await axiosInstance.get('/playlists');
            const playlists = response.data.playlists;
            set({ playlists });   
        } catch (error:any) {
            console.error('Error fetching playlists:', error);
            toast.error(error.response.data.message);
        } finally{
            set({isFetchingPlaylists:false});
        }
    }
}));

export default usePlaylistsStore;