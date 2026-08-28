import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState({
        id: 1,
        fullName: "Admin User",
        email: "admin@example.com",
        role: "admin",
        isActive: true
    });

    const value = useMemo(() => ({
        user,
        setUser,
        isAdmin: user?.role === "admin",
        isStudent: user?.role === "student"
    }), [user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
