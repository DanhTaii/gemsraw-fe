import { NavLink, useLocation } from "react-router-dom";
import { useUser } from "../context";
import { FaUserCircle } from "react-icons/fa";
import { ReactComponent as DiamondIcon } from "./Vector.svg";

function Navbar() {
  const { user, isAuthenticated, logout } = useUser();
  const location = useLocation();
  const isFeaturePage = [
    "/dictionary",
    "/flashcard",
    "/mindmap",
    "/exercise",
  ].some((path) => location.pathname.startsWith(path));

  return (
    <nav className="navbar navbar-dark navbar-expand bg-light shadow px-3">
      <div className="container">
        <NavLink to="/" className="navbar-brand text-primary fw-bold" style = {{color: "#2C67A9"  }}>
          <DiamondIcon style={{ width: "30px", fill: "#2C67A9" }} />
          Gemsraw
          {/* 💎 Gemsraw */}
        </NavLink>

        {isFeaturePage && (
          <div className="navbar-nav me-auto">
            <NavLink className="nav-link" to="/dictionary">
              Dictionary
            </NavLink>
            <NavLink className="nav-link" to="/flashcard">
              Flashcard
            </NavLink>
            <NavLink className="nav-link" to="/mindmap">
              Mindmap
            </NavLink>
            <NavLink className="nav-link" to="/exercise">
              Exercise
            </NavLink>
          </div>
        )}
        <div className="nav-actions">
          {isAuthenticated ? (
            <div className="user-menu">
              <span>Welcome, {user.name}</span>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="nav-link ms-auto">
              <FaUserCircle size={24} />
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;