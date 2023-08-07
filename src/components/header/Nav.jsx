import { Context } from "../../GlobalContext.jsx";
import HeaderButton from "./HeaderButton.jsx";
import { useContext, useState, useEffect } from "react";
import { ScheduleOutlined, UnorderedListOutlined } from "@ant-design/icons";

function Nav() {

    const { isPlannerOpen, setIsPlannerOpen, tasksLoading } = useContext(Context);
    const [isAnimating, setIsAnimating] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    //Hook to attach eventHandler during inital render
    useEffect(() => {
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    }, []);

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
            <button className={"nav-button" + (isPlannerOpen ? " nav-button-selected" : "")} onClick={() => handleClick(true)}>
                {windowWidth < 600 ? <ScheduleOutlined /> : "Planner"}
            </button>

            <button className={"nav-button" + (isPlannerOpen ? "" : " nav-button-selected")} onClick={() => handleClick(false)}>
                {windowWidth < 600 ? <UnorderedListOutlined /> : "Tasks"}
            </button>

            <HeaderButton showIcon={windowWidth < 600 ? true : false} />
        </nav>
    );
}

export default Nav;