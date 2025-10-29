import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const ImageUploadItem = ({ tag, formData, setFormData }) => {
    const [selectedImage, setSelectedImage] = useState("");

    const id = "item-image-selector-" + tag;

    useEffect(() => {
        const src = formData.images?.value?.[tag]?.src;
        if (src !== "" && src !== undefined) {
            setSelectedImage(src);
        }
    }, [setSelectedImage, formData, tag]);

    const onImageSelected = (target) => {
        // before you update the state "formData", 
        // 1. update the array images, by passing it to a separate variable
        // 2. create a function to check if any image has been uploaded and return true or false
        const updateFormData = (value, src, active) => {
            const altImages = Array.isArray(formData.images.value)
                ? [...formData.images.value]
                : [];
            altImages[tag]  = { file: value, src }; // tag represents the index/position of the image, which corresponds the position of a value in an array

            const imageHasBeenSelected = (images) => { // if any image has been selected by the user, return true
                return images.some((el) => !!(el && (el.file || el.src)));
            }

            setFormData({ 
                ...formData, 
                images: {
                    value: altImages,
                    active,
                },
                pause: imageHasBeenSelected(altImages), // if "false", the next button is active and vice versa
            });
        }

        try{
            // convert image to blob / base 64
            const file = target.files[0];

            if (file === undefined) {
                updateFormData("", "", false);
                return;
            }

            const reader = new FileReader();

            reader.onload = function(event) {
                const src = event.target.result;

                setSelectedImage(src);
                updateFormData(file, src, true);
            };

            reader.readAsDataURL(file);
        } catch (e) {
            alert("Something went wrong! Image not uploaded.");
            console.log("image upload error: ", e.message);
            updateFormData("", "", false);
        }
    }

    return (
        <div className="col-12 col-sm-12 col-md-4 mb-3">
            <div className="position-relative">
                <div>
                    <img 
                        src={selectedImage || "/bidwars-logo-sm.png"} 
                        alt="uploaded item" 
                        className="img-fluid rounded item-image"
                        data-testid="image-upload-native" />
                </div>
                <div className="rounded-bottom position-absolute start-0 end-0 bottom-0 bg-dark opacity-75">
                    <label className="btn bg-dark image-upload-label" htmlFor={id}>

                        <input 
                            className="item-image-selector" 
                            id={id} 
                            name="image_selector" 
                            type="file" 
                            accept="image/jpeg, image/png, image/jpg" 
                            onChange={(e) => onImageSelected(e.target)}
                            data-testid="image-upload-input" />

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
    tag: PropTypes.number.isRequired,
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
}

export default ImageUploadItem;