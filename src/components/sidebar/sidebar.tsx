import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import "./index.css";
import { useLocation } from "react-router";
import { SideBarItem } from "../../types/types";
type Props = {
  item: SideBarItem;
  close: () => void;
};
const SidebarNavItem = ({ item, close }: Props) => {
  const location = useLocation().pathname;
  const style = classNames("nav-link", location === item.to && "active");
  return (
    <Link className={style} to={item.to} onClick={close}>
      <div className="d-inline-block ">
        <i className="material-icons">{item.icon}</i>
        {item.title}
      </div>
    </Link>
  );
};

interface MainSidebarProps {
  sideBarItems: SideBarItem[];
}
export default function MainSidebar({ sideBarItems }: MainSidebarProps) {
  const [sideBarOpen, openSiderBar] = React.useState(false);
  const classes = classNames(
    "main-sidebar",
    "px-0",
    "col-11",
    "col-lg-2",
    "col-md-3",
    sideBarOpen && "open",
    "py-5"
  );
  return (
    <>
      <div className="navabar-sm">
        <button className="btn py-0">
          <span
            className="material-icons"
            onClick={() => openSiderBar(!sideBarOpen)}
            style={{ fontSize: "32px" }}
          >
            menu
          </span>
        </button>
      </div>
      <div className={`${classes} ${sideBarOpen ? "open" : ""}`}>
        <div className="nav-wrapper ml-4">
          <ul className="nav">
            <li className="text-center w-100 mb-3">
              <h3 className="mt-2 mt-md-0">Rada Dashboard</h3>
            </li>
            {sideBarItems.map((item, idx) => (
              <li key={idx} className="nav-item">
                <SidebarNavItem item={item} close={() => openSiderBar(false)} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
