import Exam from "./exams";
import Student from "./students";
import { Route , Routes , NavLink} from "react-router";
    
function Home(){
    return(
        <>
            <div className="h-full w-full flex flex-col gap-5 p-2">
                <h1 className='text-3xl font-bold text-gray-500'>HOME PAGE</h1>
                <nav className="w-full h-[5%] flex items-center gap-5">
                    <NavLink to="/students" className={({isActive}) => isActive ? "text-2xl border-b-2" : "text-2xl text-gray-500"}>Students</NavLink>
                    <NavLink to="/exams" className={({isActive}) => isActive ? "text-2xl border-b-2" : "text-2xl text-gray-500"}>Exams</NavLink>
                </nav>
                <Routes>
                    <Route path="/exams" element={<Exam/>}/>
                    <Route path="/students" element={<Student/>}/>
                </Routes>
            </div>
        </> 
    );
    
}
    
export default Home;