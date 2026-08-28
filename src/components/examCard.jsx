import { useNavigate } from "react-router";
import Photo from '../assets/algo.jfif'
import { useAuth } from '../context/useAuth';

function ExamCard({ id, courseName, title, description, startsAt, endsAt, onEdit, onDelete }) {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    const formattedStart = startsAt ? new Date(startsAt).toLocaleString() : "—";
    const durationMinutes = startsAt && endsAt
        ? Math.round((new Date(endsAt) - new Date(startsAt)) / 60000)
        : null;

    return (
        <div className="w-[30vw] h-70 cols-span-1 bg-gray-400 p-2 flex flex-row rounded-2xl">
            <div className='w-[50%] h-full flex flex-col align-center'>
                <img src={Photo} className='w-[80%] aspect-square rounded-full ' />
                <h3 className='text-2xl font-bold '>{courseName}</h3>
                <p className='text-lg font-medium'>{title}</p>
            </div>
            <div className='w-[70%] h-full flex flex-col content-between justify-around'>
                <div className='p-2 h-auto shadow-sm rounded-2xl bg-white'>
                    <h3 className="font-bold text-sm">Début : {formattedStart}</h3>
                    {durationMinutes && <h3 className="font-bold text-sm">Durée : {durationMinutes} min</h3>}
                </div>
                <div>
                    <p className="text-sm">{description}</p>
                </div>

                {isAdmin ? (
                    <div className="flex gap-2">
                        <button
                            onClick={onEdit}
                            className='w-[50%] h-10 font-bold rounded-xl bg-black text-white'
                        >
                            Edit
                        </button>
                        <button
                            onClick={onDelete}
                            className='w-[50%] h-10 font-bold rounded-xl bg-red-600 text-white'
                        >
                            Delete
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate(`/exams/${id}/participate`)}
                        className='w-[50%] h-10 font-bold rounded-xl bg-black text-white'
                    >
                        Participate
                    </button>
                )}
            </div>
        </div>
    );
}

export default ExamCard;
