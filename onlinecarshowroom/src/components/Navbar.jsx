import { Link } from 'react-router-dom';
import profile from "../assets/mystery_avatar.png"
import {HomeIcon,CarIcon,ServicesIcon,AboutIcon,AccountIcon} from "../assets/icons"
import SidebarNavItem from './navbarItems';

export default function Navbar() {


return (
<>
  <div className='w-[300px] sidebar-background text-white relative'>
    <div className='text-center logo-container'>
      <span>ONLINE CAR</span>
      <span>SHOWROOM</span>
    </div>
  
    <nav>
      <div className='flex flex-col justify-between sidebar-navigation'>
        <SidebarNavItem icon={<HomeIcon />} text='Home' link='/' />
        <SidebarNavItem icon={<CarIcon />} text='Cars' link='/cars' />
        <SidebarNavItem icon={<ServicesIcon />} text='Services' link='/services' />
        <SidebarNavItem icon={<AboutIcon />} text='About' link='/about' />
        <SidebarNavItem icon={<AccountIcon />} text='Account' link='/account' />
      </div>
    </nav>
    <div className="sidebar-footer">
      <p>&copy; Copyright 2023</p>
      <p>Online Car Showroom</p>

    </div>
    

  </div>
</>
);
}