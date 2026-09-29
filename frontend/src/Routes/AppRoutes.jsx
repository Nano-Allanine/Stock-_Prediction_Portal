
import {Routes, Route, useLocation} from "react-router-dom"
import Login from "@/Sections/Login";
import Register from "@/Sections/Register";
import Home from "@/pages/Home";


const AppRoutes = () => {
    const location = useLocation("")
  return (
    <div className="transition" element={location.pathname} >
    <Routes>
        <Route path="/" element={<Home />}/>
         <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>

    </Routes>
    </div>
  )
}

export default AppRoutes