import React from "react";
import "./SideDrawer.css";

const MENU_ITEMS = [
    {
        title: 'Play Station 5 Controllers',
        id: 'byops5'
    },
    {
        title: 'Play Station 4 Controllers',
        id: 'build-your-own-ps4'
    },
    {
        title: 'XBOX Controllers',
        id: 'byoxbx'
    },
    {
        title: 'XBOX ELITE Controllers',
        id: 'buildyourownELITExb1'
    },

]
const sideDrawer = props => {
    let drawerClasses = ["side-drawer"];
    if (props.show) {
        drawerClasses = ["side-drawer", "open"];
    }
    return (
        <nav className={drawerClasses.join(" ")}>
            <ul>
                {
                    MENU_ITEMS.map(menu => {
                        return <li>
                            <a href="javascript: void(0)" onClick={() => {props.menuClicked(menu)}}>{menu.title}</a>
                        </li>
                    })
                }
            </ul>
        </nav>
    );
};
export default sideDrawer;
