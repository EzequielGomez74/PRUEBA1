import React from 'react';
import s from './NavBar.module.css';
import SearchBar from './SearchBar';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faHeart, faCartShopping, faUser, faCaretDown, faAngleDown} from '@fortawesome/free-solid-svg-icons'

function NavBar() {
  return (
    <div className={s.navBar}>
        <section className={s.desktop}>
        <section className={s.one}>
            <div>
                <SearchBar />
                <h1><a href='/home'>TECHBUNNY</a></h1>
                <div className={s.navDetail}>
                    <span><FontAwesomeIcon icon={faMoon} /></span>
                    <span><FontAwesomeIcon icon={faHeart} />&nbsp;&nbsp; 0</span>
                    <span><FontAwesomeIcon name='cart' icon={faCartShopping} />&nbsp;&nbsp; 0</span>
                    <span><FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;<FontAwesomeIcon icon={faCaretDown}/></span>
                </div>
            </div>
        </section>
        <section className={s.two}>
            <div>
                <p><a href='/home'>HOME</a> </p>
                <p><a href='/about'>SOBRE TECHBUNNY</a></p>
                <p>CATEGORIAS &nbsp;&nbsp;<FontAwesomeIcon icon={faAngleDown}/></p>
                <p>VER ESTADO DE PEDIDO</p>
            </div>
        </section>
        <section className={s.three}>
            <div>
                <p>Monitores</p>
                <p>Teclados</p>
                <p>Auriculares</p>
                <p>Mouse</p>
                <p>Parlantes</p>
                <p>Sillas</p>
                <p>Consolas</p>
                <p>Notebooks</p>
                <p>Fuentes</p>
                <p>Procesadores</p>
                <p>Impresoras</p>
                <p>Discos</p>
            </div>
        </section>
        </section>
        <section className={s.mobile}>
        <div className={s.navtitle}><h1>TECHBUNNY</h1></div>
        <div className={s.searchbarcontainer}><SearchBar /></div>
        
        </section>
    </div>
  )
}

export default NavBar