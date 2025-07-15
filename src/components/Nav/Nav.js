import { Link } from "react-router-dom";
import NavItem from "./NavItem.js";
import LinkItem from "./LinkItem.js";

const Nav = function() {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
           
            <div className="container-fluid">
                <Link active-class="active" className="navbar-brand fw-bolder" to="/">
                    <img src="/bidwars-logo-sm.png" alt="bidwars logo" className="img-fluid" id="app-logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <NavItem to="" content="Home" />
                        <NavItem to="sell-an-item" content="Sell an Item" />

                        <LinkItem href="categories" content="Categories" />
                        <LinkItem href="rooms" content="Rooms" />

                        <NavItem to="profile" content="Profile" />
                        <NavItem to="dashboard" content="Dashboard" />
                        <NavItem to="dashboard#set-auction" content="Schedule Auction" />
                        
                        <LinkItem href="set-auction" content="Schedule Auction" />

                        <NavItem to="dashboard#auction-list" content="Auction List" />

                        {/* this was repeated (I DON'T KNOW WHY YET!) */}
                        {/* <LinkItem href="/dashboard#auction-list" content="Auction List" /> */}

                        <NavItem to="profile/notifications" content="Notifications" />

                        <li className="nav-item">
                            <button className="nav-link btn bg-secondary text-white" onClick="logout">Log out</button>
                        </li>
                        <NavItem to="login" content="Login" />
                        <NavItem to="signup" content="Signup" className="btn bg-danger text-white" />

                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Nav;