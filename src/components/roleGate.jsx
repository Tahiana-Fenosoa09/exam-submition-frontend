import { Navigate } from "react-router";
import { useAuth } from "../context/authContext";

function RoleGate({
    role,
    children
}) {

    const { user } = useAuth();

    if (user?.role !== role) {
        return (
            <Navigate
                to="/home"
                replace
            />
        );
    }

    return children;
}

export default RoleGate;
