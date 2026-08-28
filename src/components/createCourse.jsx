import { useState } from "react";

function CreateCourse({
    course = null,
    onSubmit,
    onCancel
}) {
    const [form, setForm] = useState({
        code: course?.code ?? "",
        name: course?.name ?? "",
        description: course?.description ?? ""
    });

    const [error, setError] = useState("");

    const isEditing = Boolean(course);

    function handleChange(event) {
        setForm(previous => ({
            ...previous,
            [event.target.name]: event.target.value
        }));
    }

    function submitForm(event) {
        event.preventDefault();

        if (!form.code.trim()) {
            setError("Course code is required.");
            return;
        }

        if (!form.name.trim()) {
            setError("Course name is required.");
            return;
        }

        setError("");

        onSubmit({
            ...(course ?? {}),
            code: form.code.trim(),
            name: form.name.trim(),
            description: form.description.trim()
        });
    }

    return (
        <form
            onSubmit={submitForm}
            className="flex flex-col gap-5"
        >
            <h1 className="text-3xl font-bold text-center">
                {isEditing
                    ? "Edit Course"
                    : "Create Course"}
            </h1>

            {error && (
                <div className="bg-red-500 text-white p-3 rounded-xl">
                    {error}
                </div>
            )}

            <div>
                <label className="font-bold">
                    Code
                </label>

                <input
                    name="code"
                    value={form.code}
                    onChange={handleChange}
                    className="border-2 p-2 w-full rounded-xl"
                    placeholder="PROG2"
                />
            </div>

            <div>
                <label className="font-bold">
                    Name
                </label>

                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="border-2 p-2 w-full rounded-xl"
                    placeholder="Object Oriented Programming"
                />
            </div>

            <div>
                <label className="font-bold">
                    Description
                </label>

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="border-2 p-2 w-full rounded-xl min-h-32"
                    placeholder="Course description..."
                />
            </div>

            <div className="flex gap-3">

                <button
                    type="submit"
                    className="flex-1 bg-black text-white py-3 rounded-xl font-bold"
                >
                    {isEditing ? "Save Changes" : "Create Course"}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 bg-gray-300 py-3 rounded-xl font-bold"
                >
                    Cancel
                </button>

            </div>

        </form>
    );
}

export default CreateCourse;
