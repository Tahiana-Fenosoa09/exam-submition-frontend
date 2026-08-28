import { Outlet } from "react-router";
import NavBar from "./navbar";

function Layout() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}

export default Layout;
