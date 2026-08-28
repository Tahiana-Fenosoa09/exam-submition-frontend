import { Navigate } from "react-router";
import { useAuth } from "../context/useAuth";


function ProtectedRoute({ children, requiredRole }) {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return (
            <div className="w-full h-dvh flex items-center justify-center">
                <p className="text-xl">Chargement...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default ProtectedRoute;
