"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Define the shape of our context
const UserContext = createContext(undefined)

export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        if (typeof window !== "undefined") {
            const savedUser = localStorage.getItem("user")
            return savedUser ? JSON.parse(savedUser) : null
        }
        return null
    })

    // Update localStorage when user changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user))
        } else {
            localStorage.removeItem("user")
        }
    }, [user])

    const login = (userData) => {
        setUser(userData)
    }

    const logout = () => {
        setUser(null)
    }

    const updateUserPreferences = (preferences) => {
        setUser((prevUser) => ({
            ...prevUser,
            preferences: {
                ...prevUser?.preferences,
                ...preferences,
            },
        }))
    }

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateUserPreferences,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// Custom hook for using the user context
export function useUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}
