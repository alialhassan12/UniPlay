import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import SideBar from "@/components/SideBar";
import usePagesStore from "@/stores/pagesStore";
import Home from "./DashboardPages/Home";
import Library from "./DashboardPages/Library";
import Playlist from "./DashboardPages/Playlist";

const Dashboard = () => {
    const {currentPage}=usePagesStore();

    return (
        <div className="flex h-screen bg-[#000000] overflow-hidden">
            <SidebarProvider defaultOpen={true}>
                <SideBar />
                <main className="flex-1 relative flex flex-col min-w-0 bg-[#0a0a0a]">
                    <div className="flex items-center p-4 border-b border-white/5">
                        <SidebarTrigger className="text-white/70 hover:bg-white/5 hover:text-white cursor-pointer" />
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        {/* Content would go here based on usePagesStore */}
                        {currentPage==="home" && <Home/>}
                        {currentPage==="library" && <Library/>}
                        {currentPage==="playlist" && <Playlist/>}
                        
                    </div>
                </main>
            </SidebarProvider>
        </div>
    );
};

export default Dashboard;