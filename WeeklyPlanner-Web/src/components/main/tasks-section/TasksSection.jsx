import { Context } from "../../../GlobalContext.jsx";
import FutureTasksCard from "./FutureTasksCard.jsx";
import OverdueTasksCard from "./OverdueTasksCard.jsx";
import { useState, useContext, useEffect } from "react";

function TasksSection() {

    const { isPlannerOpen } = useContext(Context);                      //Tracks which nav button is selected
    const [isVisible, setIsVisible] = useState(isPlannerOpen);          //Used to track wether page is hidden, if so don't render content
    const visibilityClass = isPlannerOpen ? "fade-out" : "fade-in";

    //Function called whenever the user changes which page they are on
    useEffect(() => {
        async function updateVisibility() {
            if (isPlannerOpen === true) {
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
        <section className={"tasks-section " + visibilityClass}>
            {isVisible &&
                <>
                    <OverdueTasksCard />
                    <FutureTasksCard />
                </>
            }
        </section>
    );
}

export default TasksSection;