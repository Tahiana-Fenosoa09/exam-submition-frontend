import { createContext, useState, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/axiosConfig";


export const AuthContext = createContext(null);


function decodeUserFromToken(token) {
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);

        
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            return null;
        }

       
        return {
            email: decoded.sub ?? decoded.email,
            role: decoded.role,
        };
    } catch {
        
        return null;
    }
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    
    const user = useMemo(() => decodeUserFromToken(token), [token]);

    async function login(email, password) {
        const response = await api.post("/auth/login", { email, password });
        const receivedToken = response.data.token;
        localStorage.setItem("token", receivedToken);
        setToken(receivedToken);
        return receivedToken;
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    const isAuthenticated = !!token && !!user;
    const isAdmin = user?.role === "admin";
    const isStudent = user?.role === "student";

    return (
        <AuthContext.Provider
            value={{ token, user, login, logout, isAuthenticated, isAdmin, isStudent, loading: false }}
        >
            {children}
        </AuthContext.Provider>
    );
}
