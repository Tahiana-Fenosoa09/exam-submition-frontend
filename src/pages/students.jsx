import { useParams } from "react-router";
import StudentCard from "../components/studentCard";
import { useState } from "react";

function Student() {

    const authentifiedUser = {
        id: 3,
        firstName: 'Stanley',
        lastName: 'Shang',
        group: 'N3',
        level: 'L1',
        isAdmin: false
    }

    const [students, setStudents] = useState([
        {
            id: 1,
            firstName: 'Steevey',
            lastName: 'Rakoto',
            group: 'N3',
            level: 'L1',
            isAdmin: false
        },
        {
            id: 2,
            firstName: 'Prudence',
            lastName: 'RaJean',
            group: 'N3',
            level: 'L1',
            isAdmin: false
        }, {
            id: 3,
            firstName: 'Stanley',
            lastName: 'Shang',
            group: 'N3',
            level: 'L1',
            isAdmin: false
        }, {
            id: 4,
            firstName: 'Junioh',
            lastName: 'Ok',
            group: 'N3',
            level: 'L1',
            isAdmin: false
        }
    ]);

    return (
        <>
            <div className="w-full h-screen flex flex-col gap-1">
                <div className="w-full h-[5%] flex flex-row justify-end items-center">
                    <button className="bg-gray-400 text-white font-bold w-[10%] h-full rounded-2xl" >Create Student</button>
                </div>
                <div className="w-full h-full flex-col">
                    <div className="w-full h-[7%] bg-gray-400 rounded-xl">
                        <ul className="w-full h-full p-2 grid grid-cols-5">
                            <li>
                                <p className="font-medium">id</p>
                            </li>
                            <li>
                                <p className="font-medium">First-Name</p>
                            </li>
                            <li>
                                <p className="font-medium">Last-Name</p>
                            </li>
                            <li>
                                <p className="font-medium">Group</p>
                            </li>
                            <li>
                                <p className="font-medium">Level</p>
                            </li>
                        </ul>
                    </div>
                    {students.map((e, index) => {
                        if (e.id == authentifiedUser.id) {
                            return <StudentCard key={e.id} id={e.id} firstName={e.firstName} lastName={e.lastName} group={e.group} level={e.level} index={index} isAdmin={e.isAdmin} isOwner={true}  />
                        } else {
                            return <StudentCard key={e.id} id={e.id} firstName={e.firstName} lastName={e.lastName} group={e.group} level={e.level} index={index} isAdmin={e.isAdmin} isOwner={false}/>
                        }
                    })}
                </div>
            </div>
        </>
    );

}

export default Student;