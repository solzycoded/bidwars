const ItemName = () => {

    return (
        <section className="sell-your-item-section" id="input-item-name">
            <div className="container-fluid p-0">
                <div className="text-start mb-4">
                    <h5>Name of Item</h5>
                    <p className="m-0 text-secondary"><small>your item needs a descriptive name. Kindly give your item a descriptive name, e.g. A blue vintage 1982 Cortina.</small></p>
                </div>
                <div>
                    <div className="form-group">
                        <input type="text" name="item_name" id="item-name" className="form-control" placeholder="Enter item name" onKeyUp="validateTitle(this)" />
                        <small className="m-0 text-danger fw-bolder" id="item-title-error"></small>
                        <p className="m-0 mt-2 fw-lighter"><small>Items that have been in this category have names like: X, Y, Z.</small></p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ItemName;