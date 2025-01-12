import { Navigate} from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
interface PrivateRouteProps {
    Component: React.ComponentType
}

export const PrivateRoute:React.FC<PrivateRouteProps> = ({Component}) => {
    const { isAuthenticated, isLoading } = useAuthContext();
    if (isLoading) {
        return <div>Loading...</div>; 
    }
    return isAuthenticated ? <Component /> : <Navigate to="/login" />
}
