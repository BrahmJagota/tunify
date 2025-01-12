import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Home() {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/music');
      };

    return (
        <div className="w-screen h-screen flex flex-col justify-end bg-[url('./assets/01.jpg')] bg-cover bg-center bg-no-repeat font-bold text-8xl text-white ">
            <div className="flex items-center justify-between">
            <div className="mb-10 ml-8  ">
                <div>
            <span className="inline text-[#ec2d0a]">Feel </span>
            <h1 className="inline">the beat</h1>
            </div>
            <div>
            <h1 className="inline">own the </h1>
            <span className="inline text-[#ec2d0a]">sound</span>
            </div>
            </div>
            <div>
                <Link className="w-28 h-28 rounded-full cursor-pointer bg-red-400 mr-32 block" to="/music"> </Link>
            </div>
            </div>
        </div>
    )
}