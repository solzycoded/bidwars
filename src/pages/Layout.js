import { Outlet } from "react-router-dom";
import Nav from "../components/Nav/Nav.js";

const Layout = function() {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    )
}

export default Layout;