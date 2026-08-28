import { useState } from "react";
import { changePassword } from "../services/usersService";

function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (newPassword !== confirmPassword) {
            setError("Les deux nouveaux mots de passe ne correspondent pas.");
            return;
        }
        if (newPassword.length < 6) {
            setError("Le nouveau mot de passe doit faire au moins 6 caractères.");
            return;
        }

        setSubmitting(true);
        try {
            await changePassword({ currentPassword, newPassword });
            setSuccess(true);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            if (err.response?.status === 401) {
                setError("Mot de passe actuel incorrect.");
            } else {
                setError("Une erreur est survenue.");
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm">
            <h3 className="text-xl font-bold">Changer le mot de passe</h3>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">Mot de passe mis à jour.</p>}

            <div>
                <label className="text-sm font-medium">Mot de passe actuel</label>
                <input
                    type="password"
                    className="border-2 p-2 w-full rounded-lg"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium">Nouveau mot de passe</label>
                <input
                    type="password"
                    className="border-2 p-2 w-full rounded-lg"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                />
            </div>

            <div>
                <label className="text-sm font-medium">Confirmer le nouveau mot de passe</label>
                <input
                    type="password"
                    className="border-2 p-2 w-full rounded-lg"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                />
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="bg-black text-white font-bold rounded-xl py-2 disabled:opacity-50"
            >
                {submitting ? "..." : "Mettre à jour"}
            </button>
        </form>
    );
}

export default ChangePasswordForm;
