import HeaderButton from './HeaderButton.jsx';

function Nav() {
    return (
        <nav className="header-nav">
            <button className="nav-button">Planner</button>
            <button className="nav-button">Tasks</button>
            <HeaderButton />
        </nav>
    );
}

export default Nav;