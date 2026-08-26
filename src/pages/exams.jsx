import {useState} from "react";
import ExamCard from '../components/examCard';
import CreateExam from "../components/createExam";
import Success from "../components/success";

function Exam(){
    const [showCreateExam,setShowCreateExam] = useState(false);
    const [created, setCreated] = useState(false);
    const [exams,setExams] = useState([
        {
            subject: "PROG2",
            topic: "Encapsulation",
            duration : "2h",
            dueDate : "03/01/2024",
            createdAt : "01/01/2024", 
            description: "A simple qcm testing students knowledges on encapsulaation and why do we need them"
        },
         {
            subject: "DONNEES2",
            topic: "Data organisation",
            duration : "2h",
            dueDate : "03/01/2024",
            createdAt : "01/01/2024", 
            description: "A simple qcm testing students knowledges on encapsulaation and why do we need them"
        },
         {
            subject: "PRO4",
            topic: "Experience Pro",
            duration : "2h",
            dueDate : "03/01/2024",
            createdAt : "01/01/2024", 
            description: "A simple qcm testing students knowledges on encapsulaation and why do we need them"
        },
         {
            subject: "WEB2",
            topic: "ExpressJs",
            duration : "2h",
            dueDate : "03/01/2024",
            createdAt : "01/01/2024", 
            description: "A simple qcm testing students knowledges on encapsulaation and why do we need them"
         },
          {
            subject: "PROG1",
            topic: "Recursivity",
            duration : "2h",
            dueDate : "03/01/2024",
            createdAt : "01/01/2024", 
            description: "A simple qcm testing students knowledges on encapsulaation and why do we need them"
        }
    ]);

    const examGrid = exams.map((e) => (
        <ExamCard subject={e.subject} topic={e.topic} duration={e.duration} dueDate={e.dueDate} createdAt={e.createdAt} description={e.description}/>
    ));

    const createNewExam = () => {
        setShowCreateExam(prev => !prev);
    }



    return (
        <>
            <div className='w-full h-full'>
                <div className=' w-full h-full flex flex-row flex-wrap gap-[2vw] p-2'>
                    <div className="w-[30vw] h-70 cols-span-1 bg-gray-400 p-2 flex flex-row justify-center items-center rounded-2xl" onClick={createNewExam}>
                        <h1 className='text-2xl font-bold'>Create New</h1>
                    </div>
                    { examGrid }
                </div>
                {showCreateExam ? <CreateExam/> : null}
            </div>
        </>
    );

}

export default Exam;