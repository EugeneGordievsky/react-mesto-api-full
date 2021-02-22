import PopupWithForm from "./PopupWithForm";
import React from 'react';

export default function EditAvatarPopup(props) {
  const avatarRef = React.createRef();

  return (
    <PopupWithForm name = "popup__edit-avatar" title = "Обновить аватар" isOpen = {props.isOpen}
    onClose = {props.onClose} buttonText = "Сохранить" onSubmit={(evt) => {
      evt.preventDefault();

      props.onUpdateAvatar({
        link: avatarRef.current.value,
      })
    }}>
      <input id="input-src" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_src"
      name="link" required ref={avatarRef} />
      <span id="input-src-error" className="popup__input_error"></span>
    </PopupWithForm>
  )
}
