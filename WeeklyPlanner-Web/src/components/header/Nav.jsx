import { Context } from "../../GlobalContext.jsx";
import HeaderButton from "./HeaderButton.jsx";
import { useContext } from "react";

function Nav() {

    const { setIsPlannerOpen } = useContext(Context);

    return (
        <nav className="header-nav">
            <button className="nav-button" onClick={() => setIsPlannerOpen(true)}>Planner</button>
            <button className="nav-button" onClick={() => setIsPlannerOpen(false)}>Tasks</button>
            <HeaderButton />
        </nav>
    );
}

export default Nav;