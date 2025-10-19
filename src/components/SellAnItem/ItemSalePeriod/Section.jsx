import PropTypes from "prop-types";

const ItemSalePeriod = ({ formData, setFormData }) => {
    const updateItemSalePeriod = (value) => {
        const activateSalePeriod = value!==""; // set the salePeriod to "true", if value is empty else set it to "false"

        // update the value of the "salePeriod" key in formData object
        setFormData({ 
            ...formData, 
            salePeriod: { value, active: activateSalePeriod },
            pause: !activateSalePeriod,
        });
    }

    return (
        <section className="sell-your-item-section" id="input-sale-period">
            <div className="container-fluid p-0">
                <div>
                    <label htmlFor="sale-period" className="mb-2 fw-bold fs-6">How fast would you like your item to be sold?</label>
                    <div className="input-group">
                        <p className="me-2">In</p>
                        <input 
                            type="number" 
                            className="form-control ps-2 p-0" 
                            name="sale_period" 
                            id="sale-period" 
                            placeholder="X"
                            min="1"
                            value={formData.salePeriod.value}
                            onChange={(e) => updateItemSalePeriod(e.target.value)} />
                        <p className="ms-2">day(s) time?</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

ItemSalePeriod.propTypes = {
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
}

export default ItemSalePeriod;