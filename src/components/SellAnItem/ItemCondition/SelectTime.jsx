const SelectTime = () => {
    // const timeFrames = ref([]);

    // onBeforeMount(() => {
    //     const displayTimeFrames = (listOfTimeFrames) => {
    //         timeFrames.value = listOfTimeFrames;
    //     }

    //     new FetchRequest("GET", "api/time-frames").send(displayTimeFrames, displayTimeFrames);
    // });

    return (
        <div className="mb-3">
            <div>
                <label htmlFor="acquisition-period" className="mb-2">Kindly tell the potential bidders, how long ago you acquired this item</label>
                <div className="input-group">
                    <input className="form-control p-0 ps-2" id="purchase-duration" type="number" name="purchase_duration" placeholder="e.g. 5" />
                    <select className="form-select form-select-md" aria-label="Select a time" id="acquisition-period">
                        <option v-for="timeFrame in timeFrames" key="timeFrame.id" value="timeFrame.id">something(s)</option>
                    </select>
                    {/* {{ timeFrame.name }} */}
                    <p className="ms-2">ago</p>
                </div>
            </div>
        </div>
    );
}

export default SelectTime;