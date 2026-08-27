    
function Success({operation}){
    return(
        <>
            <div className="w-80 h-20 flex flex-col items-center justify-around bg-green-400 text-white absolute top-0 left-2/5">
                <h1 className="text-xl">Success</h1>
                <p>{operation} successfully achieved</p>
            </div>
        </> 
    );
    
}
    
export default Success;