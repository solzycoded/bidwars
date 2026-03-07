import SearchFilter from "./SearchFilter.js";

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

                <SearchFilter />
            </div>
        </div>

    )
}

export default Search;