import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";

function StudentCard({ id, fullName, email, isActive, index, onEdit, onDelete }) {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();

    function showProfile() {
        navigate(`/students/${id}`);
    }

    function handleEdit(e) {
        e.stopPropagation();
        onEdit();
    }

    function handleDelete(e) {
        e.stopPropagation();
        onDelete();
    }

    return (
        <div
            className={
                index % 2 === 0
                    ? "w-full h-auto p-2 grid grid-cols-6 rounded-xl items-center cursor-pointer"
                    : "w-full h-auto p-2 grid grid-cols-6 bg-gray-400 rounded-xl items-center cursor-pointer"
            }
            onClick={showProfile}
        >
            <p className="font-medium">{id}</p>
            <p className="font-medium">{fullName}</p>
            <p className="font-medium">{email}</p>
            <p className="font-medium">{isActive ? "Actif" : "Inactif"}</p>
            {isAdmin ? (
                <div className="col-span-2 flex gap-2">
                    <button
                        onClick={handleEdit}
                        className="text-sm font-bold bg-black text-white rounded-lg px-3 py-1"
                    >
                        Éditer
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-sm font-bold bg-red-600 text-white rounded-lg px-3 py-1"
                    >
                        Supprimer
                    </button>
                </div>
            ) : (
                <div className="col-span-2" />
            )}
        </div>
    );
}

export default StudentCard;
