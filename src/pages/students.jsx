import { useParams } from "react-router";
import StudentCard from "../components/studentCard";
import { useState } from "react";

function Student() {
    const [students, setStudents] = useState([
        {
            id: 1,
            firstName: 'Steevey',
            lastName: 'Rakoto',
            group: 'N3',
            level: 'L1',
            role: 'student'
        },
        {
            id: 2,
            firstName: 'Prudence',
            lastName: 'RaJean',
            group: 'N3',
            level: 'L1',
            role: 'student'
        }, {
            id: 3,
            firstName: 'Stanley',
            lastName: 'Shang',
            group: 'N3',
            level: 'L1',
            role: 'student'
        }, {
            id: 4,
            firstName: 'Junioh',
            lastName: 'Ok',
            group: 'N3',
            level: 'L1',
            role: 'student'
        }
    ]);

    const { userId } = useParams();

    const dataToFind = students.find( student => students.id == userId);
    
    
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
                    {students.map((e,index) => <StudentCard key={e.id} id={e.id} firstName={e.firstName} lastName={e.lastName} group={e.group} level={e.level} index={index}/>)}
                </div>
            </div>
        </>
    );

}

export default Student;