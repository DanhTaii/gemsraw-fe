"use client"

import { NavLink, useLocation } from "react-router-dom"
import { useTheme, useUser } from "../context"
import { FaUserCircle } from "react-icons/fa"

function Navbar() {
    const { theme, toggleTheme } = useTheme()
    const { user, isAuthenticated, logout } = useUser()
    const location = useLocation();
    const isFeaturePage = ['/dictionary', '/flashcard', '/mindmap', '/exercise']
        .some(path => location.pathname.startsWith(path));

    return (
        <nav className={`navbar ${theme === "dark" ? "navbar-dark" : "navbar-light"} navbar-expand bg-light shadow-sm px-3`}>
            <div className="container">
                <NavLink to="/" className="navbar-brand fw-bold">
                    💎 Gemsraw
                </NavLink>

                {isFeaturePage && (
                    <div className="navbar-nav">
                        <NavLink className="nav-link" to="/dictionary">Dictionary</NavLink>
                        <NavLink className="nav-link" to="/flashcard">Flashcard</NavLink>
                        <NavLink className="nav-link" to="/mindmap">Mindmap</NavLink>
                        <NavLink className="nav-link" to="/exercise">Exercise</NavLink>
                    </div>
                )}
                <div className="nav-actions">
                    <button onClick={toggleTheme} className="theme-toggle">
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>
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
    )
}

export default Navbar;
