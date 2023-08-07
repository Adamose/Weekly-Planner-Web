import { Context } from "../../GlobalContext.jsx";
import HeaderButton from "./HeaderButton.jsx";
import { useContext, useState } from "react";

function Nav() {

    const { isPlannerOpen, setIsPlannerOpen, tasksLoading } = useContext(Context);
    const [isAnimating, setIsAnimating] = useState(false);

    //Nav buttons click handler
    const handleClick = (boolean) => {
        if (!isAnimating && !tasksLoading) {
            setIsPlannerOpen(boolean);
            setIsAnimating(true);

            //Waiting for animation to be done before setting boolean to false
            setTimeout(() => {
                setIsAnimating(false);
            }, 1000);
        }
    };

    return (
        <nav className="header-nav">
            <button className={"nav-button" + (isPlannerOpen ? " nav-button-selected" : "")} onClick={() => handleClick(true)}>Planner</button>
            <button className={"nav-button" + (isPlannerOpen ? "" : " nav-button-selected")} onClick={() => handleClick(false)}>Tasks</button>
            <HeaderButton />
        </nav>
    );
}

export default Nav;