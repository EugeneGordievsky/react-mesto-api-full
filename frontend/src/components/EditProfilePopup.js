import PopupWithForm from "./PopupWithForm";
import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
  }, [currentUser]);

  return (
  <PopupWithForm name = "popup_edit" title = "Редактировать профиль" isOpen = {props.isOpen}
  onClose = {props.onClose} buttonText = "Сохранить" onSubmit={(evt) => {
    evt.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }}>
        <input id="input-name" type="text" placeholder="Введите Ваше имя" className="popup__input popup__input_name"
        name="name" minLength={2} maxLength={40} required onChange={(evt) => setName(evt.target.value)} value={name} />
        <span id="input-name-error" className="popup__input_error"></span>
        <input id="input-job" type="text" placeholder="Введите Вашу профессию" className="popup__input popup__input_job"
        name="job"minLength={2} maxLength={200} required onChange={(evt) => setDescription(evt.target.value)} value={description} />
        <span id="input-job-error" className="popup__input_error"></span>
  </PopupWithForm>)
}
