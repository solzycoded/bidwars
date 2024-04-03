// search and filter feature
const toggleSearchResultsDropdown = () => {
    getElementById("search-results-dropdown").classList.toggle("active");
}

const showSearchResultsDropdown = () => {
    getElementById("search-results-dropdown").classList.add("active");
}

const includeFilter = (target) => {
    // show search results dropdown
    getElementById("search-results-dropdown").classList.add("active");

    // disable the selected filter
    toggleSelectedFilter(target.value, true);

    displayFilter(target.value);

    filterSearchResults();
}

const displayFilter = (selectedFilter) => {
    let categoryFilters = getByClassNames("search-filter-item");

    for (let index = 0; index < categoryFilters.length; index++) {
        let filter = categoryFilters[index];

        if(filter.innerHTML==selectedFilter){
            filter.classList.add("include");
        }
    }
}

const hideFilter = (target) => {
    target.classList.remove("include");

    // enable the selected filter
    toggleSelectedFilter(target.innerHTML, false);

    filterSearchResults();
}

const toggleSelectedFilter = (targetValue, disable) => {
    let categoryFilterOptions = document.querySelectorAll("#category-filter option");

    categoryFilterOptions.forEach(opt => {
        if (opt.value.toLowerCase()==targetValue.toLowerCase()) {
            opt.disabled = disable;
        }
    });
}

const filterSearchResults = () => {
    let search = getElementById("search-for-item").value;

    const data = {search, categories: getFilters()};

    new FetchRequest("POST", "api/items/search", data).send(searchResults, searchResults);

    showSearchResultsDropdown();
}

const searchResults = (items) => {
    let dropdown       = getByClassNames('search-results-dropdown-section')[0];
    dropdown.innerHTML = '';

    if(Array.isArray(items) && items.length > 0){
        for (const item of items) {
            dropdown.innerHTML += `<RouterLink to="/live-auction/items/live/${item.title}" class="list-group-item list-group-item-action">${item.title}</RouterLink>`;
        }
    }
    else{
        dropdown.innerHTML += `<a class="list-group-item disabled">${items}</a>`;
    }
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