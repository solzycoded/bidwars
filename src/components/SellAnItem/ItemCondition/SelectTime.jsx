import { useState, useEffect, useRef } from "react";
import { fetchNoAuth } from "../../../assets/util/FetchRequest.js";
import { useFormDataContext } from "../../../ContextProviders/SellAnItemProvider.jsx";

const SelectTime = () => {
    const purchaseDuration = useRef(null); // to get the value of puchaseduration input
    const acquisitionPeriod = useRef(null); // to get the value of the selected timeframe
    const [timeFrames, setTimeFrames] = useState([]); // to get the list of timeframes from the database
    const { formData, setFormData } = useFormDataContext(); // capture the formData and setFormData states, declared via context API, in SellAnItemProvider

    const updateItemPurchaseTime = (purchaseDuration, acquisitionPeriod) => {
        const activateItemTime = purchaseDuration!=="" && acquisitionPeriod!=="N/A";

        setFormData({ 
            ...formData, 
            condition: { 
                value: {
                    ...formData.condition.value,
                    time: {
                        purchaseDuration,
                        acquisitionPeriod,
                    },
                }, 
                active: activateItemTime 
            },
            pause: !activateItemTime,
        });
    }

    useEffect(() => {
        const displayTimeFrames = async (res) => {
            // not sure what to do here
            // const { data } = await res.json();
            // setTimeFrames(data);

            setTimeFrames([
                {_id: "soamao9838", name: "hour(s)"},
                {_id: "soambo2838", name: "day(s)"},
                {_id: "soamco1138", name: "week(s)"},
                {_id: "soamdo8838", name: "month(s)"},
                {_id: "soameo2838", name: "year(s)"},
            ]);
        }

        displayTimeFrames(null);
        // fetchNoAuth("time-frames", {}, "GET", displayTimeFrames, displayTimeFrames);
    }, [setTimeFrames]);

    return (
        <div className="mb-3">
            <div>
                <label htmlFor="acquisition-period" className="mb-2">Kindly tell the potential bidders, how long ago you acquired this item</label>
                <div className="input-group">
                    <input 
                        className="form-control p-0 ps-2" 
                        id="purchase-duration" 
                        type="number" 
                        name="purchase_duration" 
                        placeholder="e.g. 5"
                        ref={purchaseDuration}
                        value={formData.condition.value.time.purchaseDuration}
                        onChange={(e) => updateItemPurchaseTime(e.target.value, acquisitionPeriod.current.value)} />
                    <select 
                        className="form-select form-select-md" 
                        aria-label="Select a time" 
                        id="acquisition-period"
                        ref={acquisitionPeriod}
                        onChange={(e) => updateItemPurchaseTime(purchaseDuration.current.value, e.target.value)} >
                        <option value="N/A">Select Aquisition Period</option>
                        {
                            timeFrames.map((timeFrame) => {
                                return (
                                    <option key={timeFrame._id} value={timeFrame._id}>{ timeFrame.name }</option>
                                )
                            })
                        }
                    </select>
                    <p className="ms-2">ago</p>
                </div>
            </div>
        </div>
    );
}

export default SelectTime;