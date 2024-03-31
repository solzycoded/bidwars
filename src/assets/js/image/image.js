class ItemImage {
    static async upload(images, itemId) {
        (new FetchRequest("POST", `api/item-images/create/${itemId}`, {image: images[0]}))
            .send(ItemImage.successResponse, ItemImage.failureResponse);
    }

    static successResponse(data){
        console.log(data);
    }

    static failureResponse(data){
        console.log(data);
    }
} 