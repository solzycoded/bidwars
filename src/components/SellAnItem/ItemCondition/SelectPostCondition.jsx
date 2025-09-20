import ConditionOption from "./ConditionOption.jsx";

const SelectPostCondition = () => {
    return (
        <div className="mb-3">
            <div className="form-floating">
                <select className="form-select form-select-md" id="acquisition-post-condition" aria-label="select a condition">
                    <option selected disabled value="">select a condition (e.g. looks new)</option>
                    <ConditionOption condition="post" />
                </select>
                <label htmlFor="acquisition-post-condition">In what condition would you say the item currently is?</label>
            </div>
        </div>
    )
}

export default SelectPostCondition;