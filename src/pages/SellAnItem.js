import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/SellAnItem/Category/Section.jsx";
import ItemName from "../components/SellAnItem/ItemName/Section.jsx";
import ImageUpload from "../components/SellAnItem/ImageUpload/Section.jsx";
import ItemCondition from "../components/SellAnItem/ItemCondition/Section.jsx";
import ItemPrice from "../components/SellAnItem/ItemPrice/Section.jsx";
import ItemSalePeriod from "../components/SellAnItem/ItemSalePeriod/Section.jsx";

import "../assets/css/sell-an-item.css";
import { useFormDataContext } from "../ContextProviders/SellAnItemProvider.jsx";
import { getAuthData } from "../assets/util/Auth.js";
import { fetchWithAuth } from "../assets/util/FetchRequest.js";
import { useAuth } from "../ContextProviders/AuthProvider.jsx";

const SellAnItem = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [error, setError] = useState("");
    const { formData, setFormData } = useFormDataContext();

    const { loggedIn } = useAuth();
    const navigate = useNavigate();

    if(!loggedIn.yes){ // prevent the guest from accessing this page
        navigate("/login");

        return;
    }

    const sections = [
        <Category key="category" />,
        <ItemName key="itemName" />,
        <ImageUpload key="imageUpload" />,
        <ItemSalePeriod key="itemsaleperiod" />,
        <ItemPrice key="itemprice" />,
        <ItemCondition key="itemcondition" />
    ];

    const handleFinish = () => {
        const confirmed = window.confirm("You won't be able to edit your item once you submit it! Do you want to proceed?");
        if (!confirmed) return;

        // implement field validation (item condition is the only field section that'll need validation)
        const itemCondition = formData.condition.value;

        // if all fields have been provided and they are valid, enable finish button and vice versa
        if(itemCondition.pre!=="" && itemCondition.post!=="" && itemCondition.time.purchaseDuration!=="" && itemCondition.time.acquisitionPeriod!=="") {
            // submit
            const { username } = getAuthData();
            
            const data = {
                title: formData.title.value,
                category: formData.category.value,
                price: formData.price.value,
                salePeriod: formData.salePeriod.value,
                previousCondition: formData.condition.value.pre,
                currentCondition: formData.condition.value.post,
                purchaseDuration: formData.value.time.purchaseDuration,
                acquisitionPeriod: formData.value.time.acquisitionPeriod,
            };

            fetchWithAuth(`items/create/${username}`, data, "POST", () => {}, () => {})
            // new FetchRequest('POST', `api/items/create/${userId}`, item).send(createItemSuccess, createItemFailure);
            setError("");
            return;
        }

        setError("All fields must be filled, before clicking Finish!");
    }

    const handleSectionControl = (activeSection) => {
        switch (activeSection) {
            case 0:
                return formData.category.active;

            case 1:
                return formData.title.active;
        
            case 2:
                return formData.images.active;

            case 3:
                return formData.salePeriod.active;

            case 4:
                return formData.price.active;

            case 5:
                return formData.condition.active;

            default:
                return false;
        }
    }

    const handleNext = () => {
        const currentActiveSection = activeSection + 1;

        if(handleSectionControl(activeSection)){ // if the current section's field are all filled in, i.e. "active" is true
            sectionsCounterControl(currentActiveSection);
            if(!handleSectionControl(currentActiveSection)){ // change the value for "formData.pause" to true if the currrently, now active section's "active" value is true (i.e. valid)
                setFormData({ ...formData, pause: true });
            }
        }
    }

    const handlePrev = () => {
        sectionsCounterControl(activeSection - 1);
        setFormData({ ...formData, pause: false });
    }

    const sectionsCounterControl = (sectionIndex) => {
        // make sure the active section index doesn't go above 6 or below 1
        if(sectionIndex < 0) {
            sectionIndex = 0;
        }

        setActiveSection(sectionIndex === sections.length ? sections.length : sectionIndex);
    }

    return (
        <main id="main-section">
            <div className="mb-3">
                <h3 className="link-offset-3">Sell your Item (<span id="sell-an-item-position" className="sell-an-item-position fw-lighter" data-testid="section-counter">{activeSection + 1}</span>/6)</h3>
                <p className="text-danger create-item-error">{error}</p>
            </div>

            { sections[activeSection] }

            <div className="mt-4">
                <input type="hidden" id="user-id" value="$userId}" />
                <div className="d-inline">
                    <button type="button" id="prev-section" className={`btn btn-dark ${activeSection > 0 ? '' : 'disabled'} fs-4`} onClick={() => handlePrev()}>Prev</button>
                </div>
                <div className={`d-inline float-end ${activeSection < 5 ? '' : 'd-none'}`} id="next-item-section">
                    <button type="button" id="next-section" className={`btn btn-dark ${(formData.pause || activeSection > 5) ? 'disabled' : ''} fs-4`} onClick={() => handleNext()}>Next</button>
                </div>
                <div className={`d-inline float-end ${activeSection === 5 ? '' : 'd-none'}`} id="submit-item-section">
                    <button type="submit" id="submit-item" className={`btn btn-dark fs-4 ${formData.pause ? 'disabled' : ''}`} onClick={() => handleFinish()}>Finish</button>
                </div>
            </div>
        </main>
    )
}

export default SellAnItem;