import React from 'react';
import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import Logo from './Logo.png';
import * as IoIcons from "react-icons/io";
import Popup from './Popup';
// import { logout } from '../Authentication/authenticationSlice';

function Navbar() {
    // const { isLoggedIn } = useSelector(state => state.authenticationSlice);
    // const dispatch = useDispatch();
   return (
    <>
        <IconContext.Provider value={{color:"black"}}>
            <div className='navbar'>
                <div className='logoNavBar'>
                    <img src={Logo} alt='title'/>
                </div>
                <button className='notifications' onClick={<Popup/>}>
                    <IoIcons.IoMdNotifications size={20}/>
                </button>
           </div>
        </IconContext.Provider>
        <IconContext.Provider value={{color: '#fff'}}>
            <nav className='nav-menu'>
                <ul className='nav-menu-items'>
                    {SidebarData.map((item, index) => {
                        if(item.title === 'Settings'){
                            return (
                                <>
                                    <li key={index} className={item.cName} style={{marginTop:'700px'}}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                        </li>
                                </>
                            );
                        } else {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                            <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        }
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
    </>
  )
}

export default Navbar
