function ConfirmDialog({ title, message, onConfirm, onCancel, confirmLabel = "Confirmer" }) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 flex flex-col gap-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-gray-600">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-xl font-bold bg-gray-200"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-xl font-bold bg-red-600 text-white"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;
