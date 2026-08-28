import { useState, useEffect, useCallback } from "react";
import SubjectCard from '../components/subjectCard';
import SubjectFormModal from "../components/subjectFormModal";
import ConfirmDialog from "../components/confirmDialog";
import { useAuth } from "../context/useAuth";
import { fetchCourses, createCourse, updateCourse, deleteCourse } from "../services/coursesService";

function Subject() {
    const { isAdmin } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [courseToDelete, setCourseToDelete] = useState(null);

    const loadCourses = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const data = await fetchCourses();
            setCourses(data);
        } catch {
            setError("Impossible de charger les UE. Le backend est-il démarré ?");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- chargement initial des données, pattern standard
        loadCourses();
    }, [loadCourses]);

    async function handleCreate(form) {
        await createCourse(form);
        setShowCreateForm(false);
        loadCourses();
    }

    async function handleUpdate(form) {
        await updateCourse(editingCourse.id, form);
        setEditingCourse(null);
        loadCourses();
    }

    async function handleDelete() {
        await deleteCourse(courseToDelete.id);
        setCourseToDelete(null);
        loadCourses();
    }

    return (
        <div className='w-full h-full'>
            {error && <p className="text-red-600 p-2">{error}</p>}
            {loading && <p className="p-2">Chargement...</p>}

            {!loading && !error && (
                <div className=' w-full h-full flex flex-row flex-wrap gap-[2vw] p-2'>
                    {isAdmin && (
                        <div
                            className="w-[30vw] h-70 cols-span-1 bg-gray-400 p-2 flex flex-row justify-center items-center rounded-2xl cursor-pointer"
                            onClick={() => setShowCreateForm(true)}
                        >
                            <h1 className='text-2xl font-bold'>Create New</h1>
                        </div>
                    )}
                    {courses.length === 0 && <p className="text-gray-500">Aucune UE pour le moment.</p>}
                    {courses.map((c) => (
                        <SubjectCard
                            key={c.id}
                            code={c.code}
                            name={c.name}
                            description={c.description}
                            onEdit={() => setEditingCourse(c)}
                            onDelete={() => setCourseToDelete(c)}
                        />
                    ))}
                </div>
            )}

            {showCreateForm && (
                <SubjectFormModal onSubmit={handleCreate} onCancel={() => setShowCreateForm(false)} />
            )}

            {editingCourse && (
                <SubjectFormModal
                    courseToEdit={editingCourse}
                    onSubmit={handleUpdate}
                    onCancel={() => setEditingCourse(null)}
                />
            )}

            {courseToDelete && (
                <ConfirmDialog
                    title="Supprimer cette UE ?"
                    message={`${courseToDelete.name} sera définitivement supprimée.`}
                    confirmLabel="Supprimer"
                    onConfirm={handleDelete}
                    onCancel={() => setCourseToDelete(null)}
                />
            )}
        </div>
    );
}

export default Subject;
