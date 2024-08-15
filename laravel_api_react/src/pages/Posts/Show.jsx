import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

import { Link } from "react-router-dom";

const Show = () => {
    const [post, setPost] = useState(null)
    const { id } = useParams();
    const navigate=useNavigate()
    const { user ,token} = useContext(AppContext);
    console.log(post)
    const getPost = async () => {
        const res = await fetch(`/api/posts/${id}`)
        const data = await res.json();

        if (res.ok) {
            setPost(data.post)
        }
    }
    const handleDelete=async(e)=>{
        e.preventDefault();
        const res = await fetch(`/api/posts/${id}`,{
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        if(res.ok){
            navigate("/")
        }
    }
    useEffect(() => {
        getPost();
    }, [])
    return (
        <>
            {post ?
                (
                    <div key={post.id} className="mt-4 p-4 border border-slate-400 border-dashed rounded-md">
                        <div className="mb-4 flex items-start justify-between">
                            <div>
                                <h2 className="font-bold text-2xl">{post.title}</h2>
                                <small className="text-slate-600 text-xs">created by {post.user.name} on {new Date(post?.created_at).toLocaleTimeString()} </small>
                            </div>

                        </div>
                        <p>{post.body}</p>
                        {user && user.id === post.user.id &&<div className="flex items-center  justify-end gap-4">

                            <Link className="bg-green-500 text-white text-sm rounded-lg py-1 px-3"
                                to={`/posts/update/${post.id}`} >Update</Link>
                                <form onSubmit={handleDelete}>
                                <button className="bg-red-500 text-white text-sm rounded-lg py-1 px-3"
                                 >Delete</button>
                                </form>
                        </div>}
                    </div>
                )
                : (
                    <p>page doesnot exist</p>
                )

            }
        </>
    )
};


export default Show
