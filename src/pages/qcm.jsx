import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router";

import { useAuth } from "../context/authContext";
import { initialExams } from "../data/exams";

function Qcm({
    mode = "exam"
}) {

    const { examId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const exam = initialExams.find(
        item =>
            item.id === Number(examId)
    );

    const [answers, setAnswers] =
        useState({});

    const [submitted, setSubmitted] =
        useState(false);

    const [timeLeft, setTimeLeft] =
        useState(0);

    const isResult =
        mode === "result";

    const storageKey =
        `${user?.id}-${exam?.id}`;

    useEffect(() => {

        if (!exam || isResult) {
            return;
        }

        const end =
            new Date(
                exam.endsAt
            ).getTime();

        function updateTimer() {

            const remaining =
                Math.max(
                    0,
                    Math.floor(
                        (end - Date.now()) /
                        1000
                    )
                );

            setTimeLeft(
                remaining
            );

            if (remaining <= 0) {
                submitExam();
            }
        }

        updateTimer();

        const interval =
            setInterval(
                updateTimer,
                1000
            );

        return () =>
            clearInterval(interval);

    }, [exam, isResult]);

    useEffect(() => {

        if (!exam || !isResult) {
            return;
        }

        const submissions =
            JSON.parse(
                localStorage.getItem(
                    "examSubmissions"
                ) || "{}"
            );

        const submission =
            submissions[storageKey];

        if (submission) {
            setAnswers(
                submission.answers
            );

            setSubmitted(true);
        }

    }, [exam, isResult, storageKey]);

    useEffect(() => {

        if (!exam || isResult) {
            return;
        }

        const handleBeforeUnload =
            () => {
                if (!submitted) {
                    submitExam();
                }
            };

        window.addEventListener(
            "beforeunload",
            handleBeforeUnload
        );

        return () =>
            window.removeEventListener(
                "beforeunload",
                handleBeforeUnload
            );

    }, [
        exam,
        submitted,
        isResult
    ]);

    const maxScore = useMemo(() => {

        if (!exam) {
            return 0;
        }

        return exam.questions.reduce(
            (total, question) =>
                total +
                question.answers.reduce(
                    (
                        score,
                        answer
                    ) =>
                        score +
                        (answer.correct
                            ? answer.score
                            : 0),
                    0
                ),
            0
        );

    }, [exam]);

    const score = useMemo(() => {

        if (!exam) {
            return 0;
        }

        return exam.questions.reduce(
            (total, question) => {

                const selected =
                    answers[
                        question.id
                    ];

                const correct =
                    question.answers.find(
                        answer =>
                            answer.id ===
                            selected
                    );

                return (
                    total +
                    (correct?.correct
                        ? correct.score
                        : 0)
                );
            },
            0
        );

    }, [answers, exam]);

    function submitExam() {

        if (
            submitted ||
            !exam ||
            !user
        ) {
            return;
        }

        const submissions =
            JSON.parse(
                localStorage.getItem(
                    "examSubmissions"
                ) || "{}"
            );

        submissions[storageKey] = {
            examId: exam.id,
            userId: user.id,
            answers,
            score,
            maxScore,
            submittedAt:
                new Date().toISOString()
        };

        localStorage.setItem(
            "examSubmissions",
            JSON.stringify(
                submissions
            )
        );

        setSubmitted(true);
    }

    function selectAnswer(
        questionId,
        answerId
    ) {

        if (
            submitted ||
            isResult
        ) {
            return;
        }

        setAnswers(previous => ({
            ...previous,
            [questionId]:
                answerId
        }));
    }

    function formatTime(seconds) {

        const minutes =
            Math.floor(
                seconds / 60
            );

        const remaining =
            seconds % 60;

        return `${String(
            minutes
        ).padStart(2, "0")}:${String(
            remaining
        ).padStart(2, "0")}`;
    }

    function getAnswerClass(
        question,
        answer
    ) {

        const selected =
            answers[
                question.id
            ];

        if (!isResult) {

            return selected === answer.id
                ? "p-3 bg-gray-700 text-white rounded-xl"
                : "p-3 bg-white rounded-xl";
        }

        if (
            answer.correct
        ) {
            return "p-3 bg-green-500 text-white rounded-xl";
        }

        if (
            selected === answer.id &&
            !answer.correct
        ) {
            return "p-3 bg-red-500 text-white rounded-xl";
        }

        return "p-3 bg-white rounded-xl";
    }

    if (!exam) {

        return (
            <div className="p-5">
                <h1 className="text-3xl font-bold">
                    Exam not found
                </h1>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center gap-5 p-5">

            <div className="w-full flex justify-between items-center">

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            isResult
                                ? "/home/exam-history"
                                : "/home/exams"
                        )
                    }
                    className="bg-gray-300 px-5 py-2 rounded-xl font-bold"
                >
                    Go Back
                </button>

                {!isResult && (
                    <h2 className="text-xl font-bold">
                        Time:{" "}
                        {formatTime(
                            timeLeft
                        )}
                    </h2>
                )}

            </div>

            <div className="w-[70%] bg-gray-400 rounded-2xl p-5 text-center">

                <h1 className="text-4xl font-bold text-white">
                    {exam.title}
                </h1>

                {isResult && (
                    <h2 className="text-2xl font-bold text-white mt-3">
                        Score: {score}/{maxScore}
                    </h2>
                )}

            </div>

            <div className="w-[70%] flex flex-col gap-8">

                {exam.questions.map(
                    (
                        question,
                        questionIndex
                    ) => (

                        <div
                            key={question.id}
                            className="border border-gray-300 rounded-xl overflow-hidden"
                        >

                            <div className="p-4 bg-gray-300">

                                <p className="text-xl font-bold">
                                    {questionIndex + 1}.
                                    {" "}
                                    {question.question}
                                </p>

                            </div>

                            <div className="p-4 flex flex-col gap-3">

                                {question.answers.map(
                                    answer => (

                                        <button
                                            type="button"
                                            key={answer.id}
                                            disabled={
                                                submitted ||
                                                isResult
                                            }
                                            onClick={() =>
                                                selectAnswer(
                                                    question.id,
                                                    answer.id
                                                )
                                            }
                                            className={`${getAnswerClass(
                                                question,
                                                answer
                                            )} text-left font-medium`}
                                        >
                                            {answer.text}

                                            {isResult &&
                                                answer.correct && (
                                                    <span className="ml-2 font-bold">
                                                        ✓ Correct
                                                    </span>
                                                )}

                                            {isResult &&
                                                answers[
                                                    question.id
                                                ] ===
                                                    answer.id &&
                                                !answer.correct && (
                                                    <span className="ml-2 font-bold">
                                                        ✗ Your answer
                                                    </span>
                                                )}

                                        </button>

                                    )
                                )}

                            </div>

                        </div>

                    )
                )}

            </div>

            {!isResult && !submitted && (

                <button
                    type="button"
                    onClick={() => {
                        submitExam();
                    }}
                    className="w-[40%] bg-black text-white py-3 rounded-xl font-bold"
                >
                    Submit Answers
                </button>

            )}

            {submitted && !isResult && (

                <div className="flex flex-col items-center gap-3">

                    <div className="bg-green-500 text-white p-4 rounded-xl font-bold">
                        Your answers have been submitted.
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/home"
                            )
                        }
                        className="bg-black text-white px-8 py-3 rounded-xl font-bold"
                    >
                        End Test
                    </button>

                </div>

            )}

        </div>
    );
}

export default Qcm;
