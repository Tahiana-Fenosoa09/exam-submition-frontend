import { useState, useEffect, useCallback } from "react";
import ExamCard from '../components/examCard';
import CreateExam from "../components/createExamCard";
import ConfirmDialog from "../components/confirmDialog";
import { useAuth } from "../context/useAuth";
import { fetchExams, fetchExamById, createExam, updateExam, deleteExam } from "../services/examsService";

function Exam() {
    const { isAdmin } = useAuth();
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showCreateExam, setShowCreateExam] = useState(false);
    const [examToEdit, setExamToEdit] = useState(null); // examen complet (avec questions) ou null
    const [examToDelete, setExamToDelete] = useState(null);
    const [loadingEdit, setLoadingEdit] = useState(false);

    const loadExams = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const data = await fetchExams();
            setExams(data);
        } catch {
            setError("Impossible de charger les examens. Le backend est-il démarré ?");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
    
        loadExams();
    }, [loadExams]);

    async function openEdit(examSummary) {
        setLoadingEdit(true);
        try {
            const fullExam = await fetchExamById(examSummary.id);
            setExamToEdit(fullExam);
        } catch {
            setError("Impossible de charger le détail de cet examen.");
        } finally {
            setLoadingEdit(false);
        }
    }

    async function handleCreate(form) {
        await createExam(form);
        setShowCreateExam(false);
        loadExams();
    }

    async function handleUpdate(form) {
        await updateExam(examToEdit.id, form);
        setExamToEdit(null);
        loadExams();
    }

    async function handleDelete() {
        await deleteExam(examToDelete.id);
        setExamToDelete(null);
        loadExams();
    }

    return (
        <div className='w-full h-full'>
            {error && <p className="text-red-600 p-2">{error}</p>}
            {loading && <p className="p-2">Chargement...</p>}
            {loadingEdit && <p className="p-2">Chargement de l'examen...</p>}

            {!loading && !error && (
                <div className='w-full h-full flex flex-row flex-wrap gap-[2vw] p-2'>
                    {isAdmin && (
                        <div
                            className="w-[30vw] h-70 cols-span-1 bg-gray-400 p-2 flex flex-row justify-center items-center rounded-2xl cursor-pointer"
                            onClick={() => setShowCreateExam(true)}
                        >
                            <h1 className='text-2xl font-bold'>Create New</h1>
                        </div>
                    )}
                    {exams.length === 0 && <p className="text-gray-500">Aucun examen pour le moment.</p>}
                    {exams.map((e) => (
                        <ExamCard
                            key={e.id}
                            id={e.id}
                            courseName={e.courseName}
                            title={e.title}
                            description={e.description}
                            startsAt={e.startsAt}
                            endsAt={e.endsAt}
                            onEdit={() => openEdit(e)}
                            onDelete={() => setExamToDelete(e)}
                        />
                    ))}
                </div>
            )}

            {showCreateExam && (
                <CreateExam onSubmit={handleCreate} onCancel={() => setShowCreateExam(false)} />
            )}

            {examToEdit && (
                <CreateExam
                    examToEdit={examToEdit}
                    onSubmit={handleUpdate}
                    onCancel={() => setExamToEdit(null)}
                />
            )}

            {examToDelete && (
                <ConfirmDialog
                    title="Supprimer cet examen ?"
                    message={`${examToDelete.title} sera définitivement supprimé.`}
                    confirmLabel="Supprimer"
                    onConfirm={handleDelete}
                    onCancel={() => setExamToDelete(null)}
                />
            )}
        </div>
    );
}

export default Exam;
