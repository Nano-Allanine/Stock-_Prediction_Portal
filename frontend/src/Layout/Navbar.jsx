
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate();

  const isAuthenticated = Boolean(
    localStorage.getItem("access_token")
  );

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navi">
      <span>
        <NavLink to="/">Stock Prediction</NavLink>
      </span>

      <ul className="list">
        {isAuthenticated ? (
          <>
            <li>
              <Button className="logi" asChild>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </Button>
            </li>

            <li>
              <Button
                className="Regi"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Button className="logi" asChild>
                <NavLink to="/login">Login</NavLink>
              </Button>
            </li>

            <li>
              <Button className="Reg" asChild>
                <NavLink to="/register">Register</NavLink>
              </Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;