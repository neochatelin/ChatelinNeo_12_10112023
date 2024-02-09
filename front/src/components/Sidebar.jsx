import React from "react";
import "./style/Sidebar.scss"

const Sidebar = ()=>{
    return (
        <div className="sidebar">
            <div className="icons">
                <a href=""><img src="./asset/icon1.png"/></a>
                <a href=""><img src="./asset/icon2.png"/></a>
                <a href=""><img src="./asset/icon3.png"/></a>
                <a href=""><img src="./asset/icon4.png"/></a>
            </div>
            <p>Copiryght, SportSee 2020</p>
        </div>
    )
}
export default Sidebar;