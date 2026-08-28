import {
    Routes,
    Route,
    Navigate,
    NavLink
} from "react-router";

import NotFound from "../pages/notFound";
import Profile from "../pages/profile";
import Home from "../pages/home";
import Exam from "../pages/exams";
import Student from "../pages/students";
import Subject from "../pages/subjects";
import Login from "../pages/login";
import StudentExams from "../pages/studentExams";
import ExamHistory from "../pages/examHistory";
import ExamDay from "../pages/examDay";
import ExamResult from "../pages/examResult";

import AuthGate from "../components/AuthGate";
import RoleGate from "../components/roleGate";
import { useAuth } from "../context/authContext";

function NavBar() {

    const {
        user,
        logout,
        isAuthenticated
    } = useAuth();

    return (
        <>
            {isAuthenticated && (
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

                    <div className="flex items-center gap-3">

                        <div className="h-[5vh] aspect-square rounded-full bg-white" />

                        <div className="font-bold text-xl">
                            {user?.fullName}
                        </div>

                        <button
                            type="button"
                            onClick={logout}
                            className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold"
                        >
                            Logout
                        </button>

                    </div>

                </nav>
            )}

            <Routes>

                <Route
                    path="/login"
                    element={
                        isAuthenticated
                            ? (
                                <Navigate
                                    to="/home"
                                    replace
                                />
                            )
                            : <Login />
                    }
                />

                <Route
                    path="/"
                    element={
                        <Navigate
                            to={
                                isAuthenticated
                                    ? "/home"
                                    : "/login"
                            }
                            replace
                        />
                    }
                />

                <Route
                    path="/home"
                    element={
                        <AuthGate>
                            <Home />
                        </AuthGate>
                    }
                >

                    <Route
                        index
                        element={
                            <Navigate
                                to={
                                    user?.role === "student"
                                        ? "exams"
                                        : "admin-exams"
                                }
                                replace
                            />
                        }
                    />

                    <Route
                        path="students"
                        element={
                            <RoleGate role="admin">
                                <Student />
                            </RoleGate>
                        }
                    />

                    <Route
                        path="admin-exams"
                        element={
                            <RoleGate role="admin">
                                <Exam />
                            </RoleGate>
                        }
                    />

                    <Route
                        path="subjects"
                        element={
                            <RoleGate role="admin">
                                <Subject />
                            </RoleGate>
                        }
                    />

                    <Route
                        path="exams"
                        element={
                            <RoleGate role="student">
                                <StudentExams />
                            </RoleGate>
                        }
                    />

                    <Route
                        path="exam-history"
                        element={
                            <RoleGate role="student">
                                <ExamHistory />
                            </RoleGate>
                        }
                    />

                </Route>

                <Route
                    path="/profile"
                    element={
                        <AuthGate>
                            <Profile />
                        </AuthGate>
                    }
                />

                <Route
                    path="/exam-day/:examId"
                    element={
                        <AuthGate>
                            <ExamDay />
                        </AuthGate>
                    }
                />

                <Route
                    path="/exam-result/:examId"
                    element={
                        <AuthGate>
                            <ExamResult />
                        </AuthGate>
                    }
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
