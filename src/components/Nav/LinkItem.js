const LinkItem = ({ href, content }) => {
    return (
        <li className="nav-item">
            <a 
                className="nav-link"
                href={`#${href}`}>{content}</a>
        </li>
    )
}

export default LinkItem;