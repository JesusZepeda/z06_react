import "./Sidebar.css";

const Sidebar = ({ children }) => (
    <aside className="side-content">
        {children}
    </aside>
);

export default Sidebar;