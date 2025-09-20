const ItemSalePeriod = () => {
    return (
        <section className="sell-your-item-section" id="input-sale-period">
            <div className="container-fluid p-0">
                <div>
                    <label htmlFor="sale-period" className="mb-2 fw-bold fs-6">How fast would you like your item to be sold?</label>
                    <div className="input-group">
                        <p className="me-2">In</p>
                        <input type="number" className="form-control ps-2 p-0" name="sale_period" id="sale-period" placeholder="X" />
                        <p className="ms-2">days time?</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ItemSalePeriod;