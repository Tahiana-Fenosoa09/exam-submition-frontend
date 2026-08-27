import Exam from "./exams";
import Student from "./students";
import Subject from "./subjects";
import {  NavLink, Outlet} from "react-router";
    
function Home(){
    const routes = [
        {
            to: "students",
            pathName: "Students",
            element: <Student/>
        },
        {
            to: "exams",
            pathName: "Exams",
            element: <Exam/>
        },
        {
            to: "subjects",
            pathName: "Subjects",
            element: <Subject/>
        }
    ];

    const links = routes.map((e) => { 
        return <NavLink to={e.to} className={({isActive}) => isActive ? "text-2xl border-b-2 text-gray-500" : "text-2xl "}>{e.pathName}</NavLink>
    });
    return(
        <>
            <div className="h-full w-full flex flex-col gap-5 p-2">
                <h1 className='text-3xl font-bold text-gray-500'>HOME PAGE</h1>
                <nav className="w-full h-[5%] flex items-center gap-5">
                    { links }
                </nav>
                <Outlet/>
            </div>
        </> 
    );
    
}
    
export default Home;