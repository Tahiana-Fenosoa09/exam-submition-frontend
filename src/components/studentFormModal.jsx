import { useState } from "react";


function StudentFormModal({ studentToEdit, onSubmit, onCancel }) {
    const isEditing = !!studentToEdit;

    const [form, setForm] = useState({
        fullName: studentToEdit?.fullName ?? "",
        email: studentToEdit?.email ?? "",
        password: "",
        isActive: studentToEdit?.isActive ?? true,
    });
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    function updateField(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            await onSubmit(form);
        } catch (err) {
            setError(err.response?.data?.message ?? "Une erreur est survenue.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-2xl p-6 w-96 flex flex-col gap-3"
            >
                <h2 className="text-xl font-bold">
                    {isEditing ? "Modifier l'étudiant" : "Créer un étudiant"}
                </h2>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <div>
                    <label className="text-sm font-medium">Nom complet</label>
                    <input
                        type="text"
                        className="border-2 p-2 w-full rounded-lg"
                        value={form.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                        type="email"
                        className="border-2 p-2 w-full rounded-lg"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        required
                    />
                </div>

                {!isEditing && (
                    <div>
                        <label className="text-sm font-medium">
                            Mot de passe initial (à communiquer à l'étudiant)
                        </label>
                        <input
                            type="text"
                            className="border-2 p-2 w-full rounded-lg"
                            value={form.password}
                            onChange={(e) => updateField("password", e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>
                )}

                {isEditing && (
                    <label className="flex items-center gap-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            checked={form.isActive}
                            onChange={(e) => updateField("isActive", e.target.checked)}
                        />
                        Compte actif
                    </label>
                )}

                <div className="flex justify-end gap-3 mt-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 rounded-xl font-bold bg-gray-200"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-4 py-2 rounded-xl font-bold bg-black text-white disabled:opacity-50"
                    >
                        {submitting ? "..." : isEditing ? "Enregistrer" : "Créer"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default StudentFormModal;
