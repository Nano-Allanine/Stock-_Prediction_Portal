import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';
import { Button } from "@/components/ui/button";


const Navbar = () => {
  return (
    <nav className="navi">
        <span>Stock Prediction</span>
        <ul className="list">
                <li><NavLink to ='/'>Home</NavLink></li>
                <li>
                <Button className="logi"><NavLink to="/login">Login</NavLink></Button>
                </li>
                <li>
                    <Button className="Reg"><NavLink to="/register">Register</NavLink></Button>
                </li>
        </ul>
    </nav>
  )
}

export default Navbar