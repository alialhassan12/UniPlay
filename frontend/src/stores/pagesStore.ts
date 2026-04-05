import {create} from "zustand";

interface PagesStore {
    currentPage:string;
    setCurrentPage:(page:string)=>void;
}

const usePagesStore=create<PagesStore>((set)=>({
    currentPage:'home',
    setCurrentPage:(page:string)=>set({currentPage:page}),
}));

export default usePagesStore;