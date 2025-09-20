import PropTypes from "prop-types";

const ConditionOption = ({ condition }) => {
    // const itemConditions = ref([]);

    // onBeforeMount(() => {
    //     const displayItemConditions = (listOfItemConditions) => {
    //         itemConditions.value = listOfItemConditions;
    //     }

    //     new FetchRequest("GET", `api/item-conditions/${props.condition}`).send(displayItemConditions, displayItemConditions);
    // });

    return (
        <option v-for="condition in itemConditions" key="condition.id" value="condition.id">condition</option>
        // {{ condition.item_condition }}
    )
}

ConditionOption.propTypes = {
    condition: PropTypes.object.isRequired,
}

export default ConditionOption;