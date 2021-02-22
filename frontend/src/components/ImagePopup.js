export default function ImagePopup(props) {
  return (
    <section className= {`popup popup_full-image ${props.card.isOpen && `popup_opened`}`}>
      <div className="popup__card">
        <button className="popup__close-button popup__close-button_image" type="button" onClick = {props.onClose}></button>
        <img className="popup__card-image" alt={props.card.openCard.name} src={props.card.openCard.link} />
        <h2 className="popup__card-title">{props.card.openCard.name}</h2>
      </div>
    </section>
  )
}
