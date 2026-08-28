import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchOwnProfile, fetchUserById, fetchUserAttempts } from "../services/usersService";
import { fetchMyAttempts } from "../services/attemptsService";
import ChangePasswordForm from "../components/changePasswordForm";

function Profile() {
    const { userId } = useParams(); 
    const isOwnProfile = !userId;

    const [profile, setProfile] = useState(null);
    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setError("");
            try {
                const [profileData, attemptsData] = await Promise.all([
                    isOwnProfile ? fetchOwnProfile() : fetchUserById(userId),
                    isOwnProfile ? fetchMyAttempts() : fetchUserAttempts(userId),
                ]);
                if (cancelled) return;
                setProfile(profileData);
                setAttempts(attemptsData);
            } catch {
                if (!cancelled) setError("Impossible de charger ce profil. Le backend est-il démarré ?");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [userId, isOwnProfile]);

    if (loading) return <p className="p-4 text-xl">Chargement...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;
    if (!profile) return null;

    return (
        <div className="w-full h-full flex flex-col gap-6 p-2">
            <h1 className="text-3xl font-bold text-center">
                {isOwnProfile ? "Mon profil" : `Profil de ${profile.fullName}`}
            </h1>

            <div className="w-full flex gap-5">
                <div className="w-1/2 flex flex-col gap-2">
                    <div>
                        <h2 className="text-lg font-bold text-white bg-gray-400 p-2">Nom</h2>
                        <p className="text-xl p-1">{profile.fullName}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white bg-gray-400 p-2">Email</h2>
                        <p className="text-xl p-1">{profile.email}</p>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col gap-2">
                    <div>
                        <h2 className="text-lg font-bold text-white bg-gray-400 p-2">Rôle</h2>
                        <p className="text-xl p-1">{profile.role}</p>
                    </div>
                    {!isOwnProfile && (
                        <div>
                            <h2 className="text-lg font-bold text-white bg-gray-400 p-2">Statut</h2>
                            <p className="text-xl p-1">{profile.isActive === false ? "Inactif" : "Actif"}</p>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-2">Examens et notes précédents</h2>
                {attempts.length === 0 && <p className="text-gray-500">Aucun examen passé pour le moment.</p>}
                {attempts.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <div className="grid grid-cols-4 bg-gray-400 text-white font-bold p-2 rounded-xl">
                            <p>UE</p>
                            <p>Examen</p>
                            <p>Note</p>
                            <p>Soumis le</p>
                        </div>
                        {attempts.map((a, index) => (
                            <div
                                key={a.id}
                                className={`grid grid-cols-4 p-2 rounded-xl ${index % 2 === 0 ? "" : "bg-gray-200"}`}
                            >
                                <p>{a.courseName}</p>
                                <p>{a.examTitle}</p>
                                <p className="font-bold">{a.score}</p>
                                <p>{a.submittedAt ? new Date(a.submittedAt).toLocaleString() : "—"}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isOwnProfile && (
                <div>
                    <ChangePasswordForm />
                </div>
            )}
        </div>
    );
}

export default Profile;
