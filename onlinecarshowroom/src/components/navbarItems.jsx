import { Link } from "react-router-dom";

export default function SidebarNavItem({icon, text, link}){
    return(
        <>
        <Link to={link}>
        <div className="nav-item-container">
          <div className="nav-item-icon">
            {icon}
          </div>
          <span className='nav-item-text'>{text}</span>
        </div>
        </Link>
        </>
    );
}
