import { useState } from "react";
import ExamCard from "./examCard";

function CreateExam() {
    const [formResult, setFormResult] = useState({
        subject: "",
        topic: "",
        duration: "",
        dueDate: "",
        createdAt: "01/02/2022",
        description: ""
    });

    const [created, setCreated] = useState(false);

    function submitForm(e) {
        e.preventDefault();
        setCreated(true);
    }

    return (
        <>
            <form
                onSubmit={submitForm}
                className="w-[80%] h-[80%] bg-white rounded-2xl shadow-2xl"
            >
                <input
                    type="text"
                    placeholder="subject"
                    value={formResult.subject}
                    onChange={(e) => {
                        setFormResult(previousForm => ({
                            ...previousForm,
                            subject: e.target.value
                        }));
                    }}
                />

                <input
                    type="text"
                    placeholder="topic"
                    value={formResult.topic}
                    onChange={(e) => {
                        setFormResult(previousForm => ({
                            ...previousForm,
                            topic: e.target.value
                        }));
                    }}
                />

                <input
                    type="text"
                    placeholder="duration"
                    value={formResult.duration}
                    onChange={(e) => {
                        setFormResult(previousForm => ({
                            ...previousForm,
                            duration: e.target.value
                        }));
                    }}
                />

                <input
                    type="text"
                    placeholder="due to"
                    value={formResult.dueDate}
                    onChange={(e) => {
                        setFormResult(previousForm => ({
                            ...previousForm,
                            dueDate: e.target.value
                        }));
                    }}
                />

                <input
                    type="text"
                    placeholder="created at"
                    value={formResult.createdAt}
                    onChange={(e) => {
                        setFormResult(previousForm => ({
                            ...previousForm,
                            createdAt: e.target.value
                        }));
                    }}
                />

                <input
                    type="text"
                    placeholder="description"
                    value={formResult.description}
                    onChange={(e) => {
                        setFormResult(previousForm => ({
                            ...previousForm,
                            description: e.target.value
                        }));
                    }}
                />

                <button type="submit">
                    Submit
                </button>
            </form>

            {created && (
                <ExamCard
                    subject={formResult.subject}
                    topic={formResult.topic}
                    duration={formResult.duration}
                    dueDate={formResult.dueDate}
                    createdAt={formResult.createdAt}
                    description={formResult.description}
                />
            )}
        </>
    );
}

export default CreateExam;
