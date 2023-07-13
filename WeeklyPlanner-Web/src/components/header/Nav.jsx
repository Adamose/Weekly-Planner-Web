import NavButton from './NavButton.jsx'
import HeaderButton from './HeaderButton.jsx';

function Nav() {
    return (
        <nav className="headerNav">
            <NavButton text="Planner"/>
            <NavButton text="Tasks"/>
            <HeaderButton />
        </nav>
    );
}

export default Nav