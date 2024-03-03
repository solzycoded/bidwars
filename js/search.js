// search and filter feature
const toggleSearchResultsDropdown = () => {
    getElementById("search-results-dropdown").classList.toggle("active");
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
            filter.classList.add("include");
        }
    }
}

const hideFilter = (target) => {
    target.classList.remove("include");

    // enable the selected filter
    toggleSelectedFilter(target.innerHTML, false);
}

const toggleSelectedFilter = (targetValue, disable) => {
    let categoryFilterOptions = document.querySelectorAll("#category-filter option");

    categoryFilterOptions.forEach(opt => {
        if (opt.value.toLowerCase()==targetValue.toLowerCase()) {
            opt.disabled = disable;
        }
    });
}

const filterSearchResults = (target) => {
    let search = target.value;

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
    //   document.getElementById("txtHint").innerHTML = this.responseText;
        console.log(this.responseText);
    }

    xhttp.open("GET", "http://localhost:3000/search?search=" + search);
    xhttp.send();
}