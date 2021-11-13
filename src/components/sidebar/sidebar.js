import React from 'react'
import classNames from "classnames";
import { Link } from 'react-router-dom';
import "./index.css"
import { useLocation } from 'react-router';

/**
 * @param {Object.<string,dynamic>} props
 * props.to - route to navigate on link click 
 * 
 * props.title - text to display on the link
 * 
 * props.icon  - material css  icon name for the link
 * @example {
      title: "Dashboard",
      to: "/dashboard/",
      icon: "edit",
    },
 */
const SidebarNavItem = (props) => {
    const location = useLocation().pathname
    const style = classNames("nav-link",
        location === props.to && "active")
    return (
        <Link className={style} to={props.to}>
            <div className="d-inline-block ">
                <i className="material-icons">{props.icon}</i>
                {props.title}
            </div>
        </Link>
    );
}


/**
 * 
 * @param {Object} sideBarItems  -an array of sizebar nav items
 * @example [
 *  {
      title: "Dashboard",
      to: "/dashboard/",
      icon: "edit",
    },]
 * @returns 
 */
export default function MainSidebar({ sideBarItems }) {
    let open;
    const classes = classNames(
        "main-sidebar",
        "px-0",
        "col-11",
        "col-lg-2",
        "col-md-3",
        open && "open",
        "py-5"
    );
    return (
        <div className={classes} >
            <div className="nav-wrapper ml-4">
                <ul className="nav">
                    <li className="text-center w-100 mb-3">
                        <h5>Rada Dashboard</h5>
                    </li>
                    {sideBarItems.map((item, idx) => (
                        <li key={idx} className="nav-item"> <SidebarNavItem {...item} /></li>
                    ))}
                </ul>
            </div>
        </div>
    );
}