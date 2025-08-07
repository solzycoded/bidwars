import SearchFilterItem from "./SearchFilterItem.js";

const SearchFilter = () => {
    return (
        <div className="position-absolute top-75 w-100 search-results-dropdown" id="search-results-dropdown">
            <div className="mb-2 d-flex justify-content-start search-filter-items" style={{"overflowX": "auto"}}>
                <SearchFilterItem content="antiques" />
                <SearchFilterItem content="art" />
                <SearchFilterItem content="electronics" />
                <SearchFilterItem content="furniture" />
                <SearchFilterItem content="vintage cars" />
            </div>
            <div className="list-group search-results-dropdown-section">
                {/* <Link v-for="item in searchResults" :key="item.id" :to="`/live-auction/items/live/${item.title}`" className="list-group-item list-group-item-action">{ item.title }</Link>
                <a v-show="searchResults==0" className="list-group-item disabled">{{ searchResultsStatus }}</a> */}
            </div>
        </div>
    )
}

export default SearchFilter;