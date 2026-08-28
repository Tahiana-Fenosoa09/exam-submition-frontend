import { useState } from "react";
import StudentCard from "../components/studentCard";
import CreateStudent from "../components/createStudent";
import Modal from "../components/modal";
import PermissionGate from "../components/permissionGate";
import { Success, ErrorMessage } from "../components/feedBack";
import { useAuth } from "../context/authContext";

function Student() {
    const { user } = useAuth();

    const [students, setStudents] = useState([
        {
            id: 1,
            fullName: "Steevey Rakoto",
            email: "steevey@example.com",
            role: "student",
            isActive: true
        },
        {
            id: 2,
            fullName: "Prudence RaJean",
            email: "prudence@example.com",
            role: "student",
            isActive: true
        },
        {
            id: 3,
            fullName: "Stanley Shang",
            email: "stanley@example.com",
            role: "student",
            isActive: true
        },
        {
            id: 4,
            fullName: "Junioh Ok",
            email: "junioh@example.com",
            role: "student",
            isActive: true
        }
    ]);

    const [showCreate, setShowCreate] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    function openCreate() {
        setMessage("");
        setError("");
        setShowCreate(true);
    }

    function closeCreate() {
        setShowCreate(false);
    }

    function handleCreateStudent(student) {
        const newStudent = {
            ...student,
            id: Date.now(),
            role: "student",
            isActive: true
        };

        setStudents(previous => [
            ...previous,
            newStudent
        ]);

        setShowCreate(false);
        setMessage("Student created successfully.");
    }

    function handleDeleteStudent(id) {
        const student = students.find(
            student => student.id === id
        );

        if (!student) {
            return;
        }

        const confirmed = window.confirm(
            `Delete ${student.fullName}?`
        );

        if (!confirmed) {
            return;
        }

        setStudents(previous =>
            previous.filter(student => student.id !== id)
        );

        setSelectedStudent(null);
        setMessage("Student deleted successfully.");
    }

    function handleUpdateStudent(updatedStudent) {
        setStudents(previous =>
            previous.map(student =>
                student.id === updatedStudent.id
                    ? updatedStudent
                    : student
            )
        );

        setSelectedStudent(null);
        setMessage("Student updated successfully.");
    }

    function openProfile(student) {
        setMessage("");
        setError("");
        setSelectedStudent(student);
    }

    return (
        <div className="w-full min-h-screen flex flex-col gap-3">

            <div className="w-full flex justify-end">
                <PermissionGate
                    resource="students"
                    action="create"
                >
                    <button
                        type="button"
                        onClick={openCreate}
                        className="bg-black text-white font-bold px-5 py-3 rounded-xl"
                    >
                        Create Student
                    </button>
                </PermissionGate>
            </div>

            {message && (
                <Success message={message} />
            )}

            {error && (
                <ErrorMessage message={error} />
            )}

            <div className="w-full">

                <div className="w-full bg-gray-400 rounded-xl p-3">
                    <div className="grid grid-cols-5">
                        <p className="font-bold">ID</p>
                        <p className="font-bold">Name</p>
                        <p className="font-bold">Email</p>
                        <p className="font-bold">Role</p>
                        <p className="font-bold">Status</p>
                    </div>
                </div>

                {students.map((student, index) => (
                    <StudentCard
                        key={student.id}
                        student={student}
                        index={index}
                        currentUser={user}
                        onOpenProfile={openProfile}
                    />
                ))}

            </div>

            <Modal
                open={showCreate}
                onClose={closeCreate}
            >
                <CreateStudent
                    onSubmit={handleCreateStudent}
                    onCancel={closeCreate}
                />
            </Modal>

            <Modal
                open={Boolean(selectedStudent)}
                onClose={() => setSelectedStudent(null)}
            >
                {selectedStudent && (
                    <StudentProfile
                        student={selectedStudent}
                        currentUser={user}
                        onDelete={handleDeleteStudent}
                        onUpdate={handleUpdateStudent}
                        onClose={() => setSelectedStudent(null)}
                    />
                )}
            </Modal>

        </div>
    );
}

function StudentProfile({
    student,
    currentUser,
    onDelete,
    onUpdate,
    onClose
}) {
    const [editing, setEditing] = useState(false);

    const [form, setForm] = useState({
        fullName: student.fullName,
        email: student.email
    });

    const isAdmin = currentUser.role === "admin";

    function handleChange(event) {
        setForm(previous => ({
            ...previous,
            [event.target.name]: event.target.value
        }));
    }

    function save() {
        onUpdate({
            ...student,
            ...form
        });
    }

    return (
        <div className="flex flex-col gap-5">

            <h1 className="text-3xl font-bold text-center">
                Student Profile
            </h1>

            {!editing ? (
                <>
                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <h2 className="font-bold bg-gray-400 p-2">
                                Name
                            </h2>
                            <p className="p-2">
                                {student.fullName}
                            </p>
                        </div>

                        <div>
                            <h2 className="font-bold bg-gray-400 p-2">
                                Email
                            </h2>
                            <p className="p-2">
                                {student.email}
                            </p>
                        </div>

                        <div>
                            <h2 className="font-bold bg-gray-400 p-2">
                                Role
                            </h2>
                            <p className="p-2">
                                {student.role}
                            </p>
                        </div>

                        <div>
                            <h2 className="font-bold bg-gray-400 p-2">
                                Status
                            </h2>
                            <p className="p-2">
                                {student.isActive ? "Active" : "Inactive"}
                            </p>
                        </div>

                    </div>

                    {isAdmin && (
                        <>
                            <h2 className="text-2xl font-bold">
                                Exam History
                            </h2>

                            <div className="bg-gray-100 rounded-xl p-5">
                                <p className="text-gray-500">
                                    No exam attempts yet.
                                </p>
                            </div>

                            <div className="flex gap-3">

                                <button
                                    type="button"
                                    onClick={() => setEditing(true)}
                                    className="bg-black text-white px-5 py-2 rounded-xl font-bold"
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    onClick={() => onDelete(student.id)}
                                    className="bg-red-500 text-white px-5 py-2 rounded-xl font-bold"
                                >
                                    Delete
                                </button>

                            </div>
                        </>
                    )}
                </>
            ) : (
                <div className="flex flex-col gap-4">

                    <div>
                        <label className="font-bold">
                            Full Name
                        </label>

                        <input
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            className="border-2 p-2 w-full rounded-xl"
                        />
                    </div>

                    <div>
                        <label className="font-bold">
                            Email
                        </label>

                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="border-2 p-2 w-full rounded-xl"
                        />
                    </div>

                    <div className="flex gap-3">

                        <button
                            type="button"
                            onClick={save}
                            className="bg-black text-white px-5 py-2 rounded-xl font-bold"
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            onClick={() => setEditing(false)}
                            className="bg-gray-400 text-white px-5 py-2 rounded-xl font-bold"
                        >
                            Cancel
                        </button>

                    </div>

                </div>
            )}

            <button
                type="button"
                onClick={onClose}
                className="w-full bg-gray-200 py-2 rounded-xl font-bold"
            >
                Close
            </button>

        </div>
    );
}

export default Student;
