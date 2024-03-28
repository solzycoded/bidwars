const createItem = () => {
    const proceed = confirmAction();

    if(proceed){
        const item = {
            title: getElementValue("#item-name"),
            category_id: getElementValue(".selected-category .category_id"),
            item_condition: getElementValue("#acquisition-post-condition"),
            price: getElementValue("#item-price"),
            selling_time: getElementValue("#sale-period"),
            purchase_duration: getElementValue("#purchase-duration"),
            time_frame_id: getElementValue("#acquisition-period"),
            item_pre_condition: getElementValue("#acquisition-condition"),
        }

        const userId = getElementValue("#user-id");
        new FetchRequest('POST', `api/items/create/${userId}`, item).send(createItemSuccess, createItemFailure);
    }
}

const createItemSuccess = (data) => {
    // upload images    
    const images = getItemImages();
    
    Image.upload(images, data.id);
}

const createItemFailure = (data) => {
    console.log(data);
}

const confirmAction = () => {
    return confirm("You won't be able to edit your item once you submit it! Do you want to proceed?");
}

const getElementValue = (selector) => {
    let categoryIdTag = document.querySelector(selector);

    return categoryIdTag===null ? "" : categoryIdTag.value;
}