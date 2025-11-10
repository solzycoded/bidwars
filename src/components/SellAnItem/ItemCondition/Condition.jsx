import ConditionOption from "./ConditionOption.jsx";
import { useFormDataContext } from "../../../ContextProviders/SellAnItemProvider.jsx";
import PropTypes from "prop-types";

const SelectCondition = ({ conditionType }) => {
    const { formData, setFormData } = useFormDataContext(); // capture the formData and setFormData states, declared via context API, in SellAnItemProvider

    const updateItemCondition = (value) => {
        const activateItemCondition = value!=="";

        const updatedValue = conditionType==="pre" ? { ...formData.condition.value, pre: value } : { ...formData.condition.value, post: value };

        setFormData({ 
            ...formData, 
            condition: { 
                value: updatedValue,
                active: activateItemCondition
            },
            pause: !activateItemCondition,
        });
    }

    return (
        <div className="mb-3">
            <div className="form-floating">
                <select 
                    className="form-select form-select-md" 
                    id={`acquisition-${conditionType}-condition`} 
                    aria-label="select a condition"
                    onChange={(e) => updateItemCondition(e.target.value)}>
                    <option selected disabled value="">select a condition { conditionType==="pre" ? "" : "(e.g. looks new)" }</option>
                    <ConditionOption condition={conditionType}></ConditionOption>
                </select>
                <label htmlFor={`acquisition-${conditionType}-condition`}>{ conditionType==="pre" ? "In what condition was the item, when you bought it?" : "In what condition would you say the item currently is?" }</label>
            </div>
        </div>
    );
}

SelectCondition.propTypes = {
    conditionType: PropTypes.string.isRequired,
}

export default SelectCondition;