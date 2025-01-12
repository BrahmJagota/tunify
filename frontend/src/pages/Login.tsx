import { GoogleLogin, useGoogleLogin, googleLogout } from "@react-oauth/google";
import { loginfun } from "../utilities/auth";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface User {
    access_token: string;
    [key: string]: any; // For any additional properties returned in the response
}

interface Profile {
    id: string;
    email: string;
    name: string;
    picture: string;
    [key: string]: any; // For any additional properties returned in the response
}

export default function Login () {
    const navigate = useNavigate();
    const {isAuthenticated,setIsAuthenticated, setIsLoading} = useAuthContext();
    
    const responseMessage = (response:any) => {
        loginfun({credential: response.credential,clientId: response.clientId, setIsAuthenticated, setIsLoading})
    };
    const errorMessage = (error:any ) => {
        console.log(error);
    };

    useEffect(() => {
      isAuthenticated && navigate('/music')
    },[isAuthenticated])
    return (
        <div className="w-screen h-screen  bg-[#fff] flex justify-center items-center">
            <div className="w-4/5 border rounded-md border-black flex flex-col p-4 justify-center gap-4 text-lg  sm:w-2/5 lg:w-1/4">
    
        <h1 className="text-2xl font-bold text-gray-800 text-center">Login</h1>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Disabled"
            disabled
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Disabled"
            disabled
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Disabled"
            disabled
          />

        <button
        disabled
          className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Disabled
        </button>
        <div className="mt-4">
            <GoogleLogin onSuccess={responseMessage} onError={() => errorMessage} />
            </div>
        </div>
            </div>
        </div>
    )

  
}