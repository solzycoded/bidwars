import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { fetchNoAuth } from "../../../assets/util/FetchRequest.js";

const ConditionOption = ({ condition }) => {
    const [itemConditions, setItemConditions] = useState([]);

    useEffect(() => {
        const displayItemConditions = async (res) => {
            // not sure what to do here
            // const { data } = await res.json();
            // setItemConditions(data);

            setItemConditions([
                {_id: "soambo2838", name: "brand new"},
                {_id: "soamao9838", name: "fairly used"},
                {_id: "soamio5838", name: "properly used"},
                {_id: "soamco1138", name: "looks like new"},
                {_id: "soamdo8838", name: "vintage (old)"}
            ]);
        }

        displayItemConditions(null);
        // fetchNoAuth("item-conditions/${condition}", {}, "GET", displayItemConditions, displayItemConditions);
    }, [setItemConditions]);

    return (
        <>
            {
                itemConditions.map(itemCondition => {
                    return (
                        <option key={itemCondition._id} value={itemCondition._id}>{itemCondition.name}</option>
                    )
                })
            }
        </>
    );
}

ConditionOption.propTypes = {
    condition: PropTypes.string.isRequired,
}

export default ConditionOption;