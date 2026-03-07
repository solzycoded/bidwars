import PropTypes from "prop-types";

const SearchFilterItem = ({ content }) => {
    return (
        <button className="btn btn-dark rounded search-filter-item text-capitalize ms-1" onClick="hideThisFilter">{ content }</button>
    );
}

SearchFilterItem.propTypes = {
    content: PropTypes.string.isRequired,
}

export default SearchFilterItem;