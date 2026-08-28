import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/login";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Student from "./pages/students";
import Exam from "./pages/exams";
import Subject from "./pages/subjects";
import ExamParticipate from "./pages/examParticipate";
import NotFound from "./pages/notFound";
import Layout from "./components/layout";
import ProtectedRoute from "./components/protectedRoute";
import "./App.css";

function App() {
    return (
        <Routes>
            {}
            <Route path="/login" element={<Login />} />

            {}
            <Route
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route path="/home" element={<Home />}>
                    <Route index element={<Navigate to="students" replace />} />
                    <Route path="students" element={<Student />} />
                    <Route path="exams" element={<Exam />} />
                    <Route path="subjects" element={<Subject />} />
                </Route>
                <Route path="/profile" element={<Profile />} />
                <Route path="/students/:userId" element={<Profile />} />
                <Route path="/exams/:examId/participate" element={<ExamParticipate />} />
            </Route>

            <Route path="/unauthorized" element={<p className="p-4 text-xl">Accès refusé</p>} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
