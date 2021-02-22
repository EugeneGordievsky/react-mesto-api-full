import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  return (
    <PopupWithForm name = "popup_add-card" title = "Новое место" isOpen = {props.isOpen}
    onClose = {props.onClose} buttonText = "Создать" onSubmit={(evt) => {
      evt.preventDefault();

      props.onAddPlace({
        name: name,
        link: link
      });

      setName("");
      setLink("");
    }} >
      <input id="input-title" type="text" placeholder="Название" className="popup__input popup__input_title"
      name="name" minLength={2} maxLength={30} required value={name} onChange={(evt) => setName(evt.target.value)} />
      <span id="input-title-error" className="popup__input_error"></span>
      <input id="input-src" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_src"
      name="link" required value={link} onChange={(evt) => setLink(evt.target.value)} />
      <span id="input-src-error" className="popup__input_error"></span>
    </PopupWithForm>
  )
}
