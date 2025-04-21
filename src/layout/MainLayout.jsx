"use client"

import { useEffect } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useApp, useTheme } from "../context"

function MainLayout({ children }) {
    const { notification, clearNotification } = useApp()
    const { theme } = useTheme()

    // Apply theme class to body
    useEffect(() => {
        document.body.className = theme
    }, [theme])

    return (
        <div className={`app-container ${theme}`}>
            <Navbar />

            <main className="main-content">
                {notification && (
                    <div className={`notification ${notification.type}`}>
                        <p>{notification.message}</p>
                        <button onClick={clearNotification} className="close-notification">
                            &times;
                        </button>
                    </div>
                )}

                {children}
            </main>

            <Footer />
        </div>
    )
}

export default MainLayout;
