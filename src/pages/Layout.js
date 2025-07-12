import { Outlet } from "react-router-dom";
import Nav from "../components/Nav.js";

const Layout = function() {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    )
}

export default Layout;