"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Define the shape of our context
const ThemeContext = createContext(undefined)

// Theme options
export const themes = {
    light: "light",
    dark: "dark",
}

export function ThemeProvider({ children }) {
    // Get initial theme from localStorage or default to light
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme")
            return savedTheme || themes.light
        }
        return themes.light
    })

    // Update localStorage when theme changes
    useEffect(() => {
        localStorage.setItem("theme", theme)
        // Apply theme class to document body
        document.body.className = theme === themes.dark ? "dark-theme" : "light-theme"
    }, [theme])

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === themes.light ? themes.dark : themes.light))
    }

    const value = {
        theme,
        setTheme,
        toggleTheme,
        isDarkMode: theme === themes.dark,
    }

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// Custom hook for using the theme context
export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}
