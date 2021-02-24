export default function MobileNav(props) {
  return (
    <section className={`nav-mobile ${props.isMobileNav && `nav-mobile_open`}`}>
      <p className="nav-mobile__email">{props.headerEmail}</p>
      <button className="nav-mobile__button" onClick={props.onSignOut}>Выйти</button>
    </section>
  )
}
