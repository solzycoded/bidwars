// import SelectTime  from './SelectTime.vue';
import SelectPreCondition from './SelectPreCondition.jsx';
import SelectPostCondition from './SelectPostCondition.jsx';

const ItemCondition = () => {
    return (

        <section className="sell-your-item-section" id="item-condition">
            <div className="container-fluid p-0">
                <div className="text-start mb-4">
                    <h5>Condition of Item</h5>
                </div>

                {/* <SelectTime></SelectTime> */}
                <SelectPreCondition />
                <SelectPostCondition />

            </div>
        </section>
    );
}

export default ItemCondition;