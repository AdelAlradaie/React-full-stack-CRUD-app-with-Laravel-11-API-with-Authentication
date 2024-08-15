import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";



const Login=()=>{
    //
    const {setToken}=useContext(AppContext)
    console.log(name)
    const navigate=useNavigate();
    const [error,setEError]=useState({});
    const [formData,setFormData]=useState(
       {
       
         "email":"",
         "password":"",
         
       }
    )

    const handleLogin=async(e)=>{
        e.preventDefault();
        const res=await fetch("/api/login",{
            method:"POST",
            body:JSON.stringify(formData)
        })
       const data =await res.json();
       console.log(data)
       if(data.errors){
        // console.log(data?.errors)
        setEError(data.errors)
       
       }else{
        localStorage.setItem("token",data.token)
        setToken(data.token)
         navigate("/")
       }
      
    }
    return(
  <>
   <h1 className="title">Login to your account</h1>

   <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6">
    
    <div>
        <input value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} type="text" placeholder="Email"/>
        {error.email && <p className="error">{error.email}</p>}
    </div>
    <div>
        <input value={formData.password} type="password" onChange={(e)=>setFormData({...formData,password:e.target.value})} placeholder="password" />
        {error.password && <p className="error">{error.password}</p>}
    </div>
    
    <button className="primary-btn" type="submit">Login</button>
   
   </form>
  </>
    )
}
export default Login