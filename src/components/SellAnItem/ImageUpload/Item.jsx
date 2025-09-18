import PropTypes from "prop-types";

{/*
    const props = defineProps(['tag']);

    const id = "item-image-selector-" + props.tag; */}

const ImageUploadItem = ({ tag }) => {

    return (
        <div className="col-12 col-sm-12 col-md-4 mb-3">
            <div className="position-relative">
                <div>
                    <img src="/bidwars-logo-sm.png" alt="uploaded item image" className="img-fluid rounded item-image" />
                </div>
                <div className="rounded-bottom position-absolute start-0 end-0 bottom-0 bg-dark opacity-75">
                    <label className="btn bg-dark image-upload-label" for="`$id}`">

                        <input className="item-image-selector" id="`$id}`" name="image_selector" type="file" accept="image/jpeg, image/png, image/jpg" onchange="onImageSelected(this)" />

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
}

export default ImageUploadItem;