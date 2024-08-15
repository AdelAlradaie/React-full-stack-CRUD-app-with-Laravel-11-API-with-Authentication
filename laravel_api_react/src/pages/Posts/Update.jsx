import { useContext, useState, useEffect } from "react"
import { AppContext } from "../../Context/AppContext"
import { useNavigate, useParams } from "react-router-dom"




const Update = () => {
    const { token, user } = useContext(AppContext)
    const { id } = useParams()
    const [message, setMessage] = useState({})
    const [formData, setFormData] = useState({
        "title": "",
        "body": ""
    })
    const navigate = useNavigate()
    const handleUpdate = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/posts/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json();

        if (data.errors) {
            setMessage(data.errors)
        } else {
            //console.log(data)
            navigate("/")
        }
    }
    const getPost = async () => {
        const res = await fetch(`/api/posts/${id}`)
        const data = await res.json();
        console.log(data.post.title)
        if (data.post.user_id !== user.id) {
            navigate("/")
        }
        if (res.ok) {
           setFormData({
            title:data.post.title,
            body:data.post.body
           })
        }
    }
    useEffect(() => {
        getPost();

    }, [])

    return (
        <>
            <h1 className="title">Update Your Post</h1>
            <form className="w-1/2 mx-auto space-y-6" onSubmit={handleUpdate} action="">
                <div>
                    <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" placeholder="post title" />
                    {message.title && <p className="text-red-500 mt-2 text-sm font-bold">{message.title}</p>}
                </div>
                <div>
                    <textarea value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })} rows={6} placeholder="place content" />
                    {message.body && <p className="text-red-500 mt-2 text-sm font-bold">{message.body}</p>}

                </div>
                <button className="primary-btn">Update post</button>
            </form>
        </>
    )
}
export default Update