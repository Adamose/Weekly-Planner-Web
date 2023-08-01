import { Context } from "../../../GlobalContext.jsx";
import DayCard from "./DayCard.jsx";
import { useState, useRef, useContext, useEffect } from "react";

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
    
    const { isPlannerOpen } = useContext(Context);                      //Tracks which nav button is selected
    const [isVisible, setIsVisible] = useState(isPlannerOpen);          //Used to track wether page is hidden, if so don't render content
    const dates = useRef(generateDates());                              //Ref used to not re-calculate dates
    const visibilityClass = isPlannerOpen ? "fade-in" : "fade-out";

    //Function called whenever the user changes which page they are on
    useEffect(() => {
        async function updateVisibility() {
            if (isPlannerOpen === false) {
                //Delay to allow content to fade-out before removing
                await new Promise(r => setTimeout(r, 700));
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        }
        updateVisibility();
    }, [isPlannerOpen]);

    return (
        <section className={"planner-section " + visibilityClass}>
            {isVisible && dates.current.map( (date, index) => <DayCard dateObject={date} key={index} /> )}
        </section>
    );
}

export default DayContainer;