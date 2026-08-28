import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            await login(email, password);
            navigate("/home");
        } catch (err) {
            if (err.response?.status === 401) {
                setError("Email ou mot de passe incorrect.");
            } else {
                setError("Une erreur est survenue. Réessaie plus tard.");
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <div className="w-full h-dvh flex justify-center items-center">
                <form
                    onSubmit={handleSubmit}
                    className="w-[35%] h-auto flex flex-col justify-around align-middle shadow-2xl rounded-xl p-3 gap-3"
                >
                    <h1 className="text-5xl font-bold text-center">Login in</h1>

                    {error && (
                        <p className="text-red-600 text-center font-medium">{error}</p>
                    )}

                    <div className="w-full">
                        <label>
                            <h3 className="text-2xl font-medium">email</h3>
                            <p className="font-light text-gray-600">
                                please enter the email to access your account . If you don't know it , please go talk to admin
                            </p>
                        </label>
                        <input
                            type="email"
                            placeholder="email..."
                            className="w-[50%] p-2 outline-none border-0 border-b-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="w-full">
                        <label>
                            <h3 className="text-2xl font-medium">password</h3>
                            <p className="font-light text-gray-600">
                                please enter the password to access your account . If you don't know it , please go talk to admin . After first login , you can always change it later
                            </p>
                        </label>
                        <input
                            type="password"
                            placeholder="password..."
                            className="w-[50%] p-2 outline-none border-0 border-b-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="w-full h-[8%] flex justify-center items-center">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-black text-white font-bold rounded-xl w-[20%] h-full disabled:opacity-50"
                        >
                            {submitting ? "..." : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
