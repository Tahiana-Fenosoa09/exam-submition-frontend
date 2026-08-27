import { useState } from "react";

function CreateExam() {
    const [formResult, setFormResult] = useState({
        subject: "",
        topic: "",
        duration: "",
        dueDate: "",
        createdAt: "",
        description: ""
    });

    // const allForms = [
    //     {
    //         title: "Subject",
    //         assignedValue: formResult.subject,
    //         inputType: "text",

    //     }
    // ]


    function submitForm(e) {
        e.preventDefault();
    }

    return (
        <>
            <form
                onSubmit={submitForm}
                className="w-2xl h-[50vh] bg-white rounded-2xl shadow-2xl flex flex-col justify-between gap-1.5 absolute top-3/12 left-1/4 p-2"
            >
                <h1 className="text-2xl font-bold text-center">Create new Exam</h1>
                <div className="w-full h-auto flex gap-2">
                    <div className="w-[50%]">
                        <label >
                            <h3 className="text-xl">Subject</h3>
                        </label>
                        <input
                            type="text"
                            placeholder="subject"
                            className="border-2 p-1 w-full"
                            value={formResult.subject}
                            onChange={(e) => {
                                setFormResult(previousForm => ({
                                    ...previousForm,
                                    subject: e.target.value
                                }));
                            }}
                        />
                    </div>

                    <div className="w-[50%]">
                        <label >
                            <h3 className="text-xl">Topic</h3>
                        </label>
                        <input
                            type="text"
                            placeholder="topic"
                            className="border-2 p-1 w-full"
                            value={formResult.topic}
                            onChange={(e) => {
                                setFormResult(previousForm => ({
                                    ...previousForm,
                                    topic: e.target.value
                                }));
                            }}
                        />
                    </div>
                </div>

                <div className="w-full h-auto flex gap-2">
                    <div className="w-[50%]">
                        <label >
                            <h3 className="text-xl">Duration</h3>
                        </label>
                        <input
                            type="text"
                            placeholder="duration"
                            className="border-2 p-1 w-full"
                            value={formResult.duration}
                            onChange={(e) => {
                                setFormResult(previousForm => ({
                                    ...previousForm,
                                    duration: e.target.value
                                }));
                            }}
                        />
                    </div>

                    <div className="w-[50%]">
                        <label >
                            <h3 className="text-xl">Due to</h3>
                        </label>
                        <input
                            type="text"
                            placeholder="due to"
                            className="border-2 p-1 w-full"
                            value={formResult.dueDate}
                            onChange={(e) => {
                                setFormResult(previousForm => ({
                                    ...previousForm,
                                    dueDate: e.target.value
                                }));
                            }}
                        />
                    </div>
                </div>

                <div className="w-full h-auto flex gap-2">
                    <div className="w-[50%]">
                        <label >
                            <h3 className="text-xl">Created At</h3>
                        </label>
                        <input
                            type="text"
                            placeholder="created at"
                            className="border-2 p-1 w-full"
                            value={formResult.createdAt}
                            onChange={(e) => {
                                setFormResult(previousForm => ({
                                    ...previousForm,
                                    createdAt: e.target.value
                                }));
                            }}
                        />
                    </div>

                    <div className="w-[50%]">
                        <label >
                            <h3 className="text-xl">Description</h3>
                        </label>
                        <input
                            type="text"
                            placeholder="description"
                            className="border-2 p-1 w-full"
                            value={formResult.description}
                            onChange={(e) => {
                                setFormResult(previousForm => ({
                                    ...previousForm,
                                    description: e.target.value
                                }));
                            }}
                        />
                    </div>
                </div>

                <div className="w-full h-auto flex justify-center items-center">

                    <button type="submit" className="h-9 w-[50%] rounded-xl text-white font-bold bg-black">
                        Submit
                    </button>
                </div>

                <div className="w-6 aspect-square rounded-4xl bg-black absolute top-1 left-2">
                </div>
            </form>
        </>
    );
}

export default CreateExam;
