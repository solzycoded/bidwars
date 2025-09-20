import ConditionOption from "./ConditionOption.jsx";

const SelectPreCondition = () => {
    return (
        <div className="mb-3">
            <div className="form-floating">
                <select className="form-select form-select-md" id="acquisition-condition" aria-label="select a condition">
                    <option selected disabled value="">select a condition</option>
                    <ConditionOption condition="pre"></ConditionOption>
                </select>
                <label htmlFor="acquisition-condition">In what condition was the item, when you bought it?</label>
            </div>
        </div>
    );
}

export default SelectPreCondition;