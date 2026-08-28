import { useState } from "react";
import ExamCard from "../components/examCard";
import CreateExam from "../components/createExamCard";
import CreateQcm from "../components/createQcm";
import Modal from "../components/modal";
import PermissionGate from "../components/PermissionGate";
import { Success } from "../components/feedBack";
import {
    getExams,
    saveExams
} from "../utils/examStorage";

const initialExams = [
    {
        id: 1,
        courseId: 1,
        title: "Encapsulation",
        description:
            "A simple QCM about encapsulation.",
        startsAt: "2026-09-01T10:00",
        endsAt: "2026-09-01T12:00",
        numberOfQuestion: 3,
        questions: []
    },
    {
        id: 2,
        courseId: 3,
        title: "Data organisation",
        description:
            "A test about data organisation.",
        startsAt: "2026-09-03T10:00",
        endsAt: "2026-09-03T12:00",
        numberOfQuestion: 2,
        questions: []
    }
];

function Exam() {
    const [exams, setExams] = useState(() => {
        const saved = getExams();

        if (saved.length) {
            return saved;
        }

        saveExams(initialExams);

        return initialExams;
    });

    const [showCreate, setShowCreate] =
        useState(false);

    const [editingExam, setEditingExam] =
        useState(null);

    const [editingQcm, setEditingQcm] =
        useState(null);

    const [message, setMessage] =
        useState("");

    function updateExams(nextExams) {
        setExams(nextExams);
        saveExams(nextExams);
    }

    function createExam(exam) {
        const newExam = {
            ...exam,
            id: Date.now(),
            questions: []
        };

        updateExams([
            ...exams,
            newExam
        ]);

        setShowCreate(false);
        setMessage(
            "Exam created successfully."
        );
    }

    function updateExam(exam) {
        const next = exams.map(item =>
            item.id === exam.id
                ? {
                      ...item,
                      ...exam
                  }
                : item
        );

        updateExams(next);

        setEditingExam(null);
        setMessage(
            "Exam updated successfully."
        );
    }

    function saveQcm(questions) {
        const next = exams.map(exam =>
            exam.id === editingQcm.id
                ? {
                      ...exam,
                      questions
                  }
                : exam
        );

        updateExams(next);

        setEditingQcm(null);

        setMessage(
            "QCM saved successfully."
        );
    }

    function deleteExam(id) {
        if (
            !window.confirm(
                "Delete this exam?"
            )
        ) {
            return;
        }

        const next = exams.filter(
            exam => exam.id !== id
        );

        updateExams(next);

        setMessage(
            "Exam deleted successfully."
        );
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
                        onClick={() =>
                            setShowCreate(true)
                        }
                        className="bg-black text-white px-5 py-3 rounded-xl font-bold"
                    >
                        Create New
                    </button>
                </PermissionGate>

            </div>

            {message && (
                <div className="mb-4">
                    <Success
                        message={message}
                    />
                </div>
            )}

            <div className="flex flex-row flex-wrap items-center gap-[2vw]">

                {exams.map(exam => (
                    <ExamCard
                        key={exam.id}
                        exam={exam}
                        onEdit={
                            setEditingExam
                        }
                        onEditQcm={
                            setEditingQcm
                        }
                        onDelete={
                            deleteExam
                        }
                    />
                ))}

            </div>

            <Modal
                open={showCreate}
                onClose={() =>
                    setShowCreate(false)
                }
            >
                <CreateExam
                    onSubmit={createExam}
                    onCancel={() =>
                        setShowCreate(false)
                    }
                />
            </Modal>

            <Modal
                open={Boolean(editingExam)}
                onClose={() =>
                    setEditingExam(null)
                }
            >
                {editingExam && (
                    <CreateExam
                        exam={editingExam}
                        onSubmit={updateExam}
                        onCancel={() =>
                            setEditingExam(null)
                        }
                    />
                )}
            </Modal>

            <Modal
                open={Boolean(editingQcm)}
                onClose={() =>
                    setEditingQcm(null)
                }
            >
                {editingQcm && (
                    <CreateQcm
                        exam={editingQcm}
                        onSubmit={saveQcm}
                        onCancel={() =>
                            setEditingQcm(null)
                        }
                    />
                )}
            </Modal>

        </div>
    );
}

export default Exam;
