import { useState } from "react";

function CreateStudent({setStudents}) {
    const [formResult, setFormResult] = useState({
        id: "",
        firstName: "",
        lastName: "",
        group: "",
        level: "",
        isAdmin: "",
        isOwner: ""
    });


    function submitForm(e) {
        e.preventDefault();
        setStudents(e => ([...e, formResult]));
    }

    return (
        <>
            <form
                onSubmit={submitForm}
                className="w-2xl h-[50vh] bg-white rounded-2xl shadow-2xl flex flex-col justify-between gap-1.5 absolute top-3/12 left-1/4 p-2"
            >
                <h1 className="text-2xl font-bold text-center">Create Student</h1>
                <div className="w-full h-auto flex gap-2">
                    <div className="w-[50%]">
                        <label >
                            <h3 className="text-xl">id</h3>
                        </label>
                        <input
                            type="text"
                            placeholder="id"
                            className="border-2 p-1 w-full"
                            value={formResult.id}
                            onChange={(e) => {
                                setFormResult(previousForm => ({
                                    ...previousForm,
                                    id: e.target.value
                                }));
                            }}
                        />
                    </div>

                    <div className="w-[50%]">
                        <label >
                            <h3 className="text-xl">first-name</h3>
                        </label>
                        <input
                            type="text"
                            placeholder="first-name"
                            className="border-2 p-1 w-full"
                            value={formResult.firstName}
                            onChange={(e) => {
                                setFormResult(previousForm => ({
                                    ...previousForm,
                                    firstName: e.target.value
                                }));
                            }}
                        />
                    </div>
                </div>

                <div className="w-full h-auto flex gap-2">
                    <div className="w-[50%]">
                        <label >
                            <h3 className="text-xl">last-name</h3>
                        </label>
                        <input
                            type="text"
                            placeholder="last-name"
                            className="border-2 p-1 w-full"
                            value={formResult.lastName}
                            onChange={(e) => {
                                setFormResult(previousForm => ({
                                    ...previousForm,
                                    lastName: e.target.value
                                }));
                            }}
                        />
                    </div>

                    <div className="w-[50%]">
                        <label >
                            <h3 className="text-xl">group</h3>
                        </label>
                        <input
                            type="text"
                            placeholder="group"
                            className="border-2 p-1 w-full"
                            value={formResult.group}
                            onChange={(e) => {
                                setFormResult(previousForm => ({
                                    ...previousForm,
                                    group: e.target.value
                                }));
                            }}
                        />
                    </div>
                </div>

                <div className="w-full h-auto flex gap-2">
                    <div className="w-[50%]">
                        <label >
                            <h3 className="text-xl">Level</h3>
                        </label>
                        <input
                            type="text"
                            placeholder="level"
                            className="border-2 p-1 w-full"
                            value={formResult.level}
                            onChange={(e) => {
                                setFormResult(previousForm => ({
                                    ...previousForm,
                                    level: e.target.value
                                }));
                            }}
                        />
                    </div>

                    <div className="w-[50%]">
                        <label >
                            <h3 className="text-xl">isAdmin</h3>
                        </label>
                        <input
                            type="text"
                            placeholder="isAdmin"
                            className="border-2 p-1 w-full"
                            value={formResult.isAdmin}
                            onChange={(e) => {
                                setFormResult(previousForm => ({
                                    ...previousForm,
                                    isAdmin: e.target.value
                                }));
                            }}
                        />
                    </div>
                </div>

                <div className="w-full">
                        <label >
                            <h3 className="text-xl">Owner</h3>
                        </label>
                        <input
                            type="text"
                            placeholder="owner"
                            className="border-2 p-1 w-full"
                            value={formResult.isOwner}
                            onChange={(e) => {
                                setFormResult(previousForm => ({
                                    ...previousForm,
                                    isOwner: e.target.value
                                }));
                            }}
                        />
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

export default CreateStudent;
