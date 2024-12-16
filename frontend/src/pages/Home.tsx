import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    
    const onClick = () => {
        navigate("/game");
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <button className="font-bold text-gray-50 bg-green-800 px-8 py-4 rounded-lg" onClick={onClick}>
                Join Now!
            </button>
        </div>
    )
}

export default Home
