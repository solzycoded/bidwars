import { useState } from "react";
import Category from "../components/SellAnItem/Category/Section.jsx";
import ItemName from "../components/SellAnItem/ItemName/Section.jsx";
import ImageUpload from "../components/SellAnItem/ImageUpload/Section.jsx";
import ItemCondition from "../components/SellAnItem/ItemCondition/Section.jsx";
import ItemPrice from "../components/SellAnItem/ItemPrice/Section.jsx";
import ItemSalePeriod from "../components/SellAnItem/ItemSalePeriod/Section.jsx";

import "../assets/css/sell-an-item.css";

const SellAnItem = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [formData, setFormData] = useState({ 
        category: { value: null, active: false },
        title: { value: "", active: false },
        images: { value: [], active: false},
        condition: { 
            value: {
                pre: "",
                post: "",
            }, 
            active: false
        },
        price: { value: "", active: false },
        salePeriod: { value: "", active: false },
        pause: true,
    });

    const sections = [
        <Category key="category" formData={formData} setFormData={setFormData} />,
        <ItemName key="itemName" formData={formData} setFormData={setFormData} />,
        1,
        2,3,4
    ];

        {/* 
            <ImageUpload key="imageUpload" formData={formData} setFormData={setFormData} />
        <ItemCondition />
        <ItemPrice />
        <ItemSalePeriod /> */}

    const handleFinish = () => {
        console.log(formData);
    }

    const handleSectionControl = (activeSection) => {
        switch (activeSection) {
            case 0:
                return formData.category.active;

            case 1:
                return formData.title.active;
        
            case 2:
                return formData.images.active;

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
                <p className="text-danger d-none create-item-error"></p>
            </div>

            { sections[activeSection] }

            <div className="mt-4">
                <input type="hidden" id="user-id" value="$userId}" />
                <div className="d-inline">
                    <button type="button" id="prev-section" className={`btn btn-dark ${activeSection > 0 ? '' : 'disabled'} fs-4`} onClick={() => handlePrev()}>Prev</button>
                </div>
                <div className={`d-inline float-end ${activeSection < 5 ? '' : 'd-none'}`} id="next-item-section">
                    {/* { !formData.pause + " - another thing!" } */}
                    <button type="button" id="next-section" className={`btn btn-dark ${(formData.pause || activeSection > 5) ? 'disabled' : ''} fs-4`} onClick={() => handleNext()}>Next</button>
                </div>
                <div className={`d-inline float-end ${activeSection === 5 ? '' : 'd-none'}`} id="submit-item-section">
                    <button type="submit" id="submit-item" className="btn btn-dark fs-4" onClick={() => handleFinish()}>Finish</button>
                </div>
            </div>
        </main>
    )
}

export default SellAnItem;