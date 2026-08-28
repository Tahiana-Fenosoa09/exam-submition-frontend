import { useState } from "react";

function CreateExam({
    exam = null,
    onSubmit,
    onCancel
}) {
    const [form, setForm] = useState({
        courseId: exam?.courseId ?? "",
        title: exam?.title ?? "",
        description: exam?.description ?? "",
        startsAt: exam?.startsAt ?? "",
        endsAt: exam?.endsAt ?? ""
    });

    const [error, setError] = useState("");

    const isEditing = Boolean(exam);

    function handleChange(event) {
        setForm(previous => ({
            ...previous,
            [event.target.name]: event.target.value
        }));
    }

    function submitForm(event) {
        event.preventDefault();

        if (!form.courseId) {
            setError("Course is required.");
            return;
        }

        if (!form.title.trim()) {
            setError("Exam title is required.");
            return;
        }

        if (!form.startsAt || !form.endsAt) {
            setError("Start and end dates are required.");
            return;
        }

        if (
            new Date(form.startsAt) >=
            new Date(form.endsAt)
        ) {
            setError("The exam must start before it ends.");
            return;
        }

        setError("");

        onSubmit({
            ...(exam ?? {}),
            courseId: Number(form.courseId),
            title: form.title.trim(),
            description: form.description.trim(),
            startsAt: form.startsAt,
            endsAt: form.endsAt
        });
    }

    return (
        <form
            onSubmit={submitForm}
            className="flex flex-col gap-5"
        >
            <h1 className="text-3xl font-bold text-center">
                {isEditing
                    ? "Edit Exam"
                    : "Create Exam"}
            </h1>

            {error && (
                <div className="bg-red-500 text-white p-3 rounded-xl">
                    {error}
                </div>
            )}

            <div>
                <label className="font-bold">
                    Course ID
                </label>

                <input
                    name="courseId"
                    type="number"
                    value={form.courseId}
                    onChange={handleChange}
                    className="border-2 p-2 w-full rounded-xl"
                />
            </div>

            <div>
                <label className="font-bold">
                    Title
                </label>

                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="border-2 p-2 w-full rounded-xl"
                    placeholder="Object Oriented Programming Exam"
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
                    className="border-2 p-2 w-full rounded-xl min-h-24"
                />
            </div>

            <div className="grid grid-cols-2 gap-3">

                <div>
                    <label className="font-bold">
                        Starts at
                    </label>

                    <input
                        name="startsAt"
                        type="datetime-local"
                        value={form.startsAt}
                        onChange={handleChange}
                        className="border-2 p-2 w-full rounded-xl"
                    />
                </div>

                <div>
                    <label className="font-bold">
                        Ends at
                    </label>

                    <input
                        name="endsAt"
                        type="datetime-local"
                        value={form.endsAt}
                        onChange={handleChange}
                        className="border-2 p-2 w-full rounded-xl"
                    />
                </div>

            </div>

            <div className="flex gap-3">

                <button
                    type="submit"
                    className="flex-1 bg-black text-white py-3 rounded-xl font-bold"
                >
                    {isEditing ? "Save Changes" : "Create Exam"}
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

export default CreateExam;
