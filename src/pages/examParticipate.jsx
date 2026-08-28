import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchExamById } from "../services/examsService";
import { fetchMyAttemptForExam, startAttempt, saveAnswer, submitAttempt } from "../services/attemptsService";
import ExamTimer from "../components/examTimer";


function ExamParticipate() {
    const { examId } = useParams();
    const navigate = useNavigate();

    const [screen, setScreen] = useState("loading");
    const [errorMessage, setErrorMessage] = useState("");
    const [exam, setExam] = useState(null);
    const [attempt, setAttempt] = useState(null); 
    const [existingAttempt, setExistingAttempt] = useState(null); 
    const [answers, setAnswers] = useState({}); 
    const [finalScore, setFinalScore] = useState(null);

    const attemptRef = useRef(null); 

    
    useEffect(() => {
        let cancelled = false;

        async function checkAccess() {
            try {
                const [examData, myAttempt] = await Promise.all([
                    fetchExamById(examId),
                    fetchMyAttemptForExam(examId),
                ]);
                if (cancelled) return;

                setExam(examData);

                if (myAttempt) {
                    setExistingAttempt(myAttempt);
                    setScreen("locked");
                } else {
                    setScreen("intro");
                }
            } catch {
                if (!cancelled) {
                    setErrorMessage("Impossible de charger cet examen. Le backend est-il démarré ?");
                    setScreen("error");
                }
            }
        }

        checkAccess();
        return () => {
            cancelled = true;
        };
    }, [examId]);

   
    useEffect(() => {
        function handleBeforeUnload(e) {
            if (attemptRef.current) {
                e.preventDefault();
                e.returnValue = "";
            }
        }
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            
            if (attemptRef.current) {
                submitAttempt(attemptRef.current.id).catch(() => {});
            }
        };
    }, []);

    async function handleStart() {
        setScreen("loading");
        try {
            const newAttempt = await startAttempt(examId);
            setAttempt(newAttempt);
            attemptRef.current = newAttempt;
            setScreen("inProgress");
        } catch {
            setErrorMessage("Impossible de démarrer l'examen. Réessaie ou contacte un administrateur.");
            setScreen("error");
        }
    }

    async function handleSelectChoice(questionId, choiceId) {
        setAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
        try {
            await saveAnswer(attempt.id, { questionId, choiceId });
        } catch {
            
        }
    }

    const handleSubmit = useCallback(async () => {
        if (!attemptRef.current) return;
        setScreen("loading");
        try {
            const result = await submitAttempt(attemptRef.current.id);
            setFinalScore(result.score);
            attemptRef.current = null; 
            setScreen("submitted");
        } catch {
            setErrorMessage("Erreur lors de la soumission. Contacte un administrateur si le problème persiste.");
            setScreen("error");
        }
    }, []);

   

    if (screen === "loading") {
        return (
            <div className="w-full h-dvh flex items-center justify-center">
                <p className="text-xl">Chargement...</p>
            </div>
        );
    }

    if (screen === "error") {
        return (
            <div className="w-full h-dvh flex flex-col items-center justify-center gap-3">
                <p className="text-xl text-red-600">{errorMessage}</p>
                <button onClick={() => navigate("/home/exams")} className="bg-black text-white rounded-xl px-4 py-2">
                    Retour aux examens
                </button>
            </div>
        );
    }

    if (screen === "locked") {
        return (
            <div className="w-full h-dvh flex flex-col items-center justify-center gap-3 text-center px-4">
                <h1 className="text-3xl font-bold">Examen déjà utilisé</h1>
                <p className="text-gray-600 max-w-md">
                    Tu as déjà commencé ou terminé cet examen. Pour éviter la fraude, un examen ne peut être
                    passé qu'une seule fois.
                </p>
                {existingAttempt?.submittedAt && (
                    <p className="text-xl font-bold">
                        Note obtenue : {existingAttempt.score ?? "en cours de correction"}
                    </p>
                )}
                <button onClick={() => navigate("/home/exams")} className="bg-black text-white rounded-xl px-4 py-2">
                    Retour aux examens
                </button>
            </div>
        );
    }

    if (screen === "intro") {
        return (
            <div className="w-full h-dvh flex flex-col items-center justify-center gap-4 text-center px-4">
                <h1 className="text-3xl font-bold">{exam?.title}</h1>
                <p className="text-gray-600 max-w-md">{exam?.description}</p>
                <p className="font-medium">{exam?.questions?.length ?? 0} question(s)</p>
                <p className="text-red-600 max-w-md text-sm">
                    ⚠️ Une fois commencé, si tu quittes cette page ou fermes l'onglet, tu ne pourras plus
                    revenir sur cet examen. Assure-toi d'être prêt·e avant de cliquer.
                </p>
                <button onClick={handleStart} className="bg-black text-white font-bold rounded-xl px-6 py-3">
                    Commencer l'examen
                </button>
            </div>
        );
    }

    if (screen === "submitted") {
        return (
            <div className="w-full h-dvh flex flex-col items-center justify-center gap-3 text-center">
                <h1 className="text-3xl font-bold">Examen soumis</h1>
                <p className="text-xl">Note : {finalScore}</p>
                <button onClick={() => navigate("/home/exams")} className="bg-black text-white rounded-xl px-4 py-2">
                    Retour aux examens
                </button>
            </div>
        );
    }

    
    return (
        <div className="w-full min-h-dvh flex flex-col gap-4 p-4 max-w-3xl mx-auto">
            <div className="flex justify-between items-center sticky top-0 bg-white py-2 z-10">
                <h1 className="text-2xl font-bold">{exam.title}</h1>
                <ExamTimer endsAt={attempt.endsAt} onExpire={handleSubmit} />
            </div>

            {exam.questions.map((q, index) => (
                <div key={q.id} className="border-2 rounded-xl p-4 flex flex-col gap-2">
                    <p className="font-bold">
                        {index + 1}. {q.statement}
                    </p>
                    <div className="flex flex-col gap-1 pl-4">
                        {q.choices.map((c) => (
                            <label key={c.id} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name={`question-${q.id}`}
                                    checked={answers[q.id] === c.id}
                                    onChange={() => handleSelectChoice(q.id, c.id)}
                                />
                                {c.label}
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <button
                onClick={handleSubmit}
                className="bg-black text-white font-bold rounded-xl py-3 mt-2"
            >
                Terminer et soumettre
            </button>
        </div>
    );
}

export default ExamParticipate;
