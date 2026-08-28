import { Outlet } from "react-router";
import { useAuth } from "../context/authContext";

function Home() {

    const { user } = useAuth();

    return (
        <div className="h-full w-full flex flex-col gap-5 p-2">

            <div className="w-full flex items-center justify-between">

                <h1 className="text-3xl font-bold text-gray-500">
                    HOME PAGE
                </h1>

                <p className="font-bold">
                    Welcome, {user?.fullName}
                </p>

            </div>

            <Outlet />

        </div>
    );
}

export default Home;
