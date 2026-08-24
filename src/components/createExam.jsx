import { useState } from "react";
function CreateExam(){
    const [ formResult , setFormResult ] = useState({
         subject: "",
            topic: "",
            duration : "",
            dueDate : "",
            createdAt : "", 
            description: ""
    });

    const submitForm = (e) => {
        e.preventDefault();
        console.log(formResult);
    }

    return(
        <>
            <form className="w-[80%] h-[80%] bg-white rounded-2xl shadow-2xl">
                <input type="text " 
                placeholder="subject" 
                onChange={(e) =>  setFormResult({...form, subject:  e.target.value})}/>
                <input type="text"
                 placeholder="topic"
                  onChange={(e) => setFormResult({...form, topic:  e.target.value})}/>
                <input type="text"
                 placeholder="duration"
                 onChange={(e) => setFormResult({...form, duration:  e.target.value})}/>
                <input type="text" 
                placeholder="due to "
                onChange={(e) => setFormResult({...form, dueDate:  e.target.value})}/>
                <input type="text" 
                placeholder="description"
                onChange={(e) => setFormResult({...form, createdAt:  e.target.value})}/>
                <input type="text" 
                placeholder="description"
                onChange={(e) => setFormResult({...form, description:  e.target.value})}/>
                <button onClick={submitForm}>Submit</button>
            </form>
        </> 
    );
    
}
    
export default CreateExam;