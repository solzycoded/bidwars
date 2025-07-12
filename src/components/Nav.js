import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Nav = function() {
    const [ count, setCount ] = useState(0);
    const [ notcount, setNotCount ] = useState(0);

    // useEffect(function, dependencies);
    useEffect(() => {
        let timer = setTimeout(() => {
            setCount(c => c + 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg bg-light">

        {count}
            <div className="container-fluid">
                <Link active-class="active" className="navbar-brand fw-bolder" to="/">
                    <img src="/imgs/bidwars-logo-sm.png" alt="bidwars logo" className="img-fluid" id="app-logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link active-class="active" className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item" v-show="!isAdmin">
                            <Link active-class="active" className="nav-link" to="/sell-an-item">Sell an Item</Link>
                        </li>
                        <li className="nav-item" v-show="onHome">
                            <a className="nav-link" href="#categories">Categories</a>
                        </li>
                        <li className="nav-item" v-show="onHome">
                            <a className="nav-link" href="#rooms">Rooms</a>
                        </li>
                        <li className="nav-item" v-show="userHasLoggedIn && !isAdmin && !onDashboard">
                            <Link active-class="active" className="nav-link" to="/profile" id="profile-link">Profile</Link>
                        </li>
                        <li className="nav-item" v-show="userHasLoggedIn && isAdmin">
                            <Link active-class="active" className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>

                        <li className="nav-item" v-show="userHasLoggedIn && isAdmin && !onDashboard">
                            <Link className="nav-link" to="/dashboard#set-auction">Schedule Auction</Link>
                        </li>
                        <li className="nav-item" v-show="userHasLoggedIn && isAdmin && onDashboard">
                            <a className="nav-link" href="#set-auction">Schedule Auction</a>
                        </li>
                        <li className="nav-item" v-show="userHasLoggedIn && isAdmin && !onDashboard">
                            <Link className="nav-link" to="/dashboard#auction-list">Auction List</Link>
                        </li>
                        <li className="nav-item" v-show="userHasLoggedIn && isAdmin && onDashboard">
                            <a className="nav-link" href="/dashboard#auction-list">Auction List</a>
                        </li>

                        <li className="nav-item" v-if="userHasLoggedIn && !isAdmin">
                            <Link active-class="active" className="nav-link" to="/profile/notifications">Notifications</Link>
                        </li>
                        <li className="nav-item" v-show="userHasLoggedIn">
                            <button className="nav-link btn bg-secondary text-white" onClick="logout">Log out</button>
                        </li>
                        <li className="nav-item" v-show="!userHasLoggedIn">
                            <Link active-class="active" className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item" v-show="!userHasLoggedIn">
                            <Link active-class="active" className="nav-link btn bg-danger text-white" to="/signup">Sign up</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Nav;