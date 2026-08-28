import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import { initialExams } from "../data/exams";

function ExamHistory() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const submissions =
        JSON.parse(
            localStorage.getItem(
                "examSubmissions"
            ) || "{}"
        );

    const history = initialExams
        .filter(exam =>
            user?.enrolledCourses?.includes(
                exam.courseId
            )
        )
        .filter(
            exam =>
                submissions[
                    `${user.id}-${exam.id}`
                ]
        );

    return (
        <div className="w-full min-h-screen">

            <h1 className="text-3xl font-bold mb-5">
                Exam History
            </h1>

            {history.length === 0 ? (
                <p className="text-gray-500">
                    You haven't participated in any exam yet.
                </p>
            ) : (
                <div className="flex flex-wrap gap-5">

                    {history.map(exam => {

                        const submission =
                            submissions[
                                `${user.id}-${exam.id}`
                            ];

                        return (
                            <div
                                key={exam.id}
                                className="w-[30vw] min-w-80 min-h-56 bg-gray-400 p-5 rounded-2xl flex flex-col justify-between"
                            >

                                <div>

                                    <h2 className="text-2xl font-bold">
                                        {exam.title}
                                    </h2>

                                    <p className="mt-2">
                                        {exam.description}
                                    </p>

                                    <p className="font-bold mt-3">
                                        Score:{" "}
                                        {submission.score}
                                        /
                                        {submission.maxScore}
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            `/exam-result/${exam.id}`
                                        )
                                    }
                                    className="bg-black text-white py-3 rounded-xl font-bold"
                                >
                                    View Result
                                </button>

                            </div>
                        );
                    })}

                </div>
            )}

        </div>
    );
}

export default ExamHistory;
