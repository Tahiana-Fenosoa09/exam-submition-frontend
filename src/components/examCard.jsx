import Photo from "../assets/algo.jfif";
import PermissionGate from "./PermissionGate";

function ExamCard({
    exam,
    onEdit,
    onDelete,
    onEditQcm
}) {
    const hasQcm =
        exam.questions &&
        exam.questions.length > 0;

    return (
        <div className="w-[30vw] min-w-80 min-h-72 bg-gray-400 p-3 flex flex-row rounded-2xl">

            <div className="w-[40%] flex flex-col items-center">

                <img
                    src={Photo}
                    className="w-[80%] aspect-square rounded-full object-cover"
                />

                <h3 className="text-2xl font-bold text-center">
                    {exam.title}
                </h3>

            </div>

            <div className="w-[60%] flex flex-col justify-around">

                <div>
                    <h3>
                        Start: {exam.startsAt}
                    </h3>

                    <h3>
                        End: {exam.endsAt}
                    </h3>

                    <p>
                        {exam.description}
                    </p>

                    <p>
                        Total question(s):{" "}
                        {exam.numberOfQuestion}
                    </p>

                    <p
                        className={
                            hasQcm
                                ? "text-green-700 font-bold"
                                : "text-red-700 font-bold"
                        }
                    >
                        {hasQcm
                            ? `${exam.questions.length}/${exam.numberOfQuestion} questions saved`
                            : "QCM not created"}
                    </p>
                </div>

                <PermissionGate
                    resource="exams"
                    action="update"
                >
                    <button
                        type="button"
                        onClick={() => onEdit(exam)}
                        className="w-[70%] h-10 font-bold rounded-xl bg-black text-white"
                    >
                        Edit Exam
                    </button>
                </PermissionGate>

                <PermissionGate
                    resource="exams"
                    action="update"
                >
                    <button
                        type="button"
                        onClick={() =>
                            onEditQcm(exam)
                        }
                        className="w-[70%] h-10 font-bold rounded-xl bg-blue-600 text-white"
                    >
                        {hasQcm
                            ? "Edit QCM"
                            : "Add QCM"}
                    </button>
                </PermissionGate>

                <PermissionGate
                    resource="exams"
                    action="delete"
                >
                    <button
                        type="button"
                        onClick={() =>
                            onDelete(exam.id)
                        }
                        className="w-[70%] h-10 font-bold rounded-xl bg-red-600 text-white"
                    >
                        Delete
                    </button>
                </PermissionGate>

            </div>
        </div>
    );
}

export default ExamCard;
