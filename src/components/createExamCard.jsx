import { useState, useEffect } from "react";
import { fetchCourses } from "../services/coursesService";

function emptyChoice() {
    return { label: "", isCorrect: false };
}

function emptyQuestion() {
    return { statement: "", points: 1, choices: [emptyChoice(), emptyChoice()] };
}


function toDatetimeLocalValue(isoString) {
    if (!isoString) return "";
    const d = new Date(isoString);
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}


function CreateExam({ examToEdit, onSubmit, onCancel }) {
    const isEditing = !!examToEdit;

    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState(examToEdit?.courseId ?? "");
    const [title, setTitle] = useState(examToEdit?.title ?? "");
    const [description, setDescription] = useState(examToEdit?.description ?? "");
    const [startsAt, setStartsAt] = useState(toDatetimeLocalValue(examToEdit?.startsAt));
    const [durationMinutes, setDurationMinutes] = useState(() => {
        if (!examToEdit?.startsAt || !examToEdit?.endsAt) return 60;
        return Math.round((new Date(examToEdit.endsAt) - new Date(examToEdit.startsAt)) / 60000);
    });
    const [questions, setQuestions] = useState(
        examToEdit?.questions?.length
            ? examToEdit.questions.map((q) => ({
                  statement: q.statement,
                  points: q.points,
                  choices: q.choices.map((c) => ({ label: c.label, isCorrect: !!c.isCorrect })),
              }))
            : [emptyQuestion()]
    );

    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchCourses()
            .then(setCourses)
            .catch(() => setError("Impossible de charger la liste des UE."));
    }, []);

    function updateQuestion(index, field, value) {
        setQuestions((prev) =>
            prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
        );
    }

    function updateChoice(qIndex, cIndex, field, value) {
        setQuestions((prev) =>
            prev.map((q, i) => {
                if (i !== qIndex) return q;
                const newChoices = q.choices.map((c, j) => {
                    if (field === "isCorrect") {
                        // Un seul choix correct par question
                        return { ...c, isCorrect: j === cIndex };
                    }
                    return j === cIndex ? { ...c, [field]: value } : c;
                });
                return { ...q, choices: newChoices };
            })
        );
    }

    function addQuestion() {
        setQuestions((prev) => [...prev, emptyQuestion()]);
    }

    function removeQuestion(index) {
        setQuestions((prev) => prev.filter((_, i) => i !== index));
    }

    function addChoice(qIndex) {
        setQuestions((prev) =>
            prev.map((q, i) =>
                i === qIndex && q.choices.length < 6 ? { ...q, choices: [...q.choices, emptyChoice()] } : q
            )
        );
    }

    function removeChoice(qIndex, cIndex) {
        setQuestions((prev) =>
            prev.map((q, i) =>
                i === qIndex && q.choices.length > 2
                    ? { ...q, choices: q.choices.filter((_, j) => j !== cIndex) }
                    : q
            )
        );
    }

    function validate() {
        if (!courseId) return "Choisis une UE.";
        if (!title.trim()) return "Le titre est obligatoire.";
        if (!startsAt) return "La date de début est obligatoire.";
        if (!durationMinutes || durationMinutes <= 0) return "La durée doit être positive.";
        if (questions.length === 0) return "Ajoute au moins une question.";

        for (const [i, q] of questions.entries()) {
            if (!q.statement.trim()) return `Question ${i + 1} : l'énoncé est vide.`;
            if (q.choices.length < 2 || q.choices.length > 6) {
                return `Question ${i + 1} : entre 2 et 6 choix requis.`;
            }
            if (q.choices.some((c) => !c.label.trim())) {
                return `Question ${i + 1} : tous les choix doivent avoir un texte.`;
            }
            if (q.choices.filter((c) => c.isCorrect).length !== 1) {
                return `Question ${i + 1} : sélectionne exactement une bonne réponse.`;
            }
        }
        return "";
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }
        setError("");
        setSubmitting(true);

        const startDate = new Date(startsAt);
        const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

        try {
            await onSubmit({
                courseId,
                title,
                description,
                startsAt: startDate.toISOString(),
                endsAt: endDate.toISOString(),
                questions,
            });
        } catch (err) {
            setError(err.response?.data?.message ?? "Une erreur est survenue lors de l'enregistrement.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl flex flex-col gap-4 p-6"
            >
                <h1 className="text-2xl font-bold text-center">
                    {isEditing ? "Modifier l'examen" : "Créer un nouvel examen"}
                </h1>

                {error && <p className="text-red-600 font-medium">{error}</p>}

                <div className="w-full flex gap-3">
                    <div className="w-1/2">
                        <label className="text-sm font-medium">UE</label>
                        <select
                            className="border-2 p-2 w-full rounded-lg"
                            value={courseId}
                            onChange={(e) => setCourseId(e.target.value)}
                            required
                        >
                            <option value="">-- Choisir --</option>
                            {courses.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.code} — {c.name}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                            Tous les étudiants de cette UE recevront automatiquement l'examen.
                        </p>
                    </div>
                    <div className="w-1/2">
                        <label className="text-sm font-medium">Titre</label>
                        <input
                            type="text"
                            className="border-2 p-2 w-full rounded-lg"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                        className="border-2 p-2 w-full rounded-lg"
                        rows={2}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="w-full flex gap-3">
                    <div className="w-1/2">
                        <label className="text-sm font-medium">Date et heure de début</label>
                        <input
                            type="datetime-local"
                            className="border-2 p-2 w-full rounded-lg"
                            value={startsAt}
                            onChange={(e) => setStartsAt(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="text-sm font-medium">Durée (minutes)</label>
                        <input
                            type="number"
                            min={1}
                            className="border-2 p-2 w-full rounded-lg"
                            value={durationMinutes}
                            onChange={(e) => setDurationMinutes(Number(e.target.value))}
                            required
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Questions ({questions.length})</h2>
                        <button
                            type="button"
                            onClick={addQuestion}
                            className="text-sm font-bold bg-gray-200 rounded-lg px-3 py-1"
                        >
                            + Ajouter une question
                        </button>
                    </div>

                    {questions.map((q, qIndex) => (
                        <div key={qIndex} className="border-2 rounded-xl p-3 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="font-bold">Q{qIndex + 1}.</span>
                                <input
                                    type="text"
                                    placeholder="Énoncé de la question"
                                    className="border-2 p-2 flex-1 rounded-lg"
                                    value={q.statement}
                                    onChange={(e) => updateQuestion(qIndex, "statement", e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    min={0}
                                    step="0.5"
                                    title="Points"
                                    className="border-2 p-2 w-20 rounded-lg"
                                    value={q.points}
                                    onChange={(e) => updateQuestion(qIndex, "points", Number(e.target.value))}
                                />
                                {questions.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeQuestion(qIndex)}
                                        className="text-red-600 font-bold px-2"
                                        title="Supprimer la question"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            <div className="flex flex-col gap-1 pl-6">
                                {q.choices.map((c, cIndex) => (
                                    <div key={cIndex} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name={`correct-${qIndex}`}
                                            checked={c.isCorrect}
                                            onChange={() => updateChoice(qIndex, cIndex, "isCorrect", true)}
                                            title="Bonne réponse"
                                        />
                                        <input
                                            type="text"
                                            placeholder={`Choix ${cIndex + 1}`}
                                            className="border p-1.5 flex-1 rounded-lg"
                                            value={c.label}
                                            onChange={(e) => updateChoice(qIndex, cIndex, "label", e.target.value)}
                                            required
                                        />
                                        {q.choices.length > 2 && (
                                            <button
                                                type="button"
                                                onClick={() => removeChoice(qIndex, cIndex)}
                                                className="text-red-600 px-1"
                                                title="Supprimer ce choix"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {q.choices.length < 6 && (
                                    <button
                                        type="button"
                                        onClick={() => addChoice(qIndex)}
                                        className="text-sm text-gray-600 self-start"
                                    >
                                        + Ajouter un choix
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full flex justify-center gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="h-10 w-40 rounded-xl font-bold bg-gray-200"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="h-10 w-40 rounded-xl text-white font-bold bg-black disabled:opacity-50"
                    >
                        {submitting ? "..." : isEditing ? "Enregistrer" : "Créer l'examen"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateExam;
