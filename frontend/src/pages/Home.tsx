import useAuthStore from "@/stores/authStore";

const Home=()=>{
    const {authUser,logout}=useAuthStore();
    return(
        <>
            <h1 className="text-white">Home</h1>
            <p className="text-white">{authUser?.name}</p>
            <p className="text-white">{authUser?.email}</p>
            <button onClick={logout}>Logout</button>
        </>
    );
}

export default Home;