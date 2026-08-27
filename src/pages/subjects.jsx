import { useState } from "react";
import SubjectCard from "../components/subjectCard";
import CreateCourse from "../components/createCourse";
import Modal from "../components/modal";
import PermissionGate from "../components/PermissionGate";
import { Success } from "../components/feedBack";

function Subject() {
    const [courses, setCourses] = useState([
        {
            id: 1,
            code: "PROG2",
            name: "POO",
            description:
                "Object oriented programming and encapsulation."
        },
        {
            id: 2,
            code: "WEB2",
            name: "ExpressJS",
            description:
                "Backend development with ExpressJS."
        },
        {
            id: 3,
            code: "DONNEES2",
            name: "Données massive",
            description:
                "Introduction to massive data."
        },
        {
            id: 4,
            code: "PROG1",
            name: "Algorithmique",
            description:
                "Algorithms and fundamental programming concepts."
        }
    ]);

    const [showCreate, setShowCreate] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [message, setMessage] = useState("");

    function createCourse(course) {
        setCourses(previous => [
            ...previous,
            {
                ...course,
                id: Date.now()
            }
        ]);

        setShowCreate(false);
        setMessage("Course created successfully.");
    }

    function updateCourse(course) {
        setCourses(previous =>
            previous.map(item =>
                item.id === course.id
                    ? course
                    : item
            )
        );

        setEditingCourse(null);
        setMessage("Course updated successfully.");
    }

    function deleteCourse(id) {
        const course = courses.find(
            course => course.id === id
        );

        if (!course) {
            return;
        }

        if (
            !window.confirm(
                `Delete course ${course.code}?`
            )
        ) {
            return;
        }

        setCourses(previous =>
            previous.filter(course => course.id !== id)
        );

        setMessage("Course deleted successfully.");
    }

    return (
        <div className="w-full min-h-screen">

            <div className="flex justify-between items-center mb-5">

                <h1 className="text-3xl font-bold">
                    Courses
                </h1>

                <PermissionGate
                    resource="courses"
                    action="create"
                >
                    <button
                        type="button"
                        onClick={() => setShowCreate(true)}
                        className="bg-black text-white px-5 py-3 rounded-xl font-bold"
                    >
                        Create New
                    </button>
                </PermissionGate>

            </div>

            {message && (
                <div className="mb-4">
                    <Success message={message} />
                </div>
            )}

            <div className="flex flex-row flex-wrap gap-[2vw]">

                {courses.map(course => (
                    <SubjectCard
                        key={course.id}
                        course={course}
                        onEdit={setEditingCourse}
                        onDelete={deleteCourse}
                    />
                ))}

            </div>

            <Modal
                open={showCreate}
                onClose={() => setShowCreate(false)}
            >
                <CreateCourse
                    onSubmit={createCourse}
                    onCancel={() => setShowCreate(false)}
                />
            </Modal>

            <Modal
                open={Boolean(editingCourse)}
                onClose={() => setEditingCourse(null)}
            >
                {editingCourse && (
                    <CreateCourse
                        course={editingCourse}
                        onSubmit={updateCourse}
                        onCancel={() => setEditingCourse(null)}
                    />
                )}
            </Modal>

        </div>
    );
}

export default Subject;
