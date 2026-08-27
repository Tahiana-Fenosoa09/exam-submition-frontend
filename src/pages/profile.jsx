import Exam from "../pages/exams";
function Profile() {

    return (
        <>
            <div className="w-full h-screen flex flex-col gap-5">
                    <h1 className="text-3xl font-bold text-center">Information</h1>
                <div className="w-full h-auto p-1 flex gap-5 items-center">
                    <div className="w-[50%] h-full flex flex-col ">
                        <div className="">
                            <h1 className="text-xl font-bold text-white bg-gray-400 p-2">Name</h1>
                            <p className="text-xl ">Hello</p>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white  bg-gray-400 p-2">Group</h1>
                            <p className="text-xl">Hello</p>
                        </div>
                    </div>
                    <div  className="w-[50%] h-full flex flex-col ">
                        <div>
                            <h1 className="text-xl font-bold text-white bg-gray-400 p-2">Level</h1>
                            <p className="text-xl">Hello</p>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white  bg-gray-400 p-2">Id</h1>
                            <p className="text-xl">Hello</p>
                        </div>
                    </div>
                </div>
                    <div className="w-full h-auto ">
                        <h1 className="text-3xl font-bold text-center">Exams</h1>
                         <Exam />
                    </div>
                    {/* { !isOwner ? < Back /> : null } */}
            </div>
        </>
    );

}

export default Profile;
