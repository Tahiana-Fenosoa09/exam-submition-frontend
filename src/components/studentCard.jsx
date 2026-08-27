function StudentCard({
    student,
    currentUser,
    index,
    onOpenProfile
}) {
    const isAdmin = currentUser?.role === "admin";

    const background =
        index % 2 === 0
            ? "bg-white"
            : "bg-gray-200";

    return (
        <div
            className={`w-full ${background} rounded-xl p-3 ${
                isAdmin
                    ? "cursor-pointer hover:bg-gray-300"
                    : ""
            }`}
            onClick={() => {
                if (isAdmin) {
                    onOpenProfile(student);
                }
            }}
        >
            <div className="grid grid-cols-5">

                <p>{student.id}</p>

                <p>{student.fullName}</p>

                <p>{student.email}</p>

                <p className="capitalize">
                    {student.role}
                </p>

                <p>
                    {student.isActive
                        ? "Active"
                        : "Inactive"}
                </p>

            </div>
        </div>
    );
}

export default StudentCard;
