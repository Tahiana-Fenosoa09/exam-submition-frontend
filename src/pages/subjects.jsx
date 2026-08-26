import { useState } from "react";
import SubjectCard from '../components/subject';
import CreateExam from "../components/createExam";


function Subject() {
    const [subject, setSubject] = useState([
        {
            subject: "PROG2",
            topic: "POO",
            credit: 10,
            level: "L1",
            description: "A simple qcm testing students knowledges on encapsulaation and why do we need them"
        },
        {
            subject: "WEB2",
            topic: "ExpressJS",
            credit: 4,
            level: "L1",
            description: "A simple qcm testing students knowledges on encapsulaation and why do we need them"
        },
        {
            subject: "DONNEES2",
            topic: "Données massive",
            credit: 2,
            level: "L2",
            description: "A simple qcm testing students knowledges on encapsulaation and why do we need them"
        },
        {
            subject: "PROG1",
            topic: "Algorithmique",
            credit: 2,
            level: "L1",
            description: "A simple qcm testing students knowledges on encapsulaation and why do we need them"
        }
    ]);


    return (
        <>
            <div className='w-full h-full'>
                <div className=' w-full h-full flex flex-row flex-wrap gap-[2vw] p-2'>
                    <div className="w-[30vw] h-70 cols-span-1 bg-gray-400 p-2 flex flex-row justify-center items-center rounded-2xl">
                        <h1 className='text-2xl font-bold'>Create New</h1>
                    </div>
                    {subject.map((e) => ( <SubjectCard subject={e.subject} topic={e.topic} credit={e.credit} level={e.level} description={e.description} />)) }
                </div>
            </div>
        </>
    );

}

export default Subject;