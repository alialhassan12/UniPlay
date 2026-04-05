import {create} from "zustand";
import type { Pages } from "@/types/pages";

const usePagesStore=create<Pages>((set)=>({
    currentPage:'home',
    setCurrentPage:(page:string)=>set({currentPage:page}),
}));

export default usePagesStore;