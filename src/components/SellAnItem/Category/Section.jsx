import { useState, useEffect } from "react";
import CategoryItem from "./Item.jsx";
import { useFormDataContext } from "../../../ContextProviders/SellAnItemProvider.jsx";

const Category = () => {
    const [ categories, setCategories ] = useState(null);
    const [ selectedCategoryIndex, setSelectedCategoryIndex ] = useState(null);
    const { formData, setFormData } = useFormDataContext();

    useEffect(() => {
        const displayCategories = (res) => {
            const listOfCategories = res;

            displayChosenCategoryIndex(listOfCategories); // set the catgory index based on the users selection
            setCategories(listOfCategories); // get the list of categories to be displayed to the user
        }

        const displayChosenCategoryIndex = (categories) => {
            const chosenCategoryId = formData.category.value; // the selected category by the user
            if(!chosenCategoryId) {
                return;
            }

            for (const [i, category] of categories.entries()) {
                if (chosenCategoryId === category._id) {
                    setSelectedCategoryIndex(i);
                    break;
                }
            }
        }

        const _categories = [
            {_id: "s882ialjd1123", name: "cars"},
            {_id: "s882ialjd5434", name: "shoes"},
            {_id: "s882ialjd9087", name: "art"},
        ];

        displayCategories(_categories);
        // new FetchRequest("GET", "api/categories").send(displayCategories, displayCategories);
    }, [setCategories, setSelectedCategoryIndex, formData]);

    const setSelectedCategory = (i, categoryId) => {
        setSelectedCategoryIndex(i); // set selected category index
        // set the value for category

        setFormData({ 
            ...formData, 
            category: {
                value: categoryId,
                active: true,
            },
            pause: false,
        });
    }

    return (
        <section className="sell-your-item-section active-section" id="select-category">
            <div className="container-fluid p-0">
                <div className="text-start mb-4">
                    <h5>Select a Category</h5>
                        {
                            categories?.map((category, i) => (
                                <button
                                    type="button"
                                    className={`col-12 col-sm-12 col-md-4 mb-3 sell-an-item-category-item ${selectedCategoryIndex===i ? 'selected-category' : ""}`}
                                    key={category._id}
                                    data-testid={`category-option-${i}`}
                                    onClick={() => setSelectedCategory(i, category._id)}
                                    aria-pressed={selectedCategoryIndex === i}
                                >
                                    <CategoryItem categoryName={category.name} />
                                </button>
                            ))
                        }

                </div>
            </div>
        </section>
    );
}

// Category.propTypes = {
//     formData: PropTypes.object.isRequired,
//     setFormData: PropTypes.func.isRequired,
// }

export default Category;