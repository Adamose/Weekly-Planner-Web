import Nav from './Nav.jsx';
import HeaderTitle from './HeaderTitle.jsx';

function Header() {
    return (
        <header>
            <div className="headerContainer">
                <HeaderTitle />
                <Nav />
            </div>
        </header>
    );
}

export default Header;