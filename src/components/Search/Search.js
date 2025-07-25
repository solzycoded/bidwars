import { Link } from "react-router-dom";

const Search = () => {
    return (

        <div className="input-group w-100">
            <div className="position-relative search-container">
                <div className="input-group mb-1">
                    <div>
                        <select className="form-select rounded-start rounded-0 category-filter" id="category-filter" aria-label="Category Filter" onChange="includeAFilter">
                            <option selected disabled>Category</option>
                            <option value="antiques">Antiques</option>
                            <option value="vintage cars">Vintage Cars</option>
                            <option value="electronics">Electronics</option>
                            <option value="furniture">Furniture</option>
                            <option value="art">Art</option>
                        </select>
                    </div>
                    <input 
                        className="form-control rounded-0" 
                        type="search" 
                        placeholder="Find something" 
                        aria-label="Search" 
                        id="search-for-item" 
                        onClick="toggleSearchResultsDropdown()" autoComplete="off" onKeyUp="filterSearchResults" />
                </div>

                <div className="position-absolute top-75 w-100 search-results-dropdown" id="search-results-dropdown">
                    <div className="mb-2 d-flex justify-content-start search-filter-items" style={{"overflow-x": "auto"}}>
                        <button className="btn btn-dark rounded search-filter-item text-capitalize ms-1" onClick="hideThisFilter">antiques</button>
                        <button className="btn btn-dark rounded search-filter-item text-capitalize ms-1" onClick="hideThisFilter">art</button>
                        <button className="btn btn-dark rounded search-filter-item text-capitalize ms-1" onClick="hideThisFilter">electronics</button>
                        <button className="btn btn-dark rounded search-filter-item text-capitalize ms-1" onClick="hideThisFilter">furniture</button>
                        <button className="btn btn-dark rounded search-filter-item text-capitalize ms-1" onClick="hideThisFilter">vintage cars</button>
                    </div>
                    <div className="list-group search-results-dropdown-section">
                        {/* <Link v-for="item in searchResults" :key="item.id" :to="`/live-auction/items/live/${item.title}`" className="list-group-item list-group-item-action">{ item.title }</Link>
                        <a v-show="searchResults==0" className="list-group-item disabled">{{ searchResultsStatus }}</a> */}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Search;