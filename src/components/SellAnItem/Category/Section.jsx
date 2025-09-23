import { useState, useEffect } from "react";
import CategoryItem from "./Item.jsx";

const Category = () => {
    const [ categories, setCategories ] = useState(null);

    const onCategorySelected = (category) => {
        // handle category selection here
        console.log("Selected category:", category);
    };

    useEffect(() => {
        const displayCategories = (res) => {
            const listOfCategories = res.categories;
            setCategories(listOfCategories);
        }

        const _categories = [
            {_id: "s882ialjd", name: "cars"},
            {_id: "s882ialjd", name: "shoes"},
            {_id: "s882ialjd", name: "art"},
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
                            categories && categories.map((category) => {
                                return (
                                    <div
                                        className="col-12 col-sm-12 col-md-4 mb-3 sell-an-item-category-item"
                                        key={category._id}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => onCategorySelected(category)}
                                        onKeyDown={e => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                onCategorySelected(category);
                                            }
                                        }}
                                    >
                                        <CategoryItem categoryName={category.name} />
                                        <input type="hidden" name="category_id" className="category_id" value={category._id} />
                                    </div>
                                );
                            })
                        }

                </div>
            </div>
        </section>
    );
}

export default Category;