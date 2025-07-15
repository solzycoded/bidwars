import PropTypes from "prop-types";

const LinkItem = ({ href, content }) => {
    return (
        <li className="nav-item">
            <a 
                className="nav-link"
                href={`#${href}`}>{content}</a>
        </li>
    )
}

LinkItem.propTypes = {
    href: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}

export default LinkItem;