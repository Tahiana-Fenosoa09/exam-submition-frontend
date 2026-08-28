import { useState } from "react";
import ExamCard from "../components/examCard";
import CreateExam from "../components/createExamCard";
import Modal from "../components/modal";
import PermissionGate from "../components/PermissionGate";
import { Success } from "../components/feedBack";

function Exam() {
    const [exams, setExams] = useState([
        {
            id: 1,
            courseId: 1,
            title: "Encapsulation",
            description:
                "A simple QCM about encapsulation.",
            startsAt: "2026-09-01T10:00",
            endsAt: "2026-09-01T12:00"
        },
        {
            id: 2,
            courseId: 3,
            title: "Data organisation",
            description:
                "A test about data organisation.",
            startsAt: "2026-09-03T10:00",
            endsAt: "2026-09-03T12:00"
        }
    ]);

    const [showCreate, setShowCreate] = useState(false);
    const [editingExam, setEditingExam] = useState(null);
    const [message, setMessage] = useState("");

    function createExam(exam) {
        setExams(previous => [
            ...previous,
            {
                ...exam,
                id: Date.now()
            }
        ]);

        setShowCreate(false);
        setMessage("Exam created successfully.");
    }

    function updateExam(exam) {
        setExams(previous =>
            previous.map(item =>
                item.id === exam.id
                    ? exam
                    : item
            )
        );

        setEditingExam(null);
        setMessage("Exam updated successfully.");
    }

    function deleteExam(id) {
        if (!window.confirm("Delete this exam?")) {
            return;
        }

        setExams(previous =>
            previous.filter(exam => exam.id !== id)
        );

        setMessage("Exam deleted successfully.");
    }

    return (
        <div className="w-full min-h-screen">

            <div className="flex justify-between items-center mb-5">

                <h1 className="text-3xl font-bold">
                    Exams
                </h1>

                <PermissionGate
                    resource="exams"
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

            <div className="flex flex-row flex-wrap items-center gap-[2vw]">

                {exams.map(exam => (
                    <ExamCard
                        key={exam.id}
                        exam={exam}
                        onEdit={setEditingExam}
                        onDelete={deleteExam}
                    />
                ))}

            </div>

            <Modal
                open={showCreate}
                onClose={() => setShowCreate(false)}
            >
                <CreateExam
                    onSubmit={createExam}
                    onCancel={() => setShowCreate(false)}
                />
            </Modal>

            <Modal
                open={Boolean(editingExam)}
                onClose={() => setEditingExam(null)}
            >
                {editingExam && (
                    <CreateExam
                        exam={editingExam}
                        onSubmit={updateExam}
                        onCancel={() => setEditingExam(null)}
                    />
                )}
            </Modal>

        </div>
    );
}

export default Exam;
