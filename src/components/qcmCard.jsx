    
function QcmCard({question,answer}){
    return(
        <>
            <div className="w-full h-auto min-h-10 flex flex-col gap-5 border border-gray-300">
                <div className="w-full h-auto p-2 bg-gray-300 text-wrap">
                    <p className="text-xl font-medium">{question} </p>
                </div>
                <div className=" font-medium flex flex-col gap-3">
                    {answer}
                </div>
            </div>
        </> 
    );
    
}
    
export default QcmCard;