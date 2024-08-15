import { useContext, useState } from "react"
import { AppContext } from "../../Context/AppContext"
import { useNavigate } from "react-router-dom"




const Create=()=>{
const {token} = useContext(AppContext)
const [message,setMessage]=useState({})
     const [formData,setFormData]=useState({
          "title":"",
          "body":""
     })
     const navigate=useNavigate()
     const handleCreate=async(e)=>{
          e.preventDefault();
          const res = await fetch("/api/posts",{
               method:"POST",
               headers:{
                    Authorization:`Bearer ${token}`
               },
               body:JSON.stringify(formData)
          })
          const data = await res.json();
     
          if(data.errors){
               setMessage(data.errors)
          }else{
               //console.log(data)
               navigate("/")
          }
     }
    return(
       <>
       <h1 className="title">Create a new Post</h1>
       <form className="w-1/2 mx-auto space-y-6" onSubmit={handleCreate} action="">
        <div>
             <input value={formData.title} onChange={(e)=>setFormData({...formData,title:e.target.value})} type="text" placeholder="post title" />
             {message.title && <p >{message.title}</p>}
        </div>
        <div>
             <textarea value={formData.body} onChange={(e)=>setFormData({...formData,body:e.target.value})} rows={6} placeholder="place content" />
             
        </div>
        <button className="primary-btn">Create post</button>
       </form>
       </>
    )
}
export default Create