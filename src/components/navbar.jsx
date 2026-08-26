import { Routes , Route , NavLink} from "react-router";
import Profile from "../pages/profile";
import Home from "../pages/home";
import Exam from "../pages/exams";
import Student from "../pages/students";
import Subject from "../pages/subjects";


function NavBar(){
       const routes = [
        {
            to: "/profile",
            pathName: "Profile"
        },
        {
            to: "/home",
            pathName: "Home"
        }
    ];

    const routeChild = [
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
        return <NavLink to={e.to} className={({isActive}) => isActive ? "text-2xl border-b-2" : "text-2xl "}>{e.pathName}</NavLink>
    });

  
    const contentCHild = routeChild.map((e) => {
        return <Route path={e.to} element={e.element}/>
    });

    return(
        <>
            <nav className="h-[10vh] w-full bg-gray-400 flex place-content-between p-3" >  
                <div className="flex gap-2">
                    <div className="font-bold text-2xl ">Exam-submission</div>
                </div>
                <div className="flex gap-5">
                    { links }
                </div>
                <div className="gap-2 flex">
                    <div className="h-[5vh] aspect-square rounded-3xl bg-white"></div>
                    <div className="font-bold text-2xl">Name</div>
                </div>
            </nav>
            <Routes>
                <Route path="/home" element={<Home/>}>
                    {contentCHild}
                </Route>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </> 
    );
    
}
    
export default NavBar;