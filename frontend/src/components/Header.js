import logo from '../images/logo.svg';
import { Link, Route } from 'react-router-dom';

export default function Header(props) {
  return (
    <>
      <Route path='/sign-in'>
        <header className="header">
          <img src={logo} className="header__logo" alt="Логотип Mesto Russia" />
          <Link to='./sign-up' className="header__link" >Регистрация</Link>
        </header>
      </Route>
      <Route path='/sign-up'>
        <header className="header">
          <img src={logo} className="header__logo" alt="Логотип Mesto Russia" />
          <Link to='./sign-in' className="header__link" >Вход</Link>
        </header>
      </Route>
      <Route exact path='/'>
        <header className="header">
          <img src={logo} className="header__logo" alt="Логотип Mesto Russia" />
          <p className="header__email">{props.headerEmail}</p>
          <button className="header__link header__link_main" onClick={props.onSignOut}>Выйти</button>
          <button className={props.isMobileNav ? "header__mobile-nav_close" : "header__mobile-nav"} onClick={() => {
            if (props.isMobileNav) {
              props.openMobileNav(false)
            } else {
              props.openMobileNav(true)
            }
          }}></button>
        </header>
      </Route>
    </>
  )
}
