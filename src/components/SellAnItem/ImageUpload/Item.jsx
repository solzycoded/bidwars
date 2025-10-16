import PropTypes from "prop-types";
import { useState } from "react";

const ImageUploadItem = ({ tag, formData, setFormData }) => {
    const [selectedImage, setSelectedImage] = useState("");

    const id = "item-image-selector-" + tag;

    const onImageSelected = (target) => {
        const updateFormData = (value, active) => {
            const altImages = formData.images.value;
            altImages[tag] = value; // tag represents the index/position of the image, which corresponds the position of a value in an array

            const imageHasBeenSelected = (images) => {
                images.forEach(element => {
                    if(element!==""){
                        return true;
                    }
                });

                return false;
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

            updateFormData(file, true);

            if(file!==undefined){
                const reader = new FileReader();

                reader.onload = function(event) {
                    const src = event.target.result;

                    setSelectedImage(src);
                };

                reader.readAsDataURL(file);
            }
        } catch (e) {
            alert("Something went wrong! Image not uploaded.");
            console.log("image upload error: ", e.message);
            updateFormData("", false);
        }
    }

    return (
        <div className="col-12 col-sm-12 col-md-4 mb-3">
            <div className="position-relative">
                <div>
                    <img src={selectedImage!=="" ? selectedImage : "/bidwars-logo-sm.png"} alt="uploaded item" className="img-fluid rounded item-image" />
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
    tag: PropTypes.number.isRequired,
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
}

export default ImageUploadItem;