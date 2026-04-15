import { BrowserRouter,Route,Routes,Navigate } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import { Toaster } from "@/components/ui/sonner"
import useAuthStore from "./stores/authStore"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

function App() {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();
  
  useEffect(() => {
    checkAuth();
  },[]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/register" element={!authUser ? <Register/> : <Navigate to="/home"/>}></Route>
            <Route path="/login" element={!authUser ? <Login/> : <Navigate to="/home"/>}></Route>
            <Route path="/home" element={authUser ? <Dashboard/> : <Navigate to="/login"/>}></Route>
            <Route path="/*" element={authUser ? <Navigate to="/home"/> : <Navigate to="/login"/>}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
