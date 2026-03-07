import { Outlet } from "react-router-dom";
import Nav from "../components/Nav/Nav.js";
import Alert from "../components/Alert/Alert.js";

const Layout = function() {
    return (
        <>
            <Nav />
            <Outlet />
            <Alert />
        </>
    )
}

export default Layout;