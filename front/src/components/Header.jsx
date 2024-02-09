import React from "react";
import "./style/Header.scss"

const Header = ()=>{
    return (
        <header>
            <img src="./asset/icon.png"></img>
            <a href="/">Accueil</a>
            <a href="/">Profil</a>
            <a href="/">Réglage</a>
            <a href="/">Communauté</a>
        </header>
    )
}
export default Header;