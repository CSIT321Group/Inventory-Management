import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Inventory',
        path: '/inventory',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    },
    {
        title: 'Order',
        path: '/order',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Reporting',
        path: '/reporting',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Employee',
        path: '/employee',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <IoIcons.IoMdSettings/>,
        cName: 'nav-text'
    },
    {
        title: 'Help & Support',
        path: '/help',
        icon: <IoIcons.IoMdHelp/>,
        cName: 'nav-text'
    },
    {
        title: 'Logout',
        path: '/login',
        icon: <IoIcons.IoMdLogOut/>,
        cName: 'nav-text'
    }
]