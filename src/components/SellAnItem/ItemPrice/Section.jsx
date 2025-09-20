const ItemPrice = () => {
    return (
        <section className="sell-your-item-section" id="input-item-price">
            <div className="container-fluid p-0">
                <div className="text-start mb-4">
                    <h5>Price of Item</h5>
                </div>
                <div>
                    <div className="mb-3">
                        <label htmlFor="item-price" className="mb-2 fw-bold fs-6">What's your price?</label>
                        <input type="number" name="price" id="item-price" className="form-control" placeholder="Enter your price" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ItemPrice;