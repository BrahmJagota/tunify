import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Dropdown () {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logout`, {withCredentials: true})
        .then((res) => {
            navigate('/login');
        });
        
    }

    return (
        <div className="w-18 bg-[#1a1a1a] rounded-lg absolute right-4 top-16">
            <div className="flex flex-col  text-xl">
                <ul>
                    <li className="hover:bg-[#34332f] p-2 cursor-pointer hover:rounded-lg  ">Purchased music</li>
                    <li className="hover:bg-[#34332f] p-2 cursor-pointer hover:rounded-lg" onClick={handleLogout}>Logout</li>
                </ul>
            </div>
        </div>
    )
}