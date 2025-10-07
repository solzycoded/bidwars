import PropTypes from "prop-types";

const ImageUploadItem = ({ tag, formData, setFormData }) => {
    const id = "item-image-selector-" + tag;

    // let uploadedImages = [];

    const onImageSelected = (target) => {
        // convert image to blob / base 64
        // convertImageToBlob(target);
    }

    // const convertImageToBlob = (target) => {
    //     const file = target.files[0];

    //     uploadedImages.push(file);

    //     if(file!==undefined){
    //         const reader = new FileReader();

    //         reader.onload = function(event) {
    //             const src = event.target.result;

    //             setBlobAsImageSrc(target, src);
    //         };

    //         reader.readAsDataURL(file);
    //     }
    // }
    
    // const setBlobAsImageSrc = (target, src) => {
    //     let index = getTagIndex("item-image-selector", target);

    //     // find and set image tag
    //     let targetImageTag = getByClassNames("item-image")[index];

    //     targetImageTag.src = src;
    //     targetImageTag.classList.add("has-image");
    // }

    // // get the blob values of uploaded images
    // const getItemImages = () => {
    //     let uploadImages = document.querySelectorAll(".has-image");
    //     let images = [];

    //     uploadImages.forEach((v) => {
    //         let src = v.src;

    //         images.push(src);
    //     });

    //     return images;
    // }

    return (
        <div className="col-12 col-sm-12 col-md-4 mb-3">
            <div className="position-relative">
                <div>
                    <img src="/bidwars-logo-sm.png" alt="uploaded item" className="img-fluid rounded item-image" />
                </div>
                <div className="rounded-bottom position-absolute start-0 end-0 bottom-0 bg-dark opacity-75">
                    <label className="btn bg-dark image-upload-label" htmlFor={id}>

                        <input className="item-image-selector" id={id} name="image_selector" type="file" accept="image/jpeg, image/png, image/jpg" onChange={(e) => onImageSelected(e.target)} />

                        <div className="text-white text-center fw-bold">
                            Choose From Library
                        </div>

                    </label>
                </div>
            </div>
        </div>
    );
}

ImageUploadItem.propTypes = {
    tag: PropTypes.string.isRequired,
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
}

export default ImageUploadItem;