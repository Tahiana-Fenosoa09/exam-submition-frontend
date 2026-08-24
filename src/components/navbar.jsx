
function NavBar(){
    return(
        <>
            <nav className="h-[10vh] w-full bg-[#05174A] flex place-content-between p-3" >  
                <div className="flex gap-2">
                    <div className="font-bold text-2xl ">Exam-submission</div>
                    <div className="h-[5vh] aspect-square rounded-3xl bg-white"></div>
                </div>
                <div className="gap-2 flex">
                    <div className="font-bold text-2xl">Name</div>
                     
                </div>
            </nav>
        </> 
    );
    
}
    
export default NavBar;