import { useEffect, useState, useRef } from "react";


function ExamTimer({ endsAt, onExpire }) {
    const [remainingMs, setRemainingMs] = useState(() => new Date(endsAt) - new Date());
    const hasExpiredRef = useRef(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const diff = new Date(endsAt) - new Date();
            setRemainingMs(diff);

            if (diff <= 0 && !hasExpiredRef.current) {
                hasExpiredRef.current = true;
                clearInterval(interval);
                onExpire?.();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [endsAt, onExpire]);

    const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const isUrgent = totalSeconds <= 60;

    return (
        <div
            className={`font-bold text-2xl px-4 py-2 rounded-xl ${
                isUrgent ? "bg-red-600 text-white animate-pulse" : "bg-gray-800 text-white"
            }`}
        >
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
    );
}

export default ExamTimer;
