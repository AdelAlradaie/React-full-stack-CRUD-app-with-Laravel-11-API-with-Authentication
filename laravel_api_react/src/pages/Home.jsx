import { useState } from "react";
import { useEffect } from "react"
import { Link } from "react-router-dom";


const Home=()=>{
    const [posts,setPosts]=useState([])
   console.log(posts)
const getPosts=async()=>{
    const res =await fetch("/api/posts");
    const data =await res.json();
    if(res.ok){
        setPosts(data.posts)
    }
  
}
    useEffect(()=>{
        getPosts();
    },[])
    return (
        <>
        <h1 className="title">Latest Posts  </h1>
        {posts.length>0 ? 
        
            posts.map((post)=>(
                <div key={post.id} className="mb-4 p-4 border border-slate-400 border-dashed rounded-md">
                    <div className="mb-2 flex items-start justify-between">
                        <div>
                            <h2 className="font-bold text-2xl">{post.title}</h2>
                            <small className="text-slate-600 text-xs">created by {post.user.name} on {new Date(post.created_at).toLocaleTimeString()} </small>
                        </div>
                        <Link className="bg-blue-500 text-sm text-white px-3 rounded-lg py-1" to={`/posts/${post.id}`}>Read More</Link>
                    </div>
                    <p>{post.body}</p>
                </div>
            ))
        
        : <p>there are no posts</p>}
        </>
    )
}
export default Home