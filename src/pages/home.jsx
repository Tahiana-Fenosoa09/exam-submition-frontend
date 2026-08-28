import { NavLink, Outlet } from "react-router";

function Home() {
    return (
        <div className="h-full w-full flex flex-col gap-5 p-2">

            <h1 className="text-3xl font-bold text-gray-500">
                HOME PAGE
            </h1>

            <nav className="w-full flex items-center gap-5">

                <NavLink
                    to="students"
                    className={({ isActive }) =>
                        isActive
                            ? "text-2xl border-b-2 text-gray-500"
                            : "text-2xl"
                    }
                >
                    Students
                </NavLink>

                <NavLink
                    to="exams"
                    className={({ isActive }) =>
                        isActive
                            ? "text-2xl border-b-2 text-gray-500"
                            : "text-2xl"
                    }
                >
                    Exams
                </NavLink>

                <NavLink
                    to="subjects"
                    className={({ isActive }) =>
                        isActive
                            ? "text-2xl border-b-2 text-gray-500"
                            : "text-2xl"
                    }
                >
                    Subjects
                </NavLink>

            </nav>

            <Outlet />

        </div>
    );
}

export default Home;
