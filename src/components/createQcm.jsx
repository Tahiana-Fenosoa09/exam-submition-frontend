import { useEffect, useState } from "react";

const EMPTY_QUESTION = {
    question: "",
    answers: ["", "", "", ""],
    correctAnswer: 0,
    score: 1
};

function createEmptyQuestions(number) {
    return Array.from(
        { length: number },
        () => ({
            ...EMPTY_QUESTION,
            answers: [...EMPTY_QUESTION.answers]
        })
    );
}

function CreateQcm({
    exam,
    onSubmit,
    onCancel
}) {
    const [questions, setQuestions] = useState([]);

    const [error, setError] = useState("");

    useEffect(() => {
        const existing = exam.questions ?? [];

        const result = createEmptyQuestions(
            exam.numberOfQuestion
        );

        existing.forEach((question, index) => {
            if (index < result.length) {
                result[index] = {
                    ...result[index],
                    ...question,
                    answers: [
                        ...(question.answers ?? [])
                    ]
                };
            }
        });

        setQuestions(result);
    }, [exam]);

    function updateQuestion(
        questionIndex,
        field,
        value
    ) {
        setQuestions(previous =>
            previous.map((question, index) =>
                index === questionIndex
                    ? {
                          ...question,
                          [field]: value
                      }
                    : question
            )
        );
    }

    function updateAnswer(
        questionIndex,
        answerIndex,
        value
    ) {
        setQuestions(previous =>
            previous.map((question, index) => {
                if (index !== questionIndex) {
                    return question;
                }

                const answers = [
                    ...question.answers
                ];

                answers[answerIndex] = value;

                return {
                    ...question,
                    answers
                };
            })
        );
    }

    function validate() {
        for (
            let i = 0;
            i < questions.length;
            i++
        ) {
            const question = questions[i];

            if (!question.question.trim()) {
                return `Question ${i + 1} is empty.`;
            }

            if (
                question.answers.some(
                    answer => !answer.trim()
                )
            ) {
                return `All answers for question ${
                    i + 1
                } are required.`;
            }

            if (
                question.score === "" ||
                Number(question.score) <= 0
            ) {
                return `Question ${
                    i + 1
                } must have a valid score.`;
            }
        }

        return "";
    }

    function submitForm(event) {
        event.preventDefault();

        const validationError = validate();

        if (validationError) {
            setError(validationError);
            return;
        }

        const cleanedQuestions =
            questions.map(question => ({
                question: question.question.trim(),

                answers: question.answers.map(
                    answer => answer.trim()
                ),

                correctAnswer:
                    Number(question.correctAnswer),

                score: Number(question.score)
            }));

        onSubmit(cleanedQuestions);
    }

    return (
        <form
            onSubmit={submitForm}
            className="flex flex-col gap-6"
        >
            <h1 className="text-3xl font-bold text-center">
                {exam.questions?.length
                    ? "Edit QCM"
                    : "Create QCM"}
            </h1>

            <p className="text-center text-gray-500">
                {questions.length} question(s)
            </p>

            {error && (
                <div className="bg-red-500 text-white p-3 rounded-xl">
                    {error}
                </div>
            )}

            {questions.map(
                (question, questionIndex) => (
                    <div
                        key={questionIndex}
                        className="border-2 border-gray-300 rounded-2xl p-5 flex flex-col gap-4"
                    >
                        <h2 className="text-xl font-bold">
                            Question{" "}
                            {questionIndex + 1}
                        </h2>

                        <textarea
                            value={question.question}
                            onChange={event =>
                                updateQuestion(
                                    questionIndex,
                                    "question",
                                    event.target.value
                                )
                            }
                            placeholder="Write the question..."
                            className="border-2 p-3 rounded-xl min-h-24"
                        />

                        <div className="flex flex-col gap-3">
                            {question.answers.map(
                                (
                                    answer,
                                    answerIndex
                                ) => (
                                    <div
                                        key={
                                            answerIndex
                                        }
                                        className="flex gap-2 items-center"
                                    >
                                        <input
                                            type="radio"
                                            name={`correct-${questionIndex}`}
                                            checked={
                                                Number(
                                                    question.correctAnswer
                                                ) ===
                                                answerIndex
                                            }
                                            onChange={() =>
                                                updateQuestion(
                                                    questionIndex,
                                                    "correctAnswer",
                                                    answerIndex
                                                )
                                            }
                                        />

                                        <input
                                            value={
                                                answer
                                            }
                                            onChange={event =>
                                                updateAnswer(
                                                    questionIndex,
                                                    answerIndex,
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder={`Answer ${
                                                answerIndex +
                                                1
                                            }`}
                                            className="border-2 p-2 rounded-xl flex-1"
                                        />
                                    </div>
                                )
                            )}
                        </div>

                        <div>
                            <label className="font-bold">
                                Score for this question
                            </label>

                            <input
                                type="number"
                                min="0.1"
                                step="0.1"
                                value={question.score}
                                onChange={event =>
                                    updateQuestion(
                                        questionIndex,
                                        "score",
                                        event.target.value
                                    )
                                }
                                className="border-2 p-2 rounded-xl w-full"
                            />
                        </div>
                    </div>
                )
            )}

            <div className="flex gap-3">
                <button
                    type="submit"
                    className="flex-1 bg-black text-white py-3 rounded-xl font-bold"
                >
                    Save QCM
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 bg-gray-300 py-3 rounded-xl font-bold"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default CreateQcm;
