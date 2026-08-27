    
function Input({title,assignedValue,inputType}){
    return(
        <>
            <div>
                    <label >
                        <h3 className="text-xl">{title}</h3>
                    </label>
                    <input
                        type={inputType}
                        placeholder={title}
                        value={assignedValue}
                    />
            </div>
        </> 
    );
}
    
export default Input;