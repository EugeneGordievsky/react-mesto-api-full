export default function PopupWithForm(props) {
  return (
    <section className={`popup ${props.name} ${props.isOpen && `popup_opened`}`}>
    <div className="popup__container">
      <button className="popup__close-button popup__close-button_edit" type="button" onClick = {props.onClose}></button>
      <h3 className="popup__header">
        {props.title}
      </h3>
      <form className="popup__form popup__form_edit" name={props.name} onSubmit={props.onSubmit} >
        {props.children}
        <button type="submit" className="popup__save-button">{props.buttonText}</button>
      </form>
    </div>
    </section>
  )
}
