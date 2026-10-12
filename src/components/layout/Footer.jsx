import './Footer.css';

const Footer = ({ text, children }) => (
    <footer className="footer">
        { children }
        <p>© {text}. All rights reserved.</p>
    </footer>
);

export default Footer;