import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";



const Register=()=>{
    //
    const {setToken}=useContext(AppContext)
    console.log(name)
    const navigate=useNavigate();
    const [error,setEError]=useState({});
    const [formData,setFormData]=useState(
       {
        "name":"",
         "email":"",
         "password":"",
         "password_confirmation":""
       }
    )

    const handleRegister=async(e)=>{
        e.preventDefault();
        const res=await fetch("/api/register",{
            method:"POST",
            body:JSON.stringify(formData)
        })
       const data =await res.json();
       if(data.errors){
        // console.log(data?.errors)
        setEError(data.errors)
       
       }else{
        localStorage.setItem("token",data?.token)
        setToken(data.token)
        navigate("/")
       }
      
    }
    return(
  <>
   <h1 className="title">Register a new account</h1>

   <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
    <div>
        <input value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} type="text" placeholder="Name" />
        {error.name && <p className="error">{error.name}</p>}
    </div>
    <div>
        <input value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} type="text" placeholder="Email"/>
        {error.email && <p className="error">{error.email}</p>}
    </div>
    <div>
        <input value={formData.password} type="password" onChange={(e)=>setFormData({...formData,password:e.target.value})} placeholder="password" />
        {error.password && <p className="error">{error.password}</p>}
    </div>
    <div>
        <input  value={formData.password_confirmation} onChange={(e)=>setFormData({...formData,password_confirmation:e.target.value})} type="password" placeholder="confirm password" />
    </div>
    <button className="primary-btn" type="submit">Register</button>
   
   </form>
  </>
    )
}
export default Register