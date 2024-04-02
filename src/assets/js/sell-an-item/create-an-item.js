
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
    if(uploadedImages.length > 0){
        ItemImage.upload(uploadedImages, data.id);
        document.querySelector("#profile-link").click();
        setError(false);
    }
    else{
        setError(true, "Kindly upload an image for your item");
    }
}

const createItemFailure = (data) => {
    setError(true, data.message);
}

const setError = (show, message = "") => {
    const errorTag = document.querySelector(".create-item-error");

    const classList = errorTag.classList;

    if(show){
        errorTag.innerHTML = message;
        classList.remove('d-none');
    }
    else{
        classList.add('d-none');
    }
}

const confirmAction = () => {
    return confirm("You won't be able to edit your item once you submit it! Do you want to proceed?");
}

const getElementValue = (selector) => {
    let categoryIdTag = document.querySelector(selector);

    return categoryIdTag===null ? "" : categoryIdTag.value;
}