"use client"

import { ThemeProvider } from "./ThemeContext"
import { UserProvider } from "./UserContext"
import { FlashcardProvider } from "./FlashcardContext"
import { DictionaryProvider } from "./DictionaryContext"
import { AppProvider } from "./AppContext"

// Combine all providers into a single provider component
export function AppContextProvider({ children }) {
    return (
        <AppProvider>
            <ThemeProvider>
                <UserProvider>
                    <FlashcardProvider>
                        <DictionaryProvider>{children}</DictionaryProvider>
                    </FlashcardProvider>
                </UserProvider>
            </ThemeProvider>
        </AppProvider>
    )
}

// Export all context hooks for easy imports
export { useApp } from "./AppContext"
export { useTheme } from "./ThemeContext"
export { useUser } from "./UserContext"
export { useFlashcards } from "./FlashcardContext"
export { useDictionary } from "./DictionaryContext"
