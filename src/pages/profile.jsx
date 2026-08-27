import Exam from "../pages/exams";
import Empty from "../components/empty";
function Profile({ profileType = 'personal', firstName = 'Goerge', group ='N3', level = 'L1', id = 123, isAdmin = false, isOwner = true }) {

    return (
        <>
            {profileType == 'personal ' ? (
                <>
                    <div className="w-full h-screen flex flex-col gap-5">
                        <h1 className="text-3xl font-bold text-center">Information</h1>
                        {isOwner ? <h1>I am owner</h1> : null}
                        <div className="w-full h-auto p-1 flex gap-5 items-center">
                            <div className="w-[50%] h-full flex flex-col ">
                                <div className="">
                                    <h1 className="text-xl font-bold text-white bg-gray-400 p-2">Name</h1>
                                    <p className="text-xl ">{firstName}</p>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-white  bg-gray-400 p-2">Group</h1>
                                    <p className="text-xl">{group}</p>
                                </div>
                            </div>
                            <div className="w-[50%] h-full flex flex-col ">
                                <div>
                                    <h1 className="text-xl font-bold text-white bg-gray-400 p-2">Level</h1>
                                    <p className="text-xl">{level}</p>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-white  bg-gray-400 p-2">Id</h1>
                                    <p className="text-xl">{id}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-auto ">
                            <h1 className="text-3xl font-bold text-center">Exams</h1>
                            {isAdmin || isOwner ? <Exam /> : <Empty/> }
                        </div>

                        {/* { !isOwner ? < Back /> : null } */}
                    </div>
                </>
            ) : profileType == 'general' ? (
                <>
                    <div className="w-[80%] h-[80%] flex flex-col gap-5 absolute top-20 left-28 bg-gray-100 shadow rounded-2xl">
                        <h1 className="text-3xl font-bold text-center">Information</h1>
                        <div className="w-full h-auto p-1 flex gap-5 items-center">
                            <div className="w-[50%] h-full flex flex-col ">
                                <div className="">
                                    <h1 className="text-xl font-bold text-white bg-gray-400 p-2">Name</h1>
                                    <p className="text-xl ">{firstName}</p>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-white  bg-gray-400 p-2">Group</h1>
                                    <p className="text-xl">{group}</p>
                                </div>
                            </div>
                            <div className="w-[50%] h-full flex flex-col ">
                                <div>
                                    <h1 className="text-xl font-bold text-white bg-gray-400 p-2">Level</h1>
                                    <p className="text-xl">{level}</p>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-white  bg-gray-400 p-2">Id</h1>
                                    <p className="text-xl">{id}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-auto  overflow-auto">
                            <h1 className="text-3xl font-bold text-center">Exams</h1>
                            {isAdmin || isOwner ? <Exam /> : <Empty/> }
                        </div>


                        <div className="w-6 aspect-square rounded-4xl bg-black absolute top-1 left-2"></div>

                        {/* { !isOwner ? < Back /> : null } */}
                    </div>
                </>
            ) : null
            }
        </>
    );

}

export default Profile;
