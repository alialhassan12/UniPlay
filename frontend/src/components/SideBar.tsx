import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroupLabel,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { Home, Search, Library, LogOut, User as UserIcon, PlusSquare, Heart } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import usePagesStore from "@/stores/pagesStore";
import { cn } from "@/lib/utils";

const SideBar = () => {
    const { authUser, logout,isLoggingOut } = useAuthStore();
    const { currentPage, setCurrentPage } = usePagesStore();

    const menuItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'search', icon: Search, label: 'Search' },
        { id: 'library', icon: Library, label: 'Your Library' },
    ];

    const playlistItems = [
        { id: 'create', icon: PlusSquare, label: 'Create Playlist' },
        { id: 'liked', icon: Heart, label: 'Liked Songs', color: 'text-purple-500' },
    ];

    return (
        <Sidebar className="border-r border-white/10 bg-black text-white">
            <SidebarHeader className="px-6 py-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1DB954] shadow-lg shadow-[#1DB954]/20">
                        <span className="text-xl font-black text-black italic">uP</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">uniPlay</h1>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-3">
                <SidebarGroup>
                    <SidebarMenu className="gap-1">
                        {menuItems.map((item) => (
                            <SidebarMenuItem key={item.id}>
                                <SidebarMenuButton
                                    onClick={() => setCurrentPage(item.id)}
                                    isActive={currentPage === item.id}
                                    className={cn(
                                        "h-12 w-full justify-start gap-4 px-4 rounded-lg transition-all duration-200",
                                        "hover:bg-white/10 hover:text-white",
                                        currentPage === item.id 
                                            ? "bg-white/10 text-[#1DB954]" 
                                            : "bg-transparent text-white/70"
                                    )}
                                >
                                    <item.icon className={cn("size-5", currentPage === item.id && "text-[#1DB954]")} />
                                    <span className="text-sm font-semibold">{item.label}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarSeparator className="my-4 bg-white/5" />

                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                        Playlists
                    </SidebarGroupLabel>
                    <SidebarMenu className="gap-1">
                        {playlistItems.map((item) => (
                            <SidebarMenuItem key={item.id}>
                                <SidebarMenuButton
                                    className="h-10 w-full justify-start gap-4 px-4 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
                                >
                                    <item.icon className={cn("size-5", item.color)} />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 mt-auto">
                <div className="rounded-2xl bg-white/5 p-4 border border-white/5 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1DB954] to-emerald-700 text-white shadow-inner">
                            <UserIcon size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold truncate max-w-[120px]">{authUser?.name}</span>
                            <span className="text-[10px] text-white/40 uppercase tracking-tighter">Premium Member</span>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => logout()}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-white/5 active:scale-[0.98]"
                    >
                        {isLoggingOut?
                            <span className="loading loading-ring loading-md"></span>
                            :
                            <>
                                <LogOut size={14} />
                                Log Out
                            </> 
                        }
                    </button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
};

export default SideBar;