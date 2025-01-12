import { createContext, useContext, useState, useEffect } from "react";

interface RazorpayContextType {
    displayRazorpay: boolean;
    setDisplayRazorpay: (displayRazorpay: boolean) => void;
}

const RazorpayContext = createContext<RazorpayContextType | undefined>(undefined);

export const RazorPayContextProvider:React.FC<{children: React.ReactNode}> = ({children}) => {
    const [displayRazorpay, setDisplayRazorpay]  = useState(false);
    return (
        <RazorpayContext.Provider value={{displayRazorpay, setDisplayRazorpay}}>
            {children}
        </RazorpayContext.Provider>
    )
} 

export const useRazorpayContext = () => {
    const context = useContext(RazorpayContext);
    if(!context){
        throw new Error("useAuth must be used within an Authprovider")
    }
    return context;
}