class ItemImage {
    static async upload(images, itemId) {
        const formData = new FormData();
        formData.append('image', images[0]);

        try {
            await fetch(`http://localhost:3000/api/item-images/create/${itemId}`, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(items => {
                uploadedImages = [];
            })
            .catch(err => {
                console.error(err);
            });
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
} 