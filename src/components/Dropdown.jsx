const Dropdown = ({ submenus, dropdown }) => {
    return (
        <ul className={`dropdown ${dropdown ? "show" : ""}`}>
            {submenus.map((submenu, index) => (
                <li key={index} className="submenu-items">
                    <a href={submenu.link}>{submenu.title}</a>
                </li>
            ))}
        </ul>
    );
};

export default Dropdown;