import DayCard from "./DayCard.jsx";
import { useState } from "react";

function DayContainer() {

    //Function to generate date strings for the 14 next days
    const generateDates = () => {
        let dates = [];
        let date = new Date();
        dates.push(`${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`);

        for (let i = 0; i < 13; i++) {
            date.setDate(date.getDate() + 1);
            dates.push(`${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`);
        }

        return dates;
    };

    const [dates] = useState(generateDates());

    return (
        <>
            {dates.map( (date, index) => <DayCard date={date} key={index} /> )}
        </>
    );
}

export default DayContainer;