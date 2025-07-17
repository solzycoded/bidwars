<script setup>
import { RouterLink } from "vue-router";
</script>

<template>

    <div class="input-group w-100">
        <div class="position-relative search-container">
            <div class="input-group mb-1">
                <div>
                    <select class="form-select rounded-start rounded-0 category-filter" id="category-filter" aria-label="Category Filter" @change="includeAFilter">
                        <option selected disabled>Category</option>
                        <option value="antiques">Antiques</option>
                        <option value="vintage cars">Vintage Cars</option>
                        <option value="electronics">Electronics</option>
                        <option value="furniture">Furniture</option>
                        <option value="art">Art</option>
                    </select>
                </div>
                <input class="form-control rounded-0" type="search" placeholder="Find something" aria-label="Search" id="search-for-item" onclick="toggleSearchResultsDropdown()" autocomplete="off" @keyup="filterSearchResults">
            </div>

            <div class="position-absolute top-75 w-100 search-results-dropdown" id="search-results-dropdown">
                <div class="mb-2 d-flex justify-content-start search-filter-items" style="overflow-x: auto;">
                    <button class="btn btn-dark rounded search-filter-item text-capitalize ms-1" @click="hideThisFilter">antiques</button>
                    <button class="btn btn-dark rounded search-filter-item text-capitalize ms-1" @click="hideThisFilter">art</button>
                    <button class="btn btn-dark rounded search-filter-item text-capitalize ms-1" @click="hideThisFilter">electronics</button>
                    <button class="btn btn-dark rounded search-filter-item text-capitalize ms-1" @click="hideThisFilter">furniture</button>
                    <button class="btn btn-dark rounded search-filter-item text-capitalize ms-1" @click="hideThisFilter">vintage cars</button>
                </div>
                <div class="list-group search-results-dropdown-section">
                    <RouterLink v-for="item in searchResults" :key="item.id" :to="`/live-auction/items/live/${item.title}`" class="list-group-item list-group-item-action">{{ item.title }}</RouterLink>
                    <a v-show="searchResults==0" class="list-group-item disabled">{{ searchResultsStatus }}</a>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
    export default {
        data() {
            return {
                searchResults: [],
                search: "",
                searchResultsStatus: null,
            }
        },
        methods: {
            hideThisFilter(e){
                hideFilter(e.target);
                this.shuffleSearchResults();
            },
            includeAFilter(e){
                includeFilter(e.target);
                this.shuffleSearchResults();
            },
            filterSearchResults(e){
                this.search = e.target.value;
                this.shuffleSearchResults();
            },
            shuffleSearchResults(){
                const data = {search: this.search, categories: searchFilters};

                new FetchRequest("POST", "api/items/search", data).send(this.displaySearchResults, this.displaySearchResults);

                showSearchResultsDropdown();
            },
            displaySearchResults(items){
                if(Array.isArray(items) && items.length > 0){
                    this.searchResults = items;
                }
                else{
                    this.searchResults = [];
                    this.searchResultsStatus = items;
                }
            }
        },
        mounted() {
            // reset the search filters
            searchFilters = [];
        },
    };
</script>