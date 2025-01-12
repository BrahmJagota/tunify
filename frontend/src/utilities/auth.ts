import axios from "axios"
import { useAuthContext } from "../context/AuthContext";

interface LoginInterface {
  credential: string;
   clientId: string;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
   setIsLoading: (isLoading: boolean) => void;
}
interface AuthInterface {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
   setIsLoading: (isLoading: boolean) => void;
   setIsAdmin: (isAdmin: boolean) => void;
}

export const loginfun = async ({
  credential,
  clientId,
  setIsAuthenticated,
  setIsLoading,
}: LoginInterface) => {
  const response = axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth-google`, {
    credential, clientId
  }, {withCredentials: true})
  .then((res:any) => {
        setIsAuthenticated(true);
        setIsLoading(false);
    })
    .catch(err => console.error("Login failed",err));
}

export const logout = ({setIsAuthenticated, setIsLoading}: AuthInterface) => {
    document.cookie = 'accessToken=: Max-Age=0; path=/';
    document.cookie = 'refreshToken=; Max-Age=0; path=/';
    window.location.href = '/login';
    setIsAuthenticated(false);
    setIsLoading(false);
}

export const refreshAccessToken = async ({setIsAuthenticated, setIsLoading, setIsAdmin}: AuthInterface): Promise<string> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/refresh-token`, {}, {
        withCredentials: true,
      });
  
      const { accessToken } = response.data;
      setIsAuthenticated(true);
      setIsLoading(false);
      const checkAdmin = await axios.get(`/${import.meta.env.VITE_BACKEND_URL}/me`, {withCredentials: true})
      const { admin } = checkAdmin.data;
      setIsAdmin(admin)
      return accessToken;
    } catch (error) {
      setIsAuthenticated(false);
      setIsLoading(false);
      setIsAdmin(false);
      console.error('Error refreshing access token:', error);
      throw new Error('Failed to refresh access token');
    }
  };