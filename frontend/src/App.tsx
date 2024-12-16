import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Game from "./pages/Game"

function App() {
    return (
        <div className="w-full bg-gray-800 h-screen text-white">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/game" element={<Game/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
