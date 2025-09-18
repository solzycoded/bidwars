import CategoryItem from "./Item.jsx";
// import { ref, onBeforeMount } from 'vue';

// const categories = ref(null);

// onBeforeMount(() => {
//     const displayCategories = (listOfCategories) => {
//         categories.value = listOfCategories;
//     }

//     new FetchRequest("GET", "api/categories").send(displayCategories, displayCategories);
// });

const Category = () => {

    return (
        <section className="sell-your-item-section active-section" id="select-category">
            <div className="container-fluid p-0">
                <div className="text-start mb-4">
                    <h5>Category</h5>
                    <p className="m-0 text-secondary"><small>select a category that your item would belong to</small></p>
                </div>
                <div className="row">

                    <div className="col-12 col-sm-12 col-md-4 mb-3 sell-an-item-category-item" v-for="category in categories" key="category.id" onClick="onCategorySelected(this)">
                        <CategoryItem categoryName={"something"} />
                        <input type="hidden" name="category_id" className="category_id" value="$category.id}" />
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Category;