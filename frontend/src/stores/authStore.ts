import {create} from "zustand";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner"
// types
import {type User} from "@/types/user";

interface AuthStore{
    authUser:User | null;
    setAuthUser:(user:User)=>void;
    login:({email,password}:{email:string,password:string})=>Promise<boolean>;
    isLoggingIn:boolean
    logout:()=>Promise<void>;
    isLogginOut:boolean
    register:({name,email,password}:{name:string,email:string,password:string})=>Promise<boolean>;
    isRegistering:boolean
    checkAuth:()=>Promise<boolean>;
    isCheckingAuth:boolean
}

const useAuthStore =create<AuthStore>((set)=>({
    authUser:null,
    setAuthUser:(user:User)=>set({authUser:user}),
    
    isLoggingIn:false,
    login:async ({email,password}:{email:string,password:string})=>{
        set({isLoggingIn:true});
        try {
            const response=await axiosInstance.post("/login",{email,password});
            set({authUser:response.data.user});
            localStorage.setItem("token",response.data.token);
            console.log(response.data);
            toast.success(response.data.message,{position:"bottom-right"});
            return true;
        } catch (error:any) {
            console.log(error);
            toast.error(error.response.data.message,{position:"bottom-right"});
            return false;
        } finally{
            set({isLoggingIn:false});
        }
    },

    isRegistering:false,
    register:async ({name,email,password}:{name:string,email:string,password:string})=>{
        set({isRegistering:true});
        try {
            const response=await axiosInstance.post("/register",{name,email,password});
            set({authUser:response.data.user});
            localStorage.setItem("token",response.data.token);
            toast.success(response.data.message,{position:"bottom-right"});
            return true;
        } catch (error:any) {
            console.log(error);
            toast.error(error.response.data.message,{position:"bottom-right"});
            return false;
        } finally{
            set({isRegistering:false});
        }
    },

    isLogginOut:false,
    logout:async ()=>{
        set({isLogginOut:true});
        try {
            const response=await axiosInstance.post("/logout");
            localStorage.removeItem("token");
            set({authUser:null});
            toast.success(response.data.message,{position:"bottom-right"});
        } catch (error:any) {
            toast.error(error.response.data.message,{position:"bottom-right"});
        } finally{
            set({isLogginOut:false});
        }
    },

    isCheckingAuth:true,
    checkAuth:async ()=>{
        try {
            const token=localStorage.getItem("token");
            if(!token){
                set({authUser:null});
                return false;
            }
            const response=await axiosInstance.get("/checkAuth");
            console.log(response.data);
            set({authUser:response.data.user});
            return true;
        } catch (error) {
            console.log(error);
            localStorage.removeItem("token");
            set({authUser:null});
            return false;
        } finally{
            set({isCheckingAuth:false});
        }
    }
}));

export default useAuthStore;