import { Link } from "react-router-dom";

const NavItem = ({ to, content, className }) => {
    return (
        <li className="nav-item">
            <Link 
                active-class="active" 
                className={"nav-link" + (className || "")} 
                to={`/${to}`}>{content}</Link>
        </li>
    )
}

export default NavItem;