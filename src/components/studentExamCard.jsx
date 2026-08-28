import { useNavigate } from "react-router";

function StudentExamCard({
    exam,
    submitted
}) {
    const navigate = useNavigate();

    const now = new Date();
    const start = new Date(exam.startsAt);
    const end = new Date(exam.endsAt);

    const isToday =
        now.toDateString() ===
        start.toDateString();

    const isStarted =
        now >= start;

    const isFinished =
        now >= end;

    const canParticipate =
        isStarted &&
        !isFinished &&
        exam.questions?.length ===
            exam.numberOfQuestion;

    return (
        <div
            className={`w-[30vw] min-w-80 min-h-64 p-5 rounded-2xl flex flex-col justify-between ${
                isToday
                    ? "bg-red-500 text-white"
                    : "bg-gray-300"
            }`}
        >
            <div>
                <h2 className="text-2xl font-bold">
                    {exam.title}
                </h2>

                <p className="mt-2">
                    {exam.description}
                </p>

                <p className="mt-2">
                    Start: {exam.startsAt}
                </p>

                <p>
                    End: {exam.endsAt}
                </p>

                <p>
                    Questions:{" "}
                    {exam.numberOfQuestion}
                </p>
            </div>

            <div className="mt-5">

                {submitted ? (
                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                `/exam-day?examId=${exam.id}&result=true`
                            )
                        }
                        className="w-full bg-black text-white py-3 rounded-xl font-bold"
                    >
                        View Result
                    </button>
                ) : (
                    <button
                        type="button"
                        disabled={!canParticipate}
                        onClick={() =>
                            navigate(
                                `/exam-day?examId=${exam.id}`
                            )
                        }
                        className={`w-full py-3 rounded-xl font-bold ${
                            canParticipate
                                ? "bg-black text-white"
                                : "bg-gray-500 text-gray-200 cursor-not-allowed"
                        }`}
                    >
                        {isFinished
                            ? "Exam Finished"
                            : !isStarted
                            ? "Not Started"
                            : exam.questions?.length !==
                              exam.numberOfQuestion
                            ? "Exam Not Ready"
                            : "Participate"}
                    </button>
                )}

            </div>
        </div>
    );
}

export default StudentExamCard;
