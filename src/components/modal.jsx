function Modal({ open, onClose, children }) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-auto bg-white rounded-2xl shadow-2xl p-5">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black text-white font-bold"
                >
                    ×
                </button>

                {children}
            </div>
        </div>
    );
}

export default Modal;
