import { BrowserRouter, Route, Routes } from "react-router-dom"
import LayOut from "./pages/LayOut"
import Home from "./pages/Home"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import { useContext, useEffect } from "react"
import { AppContext } from "./Context/AppContext"
import Create from "./pages/Posts/Create"
import Show from "./pages/Posts/Show"
import Update from "./pages/Posts/Update"

const App = () => {

  const { user } = useContext(AppContext)
  useEffect(()=>{

  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<Home />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/create" element={user ? <Create /> : <Home />} />
          <Route path="/posts/:id" element={<Show/>}/>
          <Route path="/posts/update/:id" element={user ? <Update/> : <Home/>}/>
       
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App