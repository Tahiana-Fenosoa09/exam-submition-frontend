import Photo from "../assets/algo.jfif";
import PermissionGate from "./PermissionGate";

function SubjectCard({
    course,
    onEdit,
    onDelete
}) {
    return (
        <div className="w-[30vw] min-w-2xs min-h-64 bg-gray-400 p-3 flex flex-row rounded-2xl">

            <div className="w-[40%] flex flex-col items-center">

                <img
                    src={Photo}
                    className="w-[80%] aspect-square rounded-full object-cover"
                />

                <h3 className="text-2xl font-bold">
                    {course.code}
                </h3>

                <p className="text-xl font-medium">
                    {course.name}
                </p>

            </div>

            <div className="w-[60%] flex flex-col justify-around">

                <div className="p-3 shadow-sm rounded-2xl bg-white">
                    <h3 className="font-bold">
                        {course.code}
                    </h3>
                </div>

                <div>
                    <h3 className="font-bold">
                        {course.name}
                    </h3>

                    <p>
                        {course.description}
                    </p>
                </div>

                <PermissionGate
                    resource="courses"
                    action="update"
                >
                    <button
                        type="button"
                        onClick={() => onEdit(course)}
                        className="w-[70%] h-10 font-bold rounded-xl bg-black text-white"
                    >
                        Edit
                    </button>
                </PermissionGate>

                <PermissionGate
                    resource="courses"
                    action="delete"
                >
                    <button
                        type="button"
                        onClick={() => onDelete(course.id)}
                        className="w-[70%] h-10 font-bold rounded-xl bg-red-600 text-white"
                    >
                        Delete
                    </button>
                </PermissionGate>

            </div>

        </div>
    );
}

export default SubjectCard;
