import { Navigate } from "react-router-dom";
import type { User } from "firebase/auth";

interface ProtectedRouteProps {
    children: React.ReactNode;
    user: User | null;
    loading: boolean;
}

function ProtectedRoute({ children, user, loading }: ProtectedRouteProps){
    if (loading){
        return <p>Comprobando sesión...</p>;
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login" />;
}

export default ProtectedRoute;