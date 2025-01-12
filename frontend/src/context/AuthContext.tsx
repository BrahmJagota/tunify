import { useContext, createContext, useState, useEffect, ReactNode } from "react";
import { logout, refreshAccessToken } from "../utilities/auth";
import axios from "axios";
interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
    user: UserInterface,
    setUser: (user: UserInterface) => void;
}

interface UserInterface {
    username: string;
    userId: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState<UserInterface>({
        username: '',
        userId: '',
    })

    useEffect(()=> {
        const checkAdmin = async () => {
            
            const adminCheck = await axios.get('http://localhost:3000/me',  {withCredentials: true});
            const {admin, user} = adminCheck.data;
            setIsAdmin(admin);
            setUser(user);
        }
            const checkToken = async () => {
                const token = document.cookie.split('; ').find((row) => row.startsWith("accessToken="));
                const refreshToken = document.cookie.split('; ').find((row) => row.startsWith("refreshToken="));
                if(token) {
                    if(token == "accessToken=undefined"){
                        refreshAccessToken({setIsAuthenticated, setIsLoading, setIsAdmin})
                    }
                    setIsAuthenticated(true);
                    setIsLoading(false);
                    await checkAdmin();
                    return;
                } else if(refreshToken){
                    await refreshAccessToken({setIsAuthenticated, setIsLoading, setIsAdmin})
                    return;
                } else {
                    setIsAuthenticated(false);
                    setIsLoading(false);
                    setIsAdmin(false);
                }
            }
            checkToken();
        },[])
    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, isLoading, setIsLoading, isAdmin, setIsAdmin, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = ()=> {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an Authprovider")
    }
    return context;
}