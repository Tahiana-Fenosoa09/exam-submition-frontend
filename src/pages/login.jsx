import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";

function Login() {

    const navigate =
        useNavigate();

    const { login } =
        useAuth();

    const [form, setForm] =
        useState({
            username: "",
            password: ""
        });

    const [error, setError] =
        useState("");

    function handleChange(event) {

        setForm(previous => ({
            ...previous,
            [event.target.name]:
                event.target.value
        }));
    }

    function handleSubmit(event) {

        event.preventDefault();

        setError("");

        if (!form.username.trim()) {
            setError(
                "Username is required."
            );
            return;
        }

        if (!form.password) {
            setError(
                "Password is required."
            );
            return;
        }

        const result =
            login(
                form.username.trim(),
                form.password
            );

        if (!result.success) {
            setError(result.message);
            return;
        }

        navigate("/home", {
            replace: true
        });
    }

    return (
        <div className="w-full h-dvh flex justify-center items-center">

            <form
                onSubmit={handleSubmit}
                className="w-[35%] h-[50%] flex flex-col justify-around shadow-2xl rounded-xl p-5"
            >

                <h1 className="text-5xl font-bold text-center">
                    Login
                </h1>

                {error && (
                    <div className="bg-red-500 text-white p-3 rounded-xl">
                        {error}
                    </div>
                )}

                <div className="w-full">

                    <label>
                        <h3 className="text-2xl font-medium">
                            Username
                        </h3>

                        <p className="font-light text-gray-600">
                            Please enter your username
                            to access your account.
                        </p>
                    </label>

                    <input
                        name="username"
                        type="text"
                        placeholder="username..."
                        value={form.username}
                        onChange={handleChange}
                        className="w-full p-2 outline-none border-2 rounded-xl"
                    />

                </div>

                <div className="w-full">

                    <label>
                        <h3 className="text-2xl font-medium">
                            Password
                        </h3>

                        <p className="font-light text-gray-600">
                            Please enter your password
                            to access your account.
                        </p>
                    </label>

                    <input
                        name="password"
                        type="password"
                        placeholder="password..."
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-2 outline-none border-2 rounded-xl"
                    />

                </div>

                <div className="w-full flex justify-center items-center">

                    <button
                        type="submit"
                        className="bg-black text-white font-bold rounded-xl w-[30%] py-3"
                    >
                        Login
                    </button>

                </div>

            </form>

        </div>
    );
}

export default Login;

