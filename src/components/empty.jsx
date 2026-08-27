import  EmptyList  from "../assets/emptyList.png" 
function Empty(){
    return(
        <>
        <div className="w-full h-full flex  flex-col justify-center items-center gap-2">
            <img src={EmptyList}  className="w-50% aspect-square"/>
            <h1 className="text-4xl font-bold ">List is Empty</h1>
        </div>
        </> 
    );
    
}
    
export default Empty;