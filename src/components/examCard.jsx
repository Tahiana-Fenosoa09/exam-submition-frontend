import Photo from '../assets/algo.jfif'
function ExamCard({subject,topic,duration,dueDate,createdAt,description}) {
    return (
        <>
            <div className="w-[30vw] h-70 cols-span-1 bg-gray-400 p-2 flex flex-row rounded-2xl">
                <div className='w-[50%]  h-full flex flex-col  align-center'>
                    <img src={Photo} className='w-[80%] aspect-square rounded-full ' />
                    <h3 className='text-3xl font-bold '>{subject}</h3>
                    <p className='text-xl font-medium'>{topic}</p>
                </div>
                <div className='w-[70%]  h-full flex flex-col  content-between justify-around'>
                    <div className='w-[50%] p-2 h-auto shadow-sm rounded-2xl bg-white'>
                        <h3 className='font-bold'>Duration: {duration}</h3>
                    </div>
                    <div>
                    <h3>Due to: {dueDate}</h3>
                    <h3>Created at : {createdAt}</h3>
                    <h3>Description : {description}</h3>
                    </div>
                    <button className='w-[50%] h-10 font-bold rounded-xl bg-black text-white '>Edit</button>
                </div>
            </div>
        </>
    );

}

export default ExamCard;