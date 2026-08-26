import Exam from "./exams";
function Profile() {

    return (
        <>
            <div className="w-full h-screen">
                <div className="w-full h-[40%]">
                    <div className="w-full h-[70%] bg-gray-200">
                        <div className="w-40 aspect-square rounded-4xl bg-gray-400 absolute top-30 left-3"></div>
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Rasamoelimihamina Tahiana fenosoa</h1>
                    <h3 className="text-xl font-bold">Group: N3</h3>
                    <h3 className="text-xl font-bold">Level: L1</h3>
                    <h3 className="text-xl font-bold">Id: 2345</h3>
                </div>
                <div className="w-full h-auto ">
                    <h1 className="text-3xl font-bold border-b-2">Exams</h1>
                  <Exam/>
                </div>
                {/* <div className="h-10 aspect-square p-2 absolute top-2 left-2 text-black">
                    <p>back</p>
                </div> */}
            </div>
        </>
    );

}

export default Profile;