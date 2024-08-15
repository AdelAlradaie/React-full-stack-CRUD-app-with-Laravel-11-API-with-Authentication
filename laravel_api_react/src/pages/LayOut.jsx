

import { useContext } from "react"
import { Outlet ,Link, useNavigate} from "react-router-dom"
import { AppContext } from "../Context/AppContext"

const LayOut=()=>{
const {user,token,setToken,setUser}=useContext(AppContext);
const navigate = useNavigate()
const handleLogOut=async(e)=>{
    
    e.preventDefault()
    const res = await fetch("/api/logout",{
        method:"POST",
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    const data = await res.json();
    console.log(data)
    
    setToken(null)
    setUser(null)
    localStorage.removeItem("token")
 navigate("/login")
}

    return (
     <>
      <header>
        <nav>
            <Link className="nav-link" to={"/"}>Home</Link>
           {user && user ?(
           <div className="flex items-center space-x-4">
             <p className="text-slate-400 text-xs">Welcome back {user.name}</p>
             <Link className="nav-link" to={"/create"}>new post</Link>
             <form  onSubmit={handleLogOut}>
                <button className="nav-link">LogOut</button>
             </form>
           </div>
           ):(
             <>
             <div className="space-x-4">
             <Link className="nav-link" to={"/login"}>Login</Link>
             <Link className="nav-link" to={"/register"}>Register</Link>
             </div> 
             </>
           )}
        </nav>
     
      </header>
      <main>
        <Outlet/>
      </main>
     </>
    )
}
export default LayOut