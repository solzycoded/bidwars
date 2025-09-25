import { useState, useEffect } from "react";
import CategoryItem from "./Item.jsx";

const Category = () => {
    const [ categories, setCategories ] = useState(null);
    const [ selectedCategoryIndex, setSelectedCategoryIndex ] = useState(null);

    useEffect(() => {
        const displayCategories = (res) => {
            const listOfCategories = res;
            setCategories(listOfCategories);
        }

        const _categories = [
            {_id: "s882ialjd1123", name: "cars"},
            {_id: "s882ialjd5434", name: "shoes"},
            {_id: "s882ialjd9087", name: "art"},
        ];

        displayCategories(_categories);
        // new FetchRequest("GET", "api/categories").send(displayCategories, displayCategories);
    }, [setCategories]);

    return (
        <section className="sell-your-item-section active-section" id="select-category">
            <div className="container-fluid p-0">
                <div className="text-start mb-4">
                    <h5>Category</h5>
                        {
                            categories?.map((category, i) => (
                                <button
                                    type="button"
                                    className={`col-12 col-sm-12 col-md-4 mb-3 sell-an-item-category-item ${selectedCategoryIndex===i ? 'selected-category' : ""}`}
                                    key={category._id}
                                    onClick={() => setSelectedCategoryIndex(i)}
                                    aria-pressed={selectedCategoryIndex === i}
                                >
                                    <CategoryItem categoryName={category.name} />
                                    <input type="hidden" name="category_id" className="category_id" value={category._id} />
                                </button>
                            ))
                        }

                </div>
            </div>
        </section>
    );
}

export default Category;