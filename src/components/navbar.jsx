import { Routes, Route, NavLink, Navigate } from "react-router";
import NotFound from "../pages/notFound";

import Profile from "../pages/profile";
import Home from "../pages/home";
import Exam from "../pages/exams";
import Student from "../pages/students";
import Subject from "../pages/subjects";

function NavBar() {
    return (
        <>
            <nav className="h-[10vh] w-full bg-gray-400 flex items-center justify-between p-3">

                <div className="font-bold text-3xl">
                    Exam-submission
                </div>

                <div className="flex gap-5">

                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            isActive
                                ? "text-2xl border-b-2"
                                : "text-2xl"
                        }
                    >
                        Profile
                    </NavLink>
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            isActive
                                ? "text-2xl border-b-2"
                                : "text-2xl"
                        }
                    >
                        Home
                    </NavLink>


                </div>

                <div className="flex items-center gap-2">

                    <div className="h-[5vh] aspect-square rounded-full bg-white" />

                    <div className="font-bold text-xl">
                        User
                    </div>

                </div>

            </nav>

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/home" replace />}
                />

                <Route
                    path="/home"
                    element={<Home />}
                >
                    <Route
                        index
                        element={<Navigate to="students" replace />}
                    />

                    <Route
                        path="students"
                        element={<Student />}
                    />

                    <Route
                        path="exams"
                        element={<Exam />}
                    />

                    <Route
                        path="subjects"
                        element={<Subject />}
                    />
                </Route>

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>
        </>
    );
}

export default NavBar;
