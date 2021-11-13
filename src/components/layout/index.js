import classNames from 'classnames'
import React from 'react'
import MainSidebar from '../sidebar/sidebar'

export default function Layout({ children }) {
    const layoutClassNames = classNames(
        'col-12',
        'main-content',
        'p-0 col-md-9',
        'offset-md-3',
        'col-lg-10',
        'offset-lg-2',
        
    )
    return (
        <div className="row">
            <MainSidebar sideBarItems={sidebarItems} />
            <div className={layoutClassNames} style={{minHeight:"100vh"}}>
                {children}
            </div>
        </div>
    )
}

const sidebarItems = [{
    title: "Home",
    to: "/",
    icon: "home",
}, {
    title: "Content",
    to: "/content/",
    icon: "vertical_split",
}, {
    title: "Add Content",
    to: "/create-content/",
    icon: "note_add",
}, {
    title: "Logout",
    to: "/logout/",
    icon: "logout",
}, {
    title: "Logout",
    to: "/logout/",
    icon: "logout",
}]