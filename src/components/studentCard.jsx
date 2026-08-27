    
import { NavLink, useNavigate } from "react-router";
import Profile from "../pages/profile";
import { useState } from "react";

function StudentCard({id,firstName,lastName,group,level,index,isAdmin,isOwner}){

    const [ data ,setData ] = useState(false);

    function showProfile(){
        setData(e => !e)
    }

    return(
        <>
            <div className="w-full h-[7%] " onClick={showProfile}>
                <ul className={ index % 2 == 0 ? "w-full h-full p-2 grid grid-cols-5 rounded-xl" : "w-full h-full p-2 grid grid-cols-5 bg-gray-400 rounded-xl"}>
                    <li>
                        <p className="font-medium">{id}</p>
                    </li>
                    <li>
                        <p className="font-medium">{firstName}</p>
                    </li>
                    <li>
                        <p className="font-medium">{lastName}</p>
                    </li>
                    <li>
                        <p className="font-medium">{group}</p>
                    </li>
                    <li>
                        <p className="font-medium">{level}</p>
                    </li>
                </ul>
            </div>

            {data ? <Profile profileType={'general'}firstName={firstName} id={id} group={group} level={level} isAdmin={isAdmin} isOwner={isOwner} /> : null }
           
        </> 
    );
    
}
    
export default StudentCard;