import DayCard from "./DayCard.jsx";
import { useRef } from "react";

function DayContainer() {

    //Function to generate dates for the 14 next days
    const generateDates = () => {
        let dates = [];
        let date = new Date();
        dates.push(new Date(date));

        for (let i = 0; i < 13; i++) {
            date.setDate(date.getDate() + 1);
            dates.push(new Date(date));
        }

        return dates;
    };

    const dates = useRef(generateDates());

    return (
        <section className="planner-section">
            {dates.current.map( (date, index) => <DayCard dateObject={date} key={index} /> )}
        </section>
    );
}

export default DayContainer;