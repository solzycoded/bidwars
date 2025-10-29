import { useState, createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";

const FormDataContext = createContext();

const SellAnItemProvider = ({children}) => {
    const [formData, setFormData] = useState({ 
        category: { value: null, active: false },
        title: { value: "", active: false },
        images: { value: new Array(3), active: false},
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

    const value = useMemo(() => ({ formData, setFormData }), [formData]);

    return (
        <FormDataContext.Provider value={value}>
            {children}
        </FormDataContext.Provider>
    )
}

export const useFormDataContext = () => useContext(FormDataContext); // to aid components in destructing context provider's objects

// prop validation
SellAnItemProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default SellAnItemProvider;