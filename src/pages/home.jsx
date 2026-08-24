import Exam from "./exams";
    
function Home(){
    return(
        <>
            <div className="h-full w-full flex flex-col gap-10">
                <h1 className='text-3xl font-bold'>HOME PAGE</h1>
                <div>
                    <Exam/>
                </div>
            </div>
        </> 
    );
    
}
    
export default Home;