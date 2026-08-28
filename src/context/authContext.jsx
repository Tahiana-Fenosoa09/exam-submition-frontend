import {
    createContext,
    useContext,
    useMemo,
    useState
} from "react";

const AuthContext = createContext(null);

const users = [
    {
        id: 1,
        username: "admin",
        password: "admin123",
        fullName: "Admin User",
        email: "admin@example.com",
        role: "admin",
        isActive: true,
        enrolledCourses: []
    },
    {
        id: 2,
        username: "student",
        password: "student123",
        fullName: "Student User",
        email: "student@example.com",
        role: "student",
        isActive: true,
        enrolledCourses: [1, 3]
    }
];

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {

        const savedUser =
            localStorage.getItem("user");

        if (!savedUser) {
            return null;
        }

        try {
            return JSON.parse(savedUser);
        } catch {
            localStorage.removeItem("user");
            return null;
        }
    });

    function login(username, password) {

        const foundUser = users.find(
            item =>
                item.username === username &&
                item.password === password
        );

        if (!foundUser) {
            return {
                success: false,
                message:
                    "Invalid username or password."
            };
        }

        if (!foundUser.isActive) {
            return {
                success: false,
                message:
                    "This account is inactive."
            };
        }

        const authenticatedUser = {
            ...foundUser
        };

        delete authenticatedUser.password;

        setUser(authenticatedUser);

        localStorage.setItem(
            "user",
            JSON.stringify(authenticatedUser)
        );

        return {
            success: true
        };
    }

    function logout() {
        setUser(null);
        localStorage.removeItem("user");
    }

    const value = useMemo(
        () => ({
            user,
            setUser,
            login,
            logout,
            isAuthenticated:
                Boolean(user),
            isAdmin:
                user?.role === "admin",
            isStudent:
                user?.role === "student"
        }),
        [user]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}
