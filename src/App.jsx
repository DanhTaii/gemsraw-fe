import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import Dictionary from "./pages/dictionary/Dictionary"
import Flashcard from "./pages/flashcard/Flashcard"
import Exercise from "./pages/exercise/Excercise"
import Mindmap from "./pages/mindmap/Mindmap"
import { AppContextProvider } from "./context"

function App() {
    return (
        <AppContextProvider>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dictionary" element={<Dictionary />} />
                    <Route path="/flashcard" element={<Flashcard />} />
                    <Route path="/exercise" element={<Exercise />} />
                    <Route path="/mindmap" element={<Mindmap />} />
                </Routes>
            </MainLayout>
        </AppContextProvider>
    )
}

export default App;
