import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useApp } from "../context"

function MainLayout({ children }) {
    const { notification, clearNotification } = useApp()

    return (
        <div className="app-container d-flex flex-column min-vh-100">
            <Navbar />

            <main className="main-content flex-grow-1">
                {notification && (
                    <div
                        className={`alert alert-${notification.type === "error" ? "danger" : notification.type} alert-dismissible fade show position-fixed top-25 end-0 m-3`}
                        role="alert"
                        style={{ zIndex: 9999, minWidth: "300px", marginTop: "70px" }} // slight push below navbar
                    >
                        {notification.message}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={clearNotification}
                            aria-label="Close"
                        ></button>
                    </div>
                )}

                {children}
            </main>

            <Footer />
        </div>
    )
}

export default MainLayout;
