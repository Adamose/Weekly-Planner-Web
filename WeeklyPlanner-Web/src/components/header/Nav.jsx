import HeaderButton from './HeaderButton.jsx';

function Nav() {
    return (
        <nav className="headerNav">
            <button className="navButton">Planner</button>
            <button className="navButton">Tasks</button>
            <HeaderButton />
        </nav>
    );
}

export default Nav;