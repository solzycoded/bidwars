import { useState } from "react";
import PropTypes from "prop-types";

const ItemName = ({ formData, setFormData }) => {
    // const [title, setTitle] = useState(null);
    const [error, setError] = useState(null);

    const validateTitle = (itemTitle) => {
        setFormData({ ...formData, title: itemTitle }); //set item title
        
        const success = (data) => {
            setError("");
            // toggleBtns("next", true); // this enables or disables the "next" button, based on the result of validating the title
        }

        const failure = (data) => {
            setError(data.message);
            // toggleBtns("next", false);
        }

        if(itemTitle){
            // new FetchRequest("GET", `api/items/check-title/${itemTitle}`).send(success, failure);
        }
        else{
            success(null);
        }
    }

    return (
        <section className="sell-your-item-section" id="input-item-name">
            <div className="container-fluid p-0">
                <div className="text-start mb-4">
                    <h5>Name of Item</h5>
                    <p className="m-0 text-secondary"><small>your item needs a descriptive name. Kindly give your item a descriptive name, e.g. A blue vintage 1982 Cortina.</small></p>
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        name="item_name" 
                        id="item-name" 
                        className="form-control" 
                        placeholder="Enter item name" 
                        value={formData.title}
                        onChange={(e) => validateTitle(e.target.value)} />
                    <small className="m-0 text-danger fw-bolder" id="item-title-error">{error}</small>
                    <p className="m-0 mt-2 fw-lighter"><small>Items that have been in this category have names like: X, Y, Z.</small></p>
                </div>
            </div>
        </section>
    );
}

ItemName.propTypes = {
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
}

export default ItemName;