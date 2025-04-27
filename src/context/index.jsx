import { ThemeProvider } from "./ThemeContext"
import { UserProvider } from "./UserContext"
import { FlashcardProvider } from "./FlashcardContext"
import { DictionaryProvider } from "./DictionaryContext"
import { AppProvider } from "./AppContext"

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

export { useApp } from "./AppContext"
export { useTheme } from "./ThemeContext"
export { useUser } from "./UserContext"
export { useFlashcards } from "./FlashcardContext"
export { useDictionary } from "./DictionaryContext"
