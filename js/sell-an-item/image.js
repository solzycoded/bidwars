const onImageSelected = (target) => {
    // convert image to blog / base 64
    convertImageToBlob(target);

    // get the index of the used input file
    

    // use the index to add file
}

const convertImageToBlob = (target) => {
    let file = target.files[0];

    if(file!==undefined){
        let reader = new FileReader();

        reader.onload = function(event) {
            // use this for the alert
            // image.title = file.name;

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
}