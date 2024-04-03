let searchFilters = [];

// search and filter feature
const toggleSearchResultsDropdown = () => {
    getElementById("search-results-dropdown").classList.toggle("active");
}

const showSearchResultsDropdown = () => {
    getElementById("search-results-dropdown").classList.add("active");
}

const hideSearchResultsDropdown = () => {
    getElementById("search-results-dropdown").classList.remove("active");
}

const includeFilter = (target) => {
    // show search results dropdown
    getElementById("search-results-dropdown").classList.add("active");

    // disable the selected filter
    toggleSelectedFilter(target.value, true);

    displayFilter(target.value);
}

const displayFilter = (selectedFilter) => {
    let categoryFilters = getByClassNames("search-filter-item");

    for (let index = 0; index < categoryFilters.length; index++) {
        let filter = categoryFilters[index];

        if(filter.innerHTML==selectedFilter){
            searchFilters.push(filter.innerHTML);
            filter.classList.add("include");
        }
    }
}

function shuffleFilter(value) {
    return value.toLowerCase()!=this;
}

const hideFilter = (target) => {
    target.classList.remove("include");

    // enable the selected filter
    const filter = target.innerHTML.toLowerCase();

    toggleSelectedFilter(filter, false);
    searchFilters = searchFilters.filter(shuffleFilter, filter);
}

const toggleSelectedFilter = (targetValue, disable) => {
    let categoryFilterOptions = document.querySelectorAll("#category-filter option");

    categoryFilterOptions.forEach(opt => {
        if (opt.value.toLowerCase()==targetValue) {
            opt.disabled = disable;
        }
    });
}

const getFilters = () => {
    let dropdownItems = getByClassNames('search-filter-item include');
    let filterList = [];

    for (let index = 0; index < dropdownItems.length; index++) {
        const filter = dropdownItems[index];

        let filterText = filter.innerHTML;

        filterList[index] = filterText;
    }

    return filterList;
}