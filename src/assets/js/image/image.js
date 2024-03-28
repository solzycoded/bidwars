class Image {
    static async upload(images, itemId) {
        const formData = new FormData();

        // images.forEach((file, i) => {
            formData.append(`image`, images);
        // });
    
        try {
            const response = await fetch(`http://localhost:3000/api/item-images/create/${itemId}`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log(data);
            // Handle the server response as needed
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
}