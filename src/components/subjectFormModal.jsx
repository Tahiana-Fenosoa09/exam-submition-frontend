import { useState } from "react";


function SubjectFormModal({ courseToEdit, onSubmit, onCancel }) {
    const isEditing = !!courseToEdit;

    const [form, setForm] = useState({
        code: courseToEdit?.code ?? "",
        name: courseToEdit?.name ?? "",
        description: courseToEdit?.description ?? "",
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
                    {isEditing ? "Modifier l'UE" : "Créer une UE"}
                </h2>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <div>
                    <label className="text-sm font-medium">Code (ex: PROG2)</label>
                    <input
                        type="text"
                        className="border-2 p-2 w-full rounded-lg"
                        value={form.code}
                        onChange={(e) => updateField("code", e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Nom</label>
                    <input
                        type="text"
                        className="border-2 p-2 w-full rounded-lg"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                        className="border-2 p-2 w-full rounded-lg"
                        rows={3}
                        value={form.description}
                        onChange={(e) => updateField("description", e.target.value)}
                    />
                </div>

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

export default SubjectFormModal;
