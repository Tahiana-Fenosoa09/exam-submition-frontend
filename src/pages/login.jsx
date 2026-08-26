
function Login() {
    return (
        <>
            <div className="w-full h-dvh flex justify-center items-center">
                <div className="w-[35%] h-[50%] flex flex-col justify-around align-middle shadow-2xl rounded-xl p-3 ">
                    <h1 className="text-5xl font-bold text-center">Login in</h1>
                    <div className="w-full h-50%">
                        <label>
                            <h3 className="text-2xl font-medium">user name</h3>
                            <p className=" font-light text-gray-600 ">please enter the user-name to access your account . If you don't know it , please go talk to admin</p>
                        </label>
                        <input type="text" placeholder="username..." className="w-[50%] p-2 outline-none border-0" />
                    </div>
                    <div className="w-full h-50%">
                        <label >
                            <h3 className="text-2xl font-medium">password</h3>
                            <p className="font-light text-gray-600">please enter the password to access your account . If you don't know it , please go talk to admin . After first login , you can always change it later </p>
                        </label>
                        <input type="password" placeholder="password..." />
                    </div>
                    <div className="w-full h-[8%] flex justify-center items-center">
                        <button className="bg-black text-white font-bold rounded-xl w-[20%] h-full">Login</button>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Login;