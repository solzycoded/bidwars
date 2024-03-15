<script setup>
    import { RouterLink } from "vue-router"
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <RouterLink active-class="active" class="navbar-brand fw-bolder" to="/">Bidwars</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <RouterLink active-class="active" class="nav-link active" aria-current="page" to="/">Home</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink active-class="active" class="nav-link" to="/sell-an-item">Sell an Item</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink active-class="active" class="nav-link" to="/profile">Profile</RouterLink>
                </li>
                </ul>

                <div>
                <div class="input-group w-100">
                    <div class="position-relative search-container">
                    <div class="input-group mb-1">
                        <div>
                        <select class="form-select rounded-start rounded-0 category-filter" id="category-filter" aria-label="Category Filter" onchange="includeFilter(this)">
                            <option selected disabled>Category</option>
                            <option value="antiques">Antiques</option>
                            <option value="vintage cars">Vintage Cars</option>
                            <option value="electronics">Electronics</option>
                            <option value="furniture">Furniture</option>
                            <option value="art">Art</option>
                        </select>
                        </div>
                        <input class="form-control rounded-0" type="search" placeholder="Find something" aria-label="Search" id="search-for-item" onclick="toggleSearchResultsDropdown()" onkeyup="filterSearchResults()" autocomplete="off">
                    </div>

                    <div class="position-absolute top-75 w-100 search-results-dropdown" id="search-results-dropdown">
                        <div class="mb-2 d-flex justify-content-start search-filter-items" style="overflow-x: auto;">
                        <button class="btn btn-dark rounded search-filter-item text-capitalize ms-1" onclick="hideFilter(this)">antiques</button>
                        <button class="btn btn-dark rounded search-filter-item text-capitalize ms-1" onclick="hideFilter(this)">art</button>
                        <button class="btn btn-dark rounded search-filter-item text-capitalize ms-1" onclick="hideFilter(this)">electronics</button>
                        <button class="btn btn-dark rounded search-filter-item text-capitalize ms-1" onclick="hideFilter(this)">furniture</button>
                        <button class="btn btn-dark rounded search-filter-item text-capitalize ms-1" onclick="hideFilter(this)">vintage cars</button>
                        </div>
                        <div class="list-group search-results-dropdown-section">
                        
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </nav>
</template>