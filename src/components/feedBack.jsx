export function Success({ message }) {
    return (
        <div className="w-full p-3 rounded-xl bg-green-500 text-white font-medium">
            {message}
        </div>
    );
}

export function ErrorMessage({ message }) {
    if (!message) {
        return null;
    }

    return (
        <div className="w-full p-3 rounded-xl bg-red-500 text-white font-medium">
            {message}
        </div>
    );
}

export function Loading({ message = "Loading..." }) {
    return (
        <div className="w-full p-3 rounded-xl bg-gray-200 text-gray-700 font-medium text-center">
            {message}
        </div>
    );
}
