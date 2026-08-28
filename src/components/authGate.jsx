import { Navigate } from "react-router";
import { useAuth } from "../context/authContext";

function AuthGate({ children }) {

    const { isAuthenticated } =
        useAuth();

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
}

export default AuthGate;
