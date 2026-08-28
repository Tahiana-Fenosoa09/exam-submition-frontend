import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import { initialExams } from "../data/exams";

function StudentExams() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const today =
        new Date().toDateString();

    const exams = initialExams.filter(
        exam =>
            user?.enrolledCourses?.includes(
                exam.courseId
            )
    );

    function isToday(exam) {

        return (
            new Date(
                exam.startsAt
            ).toDateString() === today
        );
    }

    function isFinished(exam) {

        return (
            new Date(exam.endsAt) <
            new Date()
        );
    }

    function isStarted(exam) {

        return (
            new Date(exam.startsAt) <=
            new Date()
        );
    }

    return (
        <div className="w-full min-h-screen">

            <h1 className="text-3xl font-bold mb-5">
                Exams
            </h1>

            <div className="flex flex-wrap gap-5">

                {exams.length === 0 && (
                    <p className="text-gray-500">
                        No exams available.
                    </p>
                )}

                {exams.map(exam => {

                    const todayExam =
                        isToday(exam);

                    const finished =
                        isFinished(exam);

                    const started =
                        isStarted(exam);

                    return (
                        <div
                            key={exam.id}
                            className={`w-[30vw] min-w-80 min-h-64 p-5 rounded-2xl flex flex-col justify-between ${
                                todayExam
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-400"
                            }`}
                        >

                            <div>

                                <h2 className="text-2xl font-bold">
                                    {exam.title}
                                </h2>

                                <p className="mt-2">
                                    {exam.description}
                                </p>

                                <p className="mt-3">
                                    Start:{" "}
                                    {exam.startsAt}
                                </p>

                                <p>
                                    End:{" "}
                                    {exam.endsAt}
                                </p>

                                <p className="font-bold mt-2">
                                    Questions:{" "}
                                    {exam.numberOfQuestion}
                                </p>

                            </div>

                            <button
                                type="button"
                                disabled={
                                    finished ||
                                    !started
                                }
                                onClick={() =>
                                    navigate(
                                        `/exam-day/${exam.id}`
                                    )
                                }
                                className={`w-full py-3 rounded-xl font-bold ${
                                    finished ||
                                    !started
                                        ? "bg-gray-300 text-gray-500"
                                        : "bg-black text-white"
                                }`}
                            >
                                {finished
                                    ? "Exam Finished"
                                    : !started
                                    ? "Not Started"
                                    : "Participate"}
                            </button>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}

export default StudentExams;
