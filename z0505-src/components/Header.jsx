import './Header.css';

const Header = ({ appName, children }) => (
    <header className="header">
        <h1>{appName}</h1>
        {children}
    </header>
);

export default Header;