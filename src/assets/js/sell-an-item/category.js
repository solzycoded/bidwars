const onCategorySelected = (target, category) => {
    // remove "selected-category" class from all elements that match "sell-an-item-category-item"
    performActionOnClassNames("sell-an-item-category-item", removeSelectedCategoryFromTarget);

    // add "selected-category" to the target
    target.classList.add("selected-category");

    const selectedCategory = document.getElementById('selected-category');
    selectedCategory.value = category;
}

const removeSelectedCategoryFromTarget = (target) => {
    target.classList.remove("selected-category");
}