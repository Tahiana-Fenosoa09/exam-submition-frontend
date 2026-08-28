import { useState, useEffect, useCallback } from "react";
import StudentCard from "../components/studentCard";
import StudentFormModal from "../components/studentFormModal";
import ConfirmDialog from "../components/confirmDialog";
import { useAuth } from "../context/useAuth";
import { fetchStudents, createStudent, updateStudent, deleteStudent } from "../services/usersService";

function Student() {
    const { isAdmin } = useAuth();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingStudent, setEditingStudent] = useState(null); 
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    const loadStudents = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const data = await fetchStudents();
            setStudents(data);
        } catch {
            setError("Impossible de charger la liste des étudiants. Le backend est-il démarré ?");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- chargement initial des données, pattern standard
        loadStudents();
    }, [loadStudents]);

    async function handleCreate(form) {
        await createStudent(form);
        setShowCreateForm(false);
        loadStudents();
    }

    async function handleUpdate(form) {
        await updateStudent(editingStudent.id, form);
        setEditingStudent(null);
        loadStudents();
    }

    async function handleDelete() {
        await deleteStudent(studentToDelete.id);
        setStudentToDelete(null);
        loadStudents();
    }

    return (
        <div className="w-full h-full flex flex-col gap-3">
            {isAdmin && (
                <div className="flex justify-end">
                    <button
                        onClick={() => setShowCreateForm(true)}
                        className="bg-black text-white font-bold rounded-xl px-4 py-2"
                    >
                        + Créer un étudiant
                    </button>
                </div>
            )}

            {error && <p className="text-red-600">{error}</p>}
            {loading && <p>Chargement...</p>}

            {!loading && !error && (
                <div className="w-full flex-col">
                    <div className="w-full h-auto bg-gray-400 rounded-xl">
                        <div className="w-full p-2 grid grid-cols-6">
                            <p className="font-medium">id</p>
                            <p className="font-medium">Nom</p>
                            <p className="font-medium">Email</p>
                            <p className="font-medium">Statut</p>
                            <p className="font-medium col-span-2">Actions</p>
                        </div>
                    </div>
                    {students.length === 0 && <p className="p-2 text-gray-500">Aucun étudiant pour le moment.</p>}
                    {students.map((s, index) => (
                        <StudentCard
                            key={s.id}
                            id={s.id}
                            fullName={s.fullName}
                            email={s.email}
                            isActive={s.isActive}
                            index={index}
                            onEdit={() => setEditingStudent(s)}
                            onDelete={() => setStudentToDelete(s)}
                        />
                    ))}
                </div>
            )}

            {showCreateForm && (
                <StudentFormModal
                    onSubmit={handleCreate}
                    onCancel={() => setShowCreateForm(false)}
                />
            )}

            {editingStudent && (
                <StudentFormModal
                    studentToEdit={editingStudent}
                    onSubmit={handleUpdate}
                    onCancel={() => setEditingStudent(null)}
                />
            )}

            {studentToDelete && (
                <ConfirmDialog
                    title="Supprimer cet étudiant ?"
                    message={`${studentToDelete.fullName} sera définitivement supprimé.`}
                    confirmLabel="Supprimer"
                    onConfirm={handleDelete}
                    onCancel={() => setStudentToDelete(null)}
                />
            )}
        </div>
    );
}

export default Student;
