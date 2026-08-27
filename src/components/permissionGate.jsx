import { useAuth } from "../context/authContext";
import { can } from "../utils/permissions";

function PermissionGate({
    resource,
    action,
    children,
    fallback = null
}) {
    const { user } = useAuth();

    if (!can(user, resource, action)) {
        return fallback;
    }

    return children;
}

export default PermissionGate;
