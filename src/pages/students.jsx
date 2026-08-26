import StudentCard from "../components/student";
import { useState } from "react";

function Student() {
    const [students, setStudents] = useState([
        {
            id: 1234,
            firstName: 'Steevey',
            lastName: 'Rakoto',
            group: 'N3',
            level: 'L1'
        },
        {
            id: 1221,
            firstName: 'Prudence',
            lastName: 'RaJean',
            group: 'N3',
            level: 'L1'
        }, {
            id: 1233,
            firstName: 'Stanley',
            lastName: 'Shang',
            group: 'N3',
            level: 'L1'
        }, {
            id: 1223,
            firstName: 'Junioh',
            lastName: 'Ok',
            group: 'N3',
            level: 'L1'
        }
    ]);
    return (
        <>
            <div className="">
                <div className="w-full h-full flex-col">
                    <div className="w-full h-[10%] bg-gray-400 rounded-xl">
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
                    {students.map((e,index) => <StudentCard id={e.id} firstName={e.firstName} lastName={e.lastName} group={e.group} level={e.level} index={index}/>)}
                </div>
            </div>
        </>
    );

}

export default Student;