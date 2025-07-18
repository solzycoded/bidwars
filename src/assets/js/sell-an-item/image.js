let uploadedImages = [];

const onImageSelected = (target) => {
    // convert image to blob / base 64
    convertImageToBlob(target);
}

const convertImageToBlob = (target) => {
    let file = target.files[0];

    uploadedImages.push(file);

    if(file!==undefined){
        let reader = new FileReader();

        reader.onload = function(event) {
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