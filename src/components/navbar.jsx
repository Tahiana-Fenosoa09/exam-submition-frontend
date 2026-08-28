import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";

function NavBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const routes = [
        { to: "/profile", pathName: "Profile" },
        { to: "/home", pathName: "Home" },
    ];

    const links = routes.map((e) => (
        <NavLink
            key={e.to}
            to={e.to}
            className={({ isActive }) => (isActive ? "text-2xl border-b-2" : "text-2xl")}
        >
            {e.pathName}
        </NavLink>
    ));

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav className="h-[10vh] w-full bg-gray-400 flex place-content-between p-3">
            <div className="flex gap-2">
                <div className="font-bold text-3xl">Exam-submission</div>
            </div>
            <div className="flex gap-5 items-center">{links}</div>
            <div className="gap-3 flex items-center">
                <div className="h-[5vh] aspect-square rounded-3xl bg-white"></div>
                <div className="font-bold text-xl">{user?.email}</div>
                <button
                    onClick={handleLogout}
                    className="font-bold text-sm bg-black text-white rounded-lg px-3 py-1"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default NavBar;
