import { useState, useEffect } from "react";
import { fetchNoAuth } from "../../../assets/util/FetchRequest.js";

const SelectTimeOption = () => {
    const [timeFrames, setTimeFrames] = useState([]); // to get the list of timeframes from the database
    
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
        <>
            {
                timeFrames.map((timeFrame) => {
                    return (
                        <option key={timeFrame._id} value={timeFrame._id}>{ timeFrame.name }</option>
                    )
                })
            }
        </>
    )
}

export default SelectTimeOption;