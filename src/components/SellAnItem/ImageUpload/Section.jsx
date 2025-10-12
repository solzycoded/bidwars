import ImageUploadItem from "./Item.jsx";
import PropTypes from "prop-types";

const ImageUpload = ({ formData, setFormData }) => {
    return (
        <section className="sell-your-item-section" id="image-upload">
            <div className="container-fluid p-0">
                <div className="text-start mb-4">
                    <h5>Image of Item 
                        {/* <!-- (<span className="fw-lighter">0</span>/3) --> */}
                    </h5>
                    <p className="m-0 text-secondary"><small>It’s important that your item has an appropraite visual representation. Kindly provide <b className="text-dark">1</b> of the most recent image(s) of your item.</small></p>
                </div>
                <div className="row">
                    <ImageUploadItem tag="one" formData={formData} setFormData={setFormData}></ImageUploadItem>
                    <ImageUploadItem tag="two" formData={formData} setFormData={setFormData}></ImageUploadItem>
                    <ImageUploadItem tag="three" formData={formData} setFormData={setFormData}></ImageUploadItem>
                </div>
            </div>
        </section>
    );
}

ImageUpload.propTypes = {
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
}

export default ImageUpload;