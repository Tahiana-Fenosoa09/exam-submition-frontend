    
function StudentCard({id,firstName,lastName,group,level,index}){
    return(
        <>
            <div className="w-full h-[10%] ">
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
        </> 
    );
    
}
    
export default StudentCard;