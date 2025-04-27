import { createContext, useContext, useState } from "react"

const AppContext = createContext(undefined)

export function AppProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [notification, setNotification] = useState(null)

    const showNotification = (message, type = "info", duration = 3000) => {
        setNotification({ message, type })

        if (duration) {
            setTimeout(() => {
                setNotification(null)
            }, duration)
        }
    }

    const clearNotification = () => {
        setNotification(null)
    }

    const setLoadingState = (loading) => {
        setIsLoading(loading)
    }

    const setErrorState = (errorMessage) => {
        setError(errorMessage)
        if (errorMessage) {
            showNotification(errorMessage, "error")
        }
    }

    const clearError = () => {
        setError(null)
    }

    const value = {
        isLoading,
        error,
        notification,
        showNotification,
        clearNotification,
        setLoadingState,
        setErrorState,
        clearError,
    }

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    )

}

export function useApp() {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider")
    }
    return context
}
