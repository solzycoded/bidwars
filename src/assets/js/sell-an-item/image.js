const onImageSelected = (target) => {
    // convert image to blog / base 64
    convertImageToBlob(target);
}

const convertImageToBlob = (target) => {
    let file = target.files[0];

    if(file!==undefined){
        let reader = new FileReader();

        reader.onload = function(event) {
            // use this for the alert
            // image.title = file.name;
          
            const img = new Image();
            img.onload = function() {
              console.log('here');
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const maxWidth = 800; // Set your desired maximum width
                const maxHeight = 600; // Set your desired maximum height
                let width = img.width;
                let height = img.height;
                
                if (width > maxWidth || height > maxHeight) {
                    const aspectRatio = width / height;
                    if (width > maxWidth) {
                        width = maxWidth;
                        height = width / aspectRatio;
                    }
                    if (height > maxHeight) {
                        height = maxHeight;
                        width = height * aspectRatio;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                
                // Convert canvas content back to a Blob
                canvas.toBlob(function(blob) {
                    // Now 'blob' contains the resized image data
                    // You can now upload this blob to the server
                    // uploadBlob(blob);
                    console.log(blog);
                }, 'image/jpeg', 0.7); // Adjust quality as needed
            };
          
          let src = event.target.result;

          setBlobAsImageSrc(target, src);
        };

        reader.readAsDataURL(file);
    }
}

const setBlobAsImageSrc = (target, src) => {
    let index = getTagIndex("item-image-selector", target);

    // find and set image tag
    let targetImageTag = getByClassNames("item-image")[index];

    targetImageTag.src = src;
    targetImageTag.classList.add("has-image");
}

// get the blob values of uploaded images
const getItemImages = () => {
    let uploadImages = document.querySelectorAll(".has-image");
    let images = [];

    uploadImages.forEach((v) => {
        let src = v.src;

        images.push(src);
    });

    return images;
}