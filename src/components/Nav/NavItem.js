import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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

NavItem.propTypes = {
    to: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default NavItem;